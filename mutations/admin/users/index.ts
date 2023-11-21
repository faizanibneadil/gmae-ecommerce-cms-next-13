'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"
import { initialImageCreateSchema } from "@/_schemas";
import { redirect } from "next/navigation";

export async function $initialUserCreateAction(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.name) throw Error("Name is required.")
    if (!values?.did) throw Error("Distribution Id is required.")

    try {
        await prisma.user.create({
            data: {
                name: values.name,
                distributors: { connect: { id: values.did } }
            }
        })
        console.log("Image updated successfully. 👍")
        revalidateTag(`_getUsers-${values?.did}`)
    } catch (error: any) {
        console.log("Something Went Wrong when updating image. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}