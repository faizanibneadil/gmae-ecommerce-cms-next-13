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
            const return_Items = await tx.returnBillingItems.findMany({
                select: {
                    id: true,
                    quantity: true,
                    products: {
                        select: {
                            id: true
                        }
                    }
                },
                where: { Bill: { id: { contains: billId } } }
            })
            for (let index = 0; index < return_Items?.length; index++) {
                const items = return_Items[index];
                await tx.products.update({
                    data: {
                        stock: {
                            decrement: items.quantity as number
                        },
                    },
                    where: { id: items.products[0].id }
                })
            }
            await tx.billing.update({ data: { isReturned: false, extraDiscount: null, returnItems: { set: [] } }, where: { id: billId } })
        })
        console.log("Bill has been updated successfully. 👍")
        revalidatePath(`/distribution/${distributorId}/return/${billId}`, "page")
    } catch (error) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
        console.log(error)
        return ['Something Went Wrong.']
    }
}