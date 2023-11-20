'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"

export async function $updateCompanyOfProduct(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.productId) throw Error("Product Id is required.")

    try {
        await prisma.products.update({
            data: {
                Companies: { connect: { id: values.companyId } }
            },
            where: {
                id: values.productId
            }
        })
        revalidateTag(`_getCompaniesWithProductsCount`)
        console.log("product company updated successfully. 👍")
    } catch (error: any) {
        console.log("Something Went Wrong when updating product company. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}


export async function $initialCompanyCreateAction(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.name) throw Error("Name is required.")
    if (!values?.did) throw Error("Distribution Id is required.")

    try {
        await prisma.companies.create({
            data: {
                name: values.name,
                distributors: { connect: { id: values.did } }
            }
        })
        console.log("Image updated successfully. 👍")
        revalidateTag(`_getCompanies-${values.did}`)
        revalidateTag(`_getDistributionInfo-${values.did}`)
    } catch (error: any) {
        console.log("Something Went Wrong when updating image. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}