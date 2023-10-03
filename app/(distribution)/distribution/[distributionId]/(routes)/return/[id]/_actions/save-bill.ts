'use server'

import { updateBillReturn } from "@/_schemas";
import { prisma } from "@/config/db";
import { revalidatePath } from "next/cache";

type BillItem = {
    id: string;
    products: {
        id: string
        title: string | null;
        regularPrice: number | null;
        salePrice: number | null;
        profit: number | null;
    }[];
    quantity: number | null;
    qty?: number | undefined
};

interface SaveBillProps {
    billId: string
    items: BillItem[] | undefined
    extraDiscount: string
}


export async function saveBill(props: SaveBillProps) {
    const res = updateBillReturn.safeParse(props);
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
    const bill_total_amount = res.data.items.reduce((previous_total, incoming_item) => previous_total + (Number(incoming_item.qty) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
    const bill_sub_total = res.data.items.reduce((previous_subtotal, incoming_item) => previous_subtotal + (Number(incoming_item.qty) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
    const bill_discount = res.data.items.reduce((previous_discount, incoming_item) => previous_discount + (Number(incoming_item.qty) * (Number(incoming_item.products[0]?.regularPrice) - Number(incoming_item.products[0]?.salePrice))), 0)
    const bill_net_amount = res.data.items.reduce((previous_netAmount, incoming_item) => previous_netAmount + (Number(incoming_item.qty) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
    const bill_profit = res.data.items.reduce((previous_profit, incoming_item) => previous_profit + (Number(incoming_item.qty) * Number(incoming_item.products[0]?.profit)), 0)
    const final_net_amount = bill_net_amount - bill_discount - res.data.extraDiscount

    try {
        await prisma.$transaction(async tx => {
            await tx.billing.update({
                data: {
                    returnItems: {
                        create: res.data.items.map((item) => ({
                            discount: Number(item.qty) * (Number(item.products[0].regularPrice) - Number(item.products[0].salePrice)),
                            profit: Number(item.qty) * Number(item.products[0].profit),
                            subtotal: Number(item.qty) * Number(item.products[0].salePrice) ?? Number(item.products[0].regularPrice),
                            quantity: item.qty,
                            products: { connect: { id: item.products[0].id } }
                        }))
                    },
                    isReturned: true,
                    extraDiscount: res.data.extraDiscount,
                    total: bill_total_amount - bill_discount,
                    subtotal: bill_sub_total,
                    discount: bill_discount,
                    netAmount: final_net_amount,
                    profit: bill_profit,
                },
                where: { id: props.billId }
            })
            for (let index = 0; index < res.data.items.length; index++) {
                const bill_item = res.data.items[index];
                await tx.products.update({
                    data: { stock: { increment: bill_item.qty } },
                    where: { id: bill_item.products[0].id }
                })
            }
        })
        console.log("Bill has been updated successfully. 👍")
        revalidatePath(`/admin/transactions/sale-return/${props.billId}`, "page")
    } catch (error) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
        console.log(error)
        return ['Something Went Wrong.']
    }
}