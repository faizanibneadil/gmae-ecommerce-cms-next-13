'use server'

import { createBillingSchema } from "@/_schemas";
import { prisma } from "@/config/db"

type BillItem = {
    title: string | null;
    images: {
        src: string | null;
    }[];
    id: string;
    regularPrice: number | null;
    salePrice: number | null;
    stock: number | null;
    profit: number | null;
    qty?: number | undefined
};

interface SaveBillProps {
    bookerId: string
    saleManeId: string
    areaId: string
    companyId: string
    shopId: string
    deliveryDate: Date
    distributionId: string
    extraDiscount: string
    items: BillItem[]
}


export async function saveBill(props: SaveBillProps) {
    const res = createBillingSchema.safeParse(props);
    if (!res.success) {
        return Object.values(res.error.format())
            .map((value) => {
                // @ts-ignore
                if (value && value._errors && Array.isArray(value._errors)) {
                    // @ts-ignore
                    return value._errors[0];
                }
                return null;
            })
            .filter((message) => message !== null);
    }

    const bill_total_amount = res.data.items.reduce((previous_total, incoming_item) => previous_total + (Number(incoming_item.qty) * (Number(incoming_item.salePrice) ?? Number(incoming_item.regularPrice))), 0)
    const bill_sub_total = res.data.items.reduce((previous_subtotal, incoming_item) => previous_subtotal + (Number(incoming_item.qty) * (Number(incoming_item.salePrice) ?? Number(incoming_item.regularPrice))), 0)
    const bill_discount = res.data.items.reduce((previous_discount, incoming_item) => previous_discount + (Number(incoming_item.qty) * (Number(incoming_item.regularPrice) - Number(incoming_item.salePrice))), 0)
    const bill_net_amount = res.data.items.reduce((previous_netAmount, incoming_item) => previous_netAmount + (Number(incoming_item.qty) * (Number(incoming_item.salePrice) ?? Number(incoming_item.regularPrice))), 0)
    const bill_profit = res.data.items.reduce((previous_profit, incoming_item) => previous_profit + (Number(incoming_item.qty) * Number(incoming_item.profit)), 0)
    const final_net_amount = bill_net_amount - bill_discount - res.data.extraDiscount
    try {
        await prisma.$transaction(async tx => {
            await tx.billing.create({
                data: {
                    booker: { connect: { id: res.data.bookerId } },
                    saleMane: { connect: { id: res.data.saleManeId } },
                    area: { connect: { id: res.data.areaId } },
                    company: { connect: { id: res.data.companyId } },
                    shop: { connect: { id: res.data.shopId } },
                    distributor: { connect: { id: res.data.distributionId } },
                    deliveryDate: res.data.deliveryDate,
                    extraDiscount: res.data.extraDiscount,
                    items: {
                        create: res.data.items.map(i => ({
                            quantity: i.qty as number,
                            subtotal: Number(i.qty) * Number(i.salePrice) ?? Number(i.regularPrice),
                            profit: Number(i.qty) * Number(i.profit),
                            discount: Number(i.qty) * (Number(i.regularPrice) - Number(i.salePrice)),
                            products: { connect: { id: i.id } }
                        })),
                    },
                    total: bill_total_amount - bill_discount,
                    subtotal: bill_sub_total,
                    discount: bill_discount,
                    netAmount: final_net_amount,
                    profit: bill_profit,
                },
            })
            for (let index = 0; index < res.data.items.length; index++) {
                const bill_item = res.data.items[index];
                await tx.products.update({
                    data: { stock: { decrement: bill_item.qty } },
                    where: { id: bill_item.id }
                })
            }
        })
        console.log("Bill has been saved successfully. 👍")
    } catch (error) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
        console.log(error)
        return ['Something Went Wrong.']
    }
}