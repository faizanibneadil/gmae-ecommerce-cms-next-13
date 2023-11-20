'use server'

import { prisma } from "@/config/db";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export async function createDistribution({ name, session }: { session: Session | null, name: string }) {
    try {
        console.log(session)
        const { id } = await prisma.distributors.create({ data: { name, users: { connect: { id: session?.user.id } } }, select: { id: true } })
        console.log("Distribution Successfully Created. 👍")
        revalidatePath("/d", "layout")
        return id
    } catch (error) {
        console.log("Something Went Wrong When Creating Distribution. 👎")
        console.log(error)
    }
}