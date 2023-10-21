'use server'

import { updateBillReturn } from "@/_schemas";
import { prisma } from "@/config/db";
import { revalidatePath } from "next/cache";


interface SaveBillProps {
    billId: string
    distributorId: string
}


export async function cancelBill({ billId, distributorId }: SaveBillProps) {
    try {





        await prisma.$transaction(async (tx) => {
            const returnItems = await tx.billingItems.findMany({
                select: {
                    id: true,
                    returnQuantity: true,
                    issueQuantity: true,
                    products: {
                        select: {
                            id: true,
                            salePrice: true,
                            regularPrice: true,
                            purchasePrice: true,
                            profit: true
                        }
                    }
                },
                where: { Bill: { id: billId } }
            })

            // const bill_total_amount = returnItems?.reduce((previous_total, incoming_item) => previous_total + (Number(incoming_item.issueQuantity) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
            // const grossAmount = returnItems?.reduce((previous_subtotal, incoming_item) => previous_subtotal + (Number(incoming_item.issueQuantity) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
            // const bill_discount = returnItems?.reduce((previous_discount, incoming_item) => previous_discount + (Number(incoming_item.issueQuantity) * (Number(incoming_item.products[0]?.regularPrice) - Number(incoming_item.products[0]?.salePrice))), 0)
            // const bill_net_amount = returnItems?.reduce((previous_netAmount, incoming_item) => previous_netAmount + (Number(incoming_item.issueQuantity) * (Number(incoming_item.products[0]?.salePrice) ?? Number(incoming_item.products[0]?.regularPrice))), 0)
            // const bill_profit = returnItems?.reduce((previous_profit, incoming_item) => previous_profit + (Number(incoming_item.issueQuantity) * Number(incoming_item.products[0]?.profit)), 0)
            // const final_net_amount = Number(bill_net_amount) - Number(bill_discount)

            await tx.billing.update({
                data: {
                    items: {
                        update: returnItems.map(item => ({
                            data: {
                                products: {
                                    update: item.products.map(product => ({
                                        data: { stock: { decrement: Number(item.returnQuantity) } },
                                        where: { id: product.id }
                                    }))
                                },
                                returnQuantity: { set: null },
                            },
                            where: { id: item.id }
                        }))
                    },
                    isReturned: false,
                    // totalAmount: Number(bill_total_amount) - Number(bill_discount),
                    // grossAmount: Number(grossAmount),
                    // discountAmount: Number(bill_discount),
                    // netAmount: Number(final_net_amount),
                    // profitOfBill: Number(bill_profit),
                    extraDiscountAmount: { set: 0 }
                }, where: { id: billId }
            })


            // for (let index = 0; index < return_Items?.length; index++) {
            //     const items = return_Items[index];
            //     await tx.products.update({
            //         data: {
            //             stock: {
            //                 decrement: items.returnQuantity as number
            //             },
            //         },
            //         where: { id: items.products[0].id }
            //     })
            //     await tx.billingItems.update({ data: { returnQuantity: null }, where: { id: items.id } })
            // }

        })
        console.log("Bill has been updated successfully. 👍")
        revalidatePath(`/distribution/${distributorId}/return/${billId}`, "page")
    } catch (error) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
        console.log(error)
    }
}