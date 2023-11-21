'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache"

export async function $createDistributionAction(values: any) {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!values?.name) throw Error("Name is required.")

    try {
        await prisma.distributors.create({
            data: {
                name: values.name,
                users: { connect: { id: session.user.id } }
            }
        })
        console.log("Distribution has been successfully. 👍")
        revalidateTag(`_getDistribution`)
    } catch (error: any) {
        console.log("Something Went Wrong when updating distribution. 👎")
        console.log(error)
        throw new Error(error?.message)
    }
}