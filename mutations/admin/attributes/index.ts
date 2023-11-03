'use server'

import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"

export async function $updateAttributesOfProduct(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.name) throw Error("Attribute Name is required.")
    if (!values?.value) throw Error("attribute value is required.")
    if (!values?.productId) throw Error("Product ID value is required.")

    try {
        await prisma.attributes.create({
            data: {
                name: values.name,
                value: values.value,
                product: { connect: { id: values.productId } }

            }
        })
        revalidateTag(`_getAttributesOfProduct`)
        console.log("product company updated successfully. 👍")
    } catch (error: any) {
        console.log("Something Went Wrong when updating product company. 👎")
        console.log(error)
        throw Error(error?.message)
    }
}
