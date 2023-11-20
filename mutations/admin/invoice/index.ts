'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"
import { createBillFormSchema } from "@/_schemas";


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
    did: string
    extraDiscount: string
    items: BillItem[]
}



export async function $createInvoice(values: SaveBillProps) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")

    const res = createBillFormSchema.safeParse(values);
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

    try {
        await prisma.$transaction(async tx => {
            await tx.billing.create({
                data: {
                    booker: { connect: { id: res.data.bookerId } },
                    saleMane: { connect: { id: res.data.saleManId } },
                    area: { connect: { id: res.data.areaId } },
                    company: { connect: { id: res.data.companyId } },
                    shop: { connect: { id: res.data.shopId } },
                    distributor: { connect: { id: res.data.did } },
                    deliveryDate: res.data.deliveryDate,
                    extraDiscountAmount: res.data.extraDiscount,
                    items: {
                        create: res.data.products.map(i => ({
                            issueQuantity: i.qty as number,
                            products: { connect: { id: i.id } },
                        })),
                    },
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
        revalidateTag(`_getTransactions-${res.data.did}`)
        console.log("Bill has been saved successfully. 👍")
    } catch (error: any) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}