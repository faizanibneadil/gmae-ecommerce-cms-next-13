'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"

export const $linkVariantWithProduct = async (values: any) => {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.productId) throw Error("Product Id is required.")
    if (!values?.variantId) throw Error("Variant Id is required.")

    try {
        await prisma.products.update({
            data: {
                variants: {
                    connect: {
                        id: values.variantId
                    }
                }
            },
            where: {
                id: values.productId
            }
        })
        console.log("Variant updated successfully. 👍")
    } catch (error: any) {
        console.log("Something Went Wrong when updating Variant. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}

export const $unLinkVariantWithProduct = async (values: any) => {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.productId) throw Error("Product Id is required.")
    if (!values?.variantId) throw Error("Variant Id is required.")

    try {
        await prisma.products.update({
            data: {
                variants: {
                    disconnect: {
                        id: values.variantId
                    }
                }
            },
            where: {
                id: values.productId
            }
        })
        console.log("Variant updated successfully. 👍")
    } catch (error: any) {
        console.log("Something Went Wrong when updating variant. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}
