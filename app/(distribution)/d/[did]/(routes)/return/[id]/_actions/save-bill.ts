'use server'

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";

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
    did: string
    items: BillItem[] | undefined
    extraDiscount: string
}

export async function saveBill(props: SaveBillProps) {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error("Authorization required.")
    }
    try {
        await prisma.billing.update({
            data: {
                items: {
                    update: props?.items?.map((item) => ({
                        data: {
                            returnQuantity: Number(item.return_quantity),
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
                distributor: { connect: { id: props.did } },
                isReturned: true,
                extraDiscountAmount: Number(props?.extraDiscount),
            },
            where: { id: props.billId }
        })

        console.log("Bill has been updated successfully. 👍")
        revalidateTag(`bill-${props.billId}`)
    } catch (error) {
        console.log("Something Wnt Wrong When Returning Bill. 👎")
        console.log(error)
        throw new Error("Something Went Wrong When Returning Bill. 👎")
    }
}