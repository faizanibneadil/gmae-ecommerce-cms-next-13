'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"
import { initialImageCreateSchema } from "@/_schemas";
import { redirect } from "next/navigation";

export async function $linkImagesWithProduct(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.productId) throw Error("Product Id is required.")
    if (!values?.imageId) throw Error("Image Id is required.")
    if (!values?.did) throw Error("Distribution Id is required.")

    try {
        await prisma.images.update({
            data: {
                Products: {
                    connect: {
                        id: values.productId
                    }
                }
            },
            where: {
                id: values.imageId
            }
        })
        revalidateTag(`_getImages-${values.did}`)
        revalidateTag(`_getInventory-${values.did}`)
        console.log("Image updated successfully. 👍")
    } catch (error: any) {
        console.log("Something Went Wrong when updating image. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}

export async function $unLinkImagesWithProduct(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.productId) throw Error("Product Id is required.")
    if (!values?.imageId) throw Error("Image Id is required.")
    if (!values?.did) throw Error("Distribution Id is required.")


    try {
        await prisma.images.update({
            data: {
                Products: {
                    disconnect: {
                        id: values.productId
                    }
                }
            },
            where: {
                id: values.imageId
            }
        })
        revalidateTag(`_getImages-${values.did}`)
        revalidateTag(`_getInventory-${values.did}`)
        console.log("Image updated successfully. 👍")
    } catch (error: any) {
        console.log("Something Went Wrong when updating image. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}

export async function $initialImageCreateAction(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.altText) throw Error("alt text Id is required.")
    if (!values?.src) throw Error("src Id is required.")
    if (!values?.searchText) throw Error("search text Id is required.")

    try {
        await prisma.images.create({
            data: {
                altText: values.altText,
                src: values.src,
                searchText: values.searchText.split(" ")
            }
        })
        console.log("Image updated successfully. 👍")
        revalidateTag(`_getImages`)
    } catch (error: any) {
        console.log("Something Went Wrong when updating image. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}