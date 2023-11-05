'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"
import { initialImageCreateSchema } from "@/_schemas";
import { redirect } from "next/navigation";

export async function $initialAreaCreateAction(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.name) throw Error("Name is required.")
    if (!values?.distributionId) throw Error("Distribution Id is required.")

    try {
        await prisma.areas.create({
            data: {
                name: values.name,
                distributors: { connect: { id: values.distributionId } }
            }
        })
        console.log("Image updated successfully. 👍")
        revalidateTag(`_getAreas-${values?.distributionId}`)
        revalidateTag(`_getDistributionInfo-${values.distributionId}`)
    } catch (error: any) {
        console.log("Something Went Wrong when updating image. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}