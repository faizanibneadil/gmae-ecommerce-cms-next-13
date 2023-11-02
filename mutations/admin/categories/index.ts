'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"

export const $updateCategoriesOfProduct = async (values: any) => {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.productId) throw Error("Product Id is required.")
    if (!values?.categories) throw Error("Minimum 1 category is required.")

    try {
        await prisma.products.update({
            data: {
                Categories: {
                    set: values.categories?.map((p: any) => ({ id: p }))
                }
            },
            where: {
                id: values.productId
            }
        })
        revalidateTag(`_getCategoriesOfProduct`)
        console.log("product company updated successfully. 👍")
    } catch (error: any) {
        console.log("Something Went Wrong when updating product company. 👎")
        console.log(error)
        throw Error(error?.message)
    }
}


export const $initialCategoryCreateAction = async (values: any) => {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.name) throw Error("alt text Id is required.")

    try {
        await prisma.categories.create({
            data: {
                name: values.name
            }
        })
        console.log("Category updated successfully. 👍")
        // revalidateTag(`_getImages`)
    } catch (error: any) {
        console.log("Something Went Wrong when updating category. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}