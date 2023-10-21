'use server'

import { createBillFormSchema } from "@/_schemas";
import { prisma } from "@/config/db"

type BillItem = {
    title: string | null;
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
    const res = createBillFormSchema.safeParse(props);
    if (!res.success) {
        return console.log(Object.values(res.error.format())
            .map((value) => {
                // @ts-ignore
                if (value && value._errors && Array.isArray(value._errors)) {
                    // @ts-ignore(
                    return value._errors[0];
                }
                return null;
            })
            .filter((message) => message !== null));
    }
    // const bill_total_amount = res.data.products.filter(product => Number(product.qty) > 0).reduce((previous_total, incoming_item) => previous_total + (Number(incoming_item.qty) * (Number(incoming_item.salePrice) ?? Number(incoming_item.regularPrice))), 0)
    // const grossAmount = res.data.products.filter(product => Number(product.qty) > 0).reduce((previous_subtotal, incoming_item) => previous_subtotal + (Number(incoming_item.qty) * (Number(incoming_item.salePrice) ?? Number(incoming_item.regularPrice))), 0)
    // const bill_discount = res.data.products.filter(product => Number(product.qty) > 0).reduce((previous_discount, incoming_item) => previous_discount + (Number(incoming_item.qty) * (Number(incoming_item.regularPrice) - Number(incoming_item.salePrice))), 0)
    // const bill_net_amount = res.data.products.filter(product => Number(product.qty) > 0).reduce((previous_netAmount, incoming_item) => previous_netAmount + (Number(incoming_item.qty) * (Number(incoming_item.salePrice) ?? Number(incoming_item.regularPrice))), 0)
    // const bill_profit = res.data.products.filter(product => Number(product.qty) > 0).reduce((previous_profit, incoming_item) => previous_profit + (Number(incoming_item.qty) * Number(incoming_item.profit)), 0)
    // const final_net_amount = bill_net_amount - bill_discount - Number(res.data.extraDiscount)

    try {
        await prisma.$transaction(async tx => {
            await tx.billing.create({
                data: {
                    booker: { connect: { id: res.data.bookerId } },
                    saleMane: { connect: { id: res.data.saleManId } },
                    area: { connect: { id: res.data.areaId } },
                    company: { connect: { id: res.data.companyId } },
                    shop: { connect: { id: res.data.shopId } },
                    distributor: { connect: { id: res.data.distributionId } },
                    deliveryDate: res.data.deliveryDate,
                    extraDiscountAmount: res.data.extraDiscount,
                    items: {
                        create: res.data.products.map(i => ({
                            issueQuantity: i.qty as number,
                            products: { connect: { id: i.id } },
                        })),
                    },
                    // totalAmount: bill_total_amount - bill_discount,
                    // grossAmount: grossAmount,
                    // discountAmount: bill_discount,
                    // netAmount: final_net_amount,
                    // profitOfBill: bill_profit,
                },
            })
            for (let index = 0; index < res.data.products.length; index++) {
                const bill_item = res.data.products[index];
                await tx.products.update({
                    data: { stock: { decrement: Number(bill_item.qty) } },
                    where: { id: bill_item.id }
                })
            }
        })
        console.log("Bill has been saved successfully. 👍")
    } catch (error) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
        console.log(error)
    }
}