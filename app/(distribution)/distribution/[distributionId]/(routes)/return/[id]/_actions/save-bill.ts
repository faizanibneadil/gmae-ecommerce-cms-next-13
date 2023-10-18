'use server'

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
    issueQuantity: number;
    return_quantity?: number | undefined
};

interface SaveBillProps {
    billId: string
    distributionId: string
    items: BillItem[] | undefined
    extraDiscount: string
    creditAmount: string,
    chequeAmount: string,
    cashAmount: string,
}

export async function saveBill(props: SaveBillProps) {
    const bill_total_amount = props?.items?.reduce((previous_total, incoming_item) => previous_total + ((incoming_item.issueQuantity - Number(incoming_item.return_quantity)) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
    const grossAmount = props?.items?.reduce((previous_subtotal, incoming_item) => previous_subtotal + ((incoming_item.issueQuantity - Number(incoming_item.return_quantity)) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
    const bill_discount = props?.items?.reduce((previous_discount, incoming_item) => previous_discount + ((incoming_item.issueQuantity - Number(incoming_item.return_quantity)) * (Number(incoming_item.products[0]?.regularPrice) - Number(incoming_item.products[0]?.salePrice))), 0)
    const bill_net_amount = props?.items?.reduce((previous_netAmount, incoming_item) => previous_netAmount + ((incoming_item.issueQuantity - Number(incoming_item.return_quantity)) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
    const bill_profit = props?.items?.reduce((previous_profit, incoming_item) => previous_profit + ((incoming_item.issueQuantity - Number(incoming_item.return_quantity)) * Number(incoming_item.products[0]?.profit)), 0)
    const final_net_amount = Number(bill_net_amount) - Number(bill_discount) - Number(props?.extraDiscount)

    try {
        await prisma.$transaction(async tx => {
            await tx.billing.update({
                data: {
                    items: {
                        update: props?.items?.map((item) => ({
                            data: {
                                returnQuantity: Number(item.return_quantity),
                                // issueQuantity: { decrement: Number(item.return_quantity) },
                                products: {
                                    update: item.products.map((product) => ({
                                        data: { stock: { increment: Number(item.return_quantity) } },
                                        where: { id: product?.id }
                                    }))
                                }
                            },
                            where: { id: item.id }
                        }))
                    },
                    distributor: { connect: { id: props.distributionId } },
                    isReturned: true,
                    extraDiscountAmount: Number(props?.extraDiscount),
                    totalAmount: Number(bill_total_amount) - Number(bill_discount),
                    grossAmount: Number(grossAmount),
                    discountAmount: Number(bill_discount),
                    netAmount: Number(final_net_amount),
                    profitOfBill: Number(bill_profit),
                },
                where: { id: props.billId }
            })

            if (Number(props.cashAmount) > 0 && Number(props.creditAmount) > 0) {
                await tx.recoveries.create({
                    data: {
                        Billing: { connect: { id: props.billId } },
                        inCash: Number(props.cashAmount),
                        inCheque: Number(props.chequeAmount),
                        inCredit: Number(props.creditAmount)
                    }
                })
                await tx.ledger.create({ data: { bills: { connect: { id: props.billId } } } })
            }
        })

        console.log("Bill has been updated successfully. 👍")
        revalidatePath(`/distribution/${props.distributionId}/return/${props.billId}`, "page")
    } catch (error) {
        console.log("Something Wnt Wrong When Returning Bill. 👎")
        console.log(error)
        throw new Error("Something Went Wrong When Returning Bill. 👎")
    }
}