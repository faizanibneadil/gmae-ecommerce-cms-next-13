'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"
import { initialImageCreateSchema } from "@/_schemas";
import { redirect } from "next/navigation";

export const $initialInventoryCreateAction = async (values: any) => {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.title) throw Error("Name is required.")
    if (!values?.regularPrice) throw Error("Price is required.")
    if (!values?.distributionId) throw Error("Distribution Id is required.")

    try {
        await prisma.products.create({
            data: {
                title: values.title,
                regularPrice: values.regularPrice,
                distributors: { connect: { id: values.distributionId } }
            }
        })
        console.log("Image updated successfully. 👍")
        revalidateTag(`_getInventory`)
    } catch (error: any) {
        console.log("Something Went Wrong when updating image. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}