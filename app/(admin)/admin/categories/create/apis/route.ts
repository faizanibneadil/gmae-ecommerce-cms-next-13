import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const values = await req.json()
    const session = await getServerSession(authOptions)
    let query = Object.create({});
    query.create = Object.assign(Object.create({}), { name: values.name, image: values.image, User: { connect: { id: session?.user?.id } } });
    query.update = Object.assign(Object.create({}), { name: values.name, image: values.image });
    query.where = Object.assign(Object.create({}), { id: values.id });
    if (values.categoryId === "disconnect") {
        query.update = Object.assign(Object.create({}), { name: values.name, image: values.image, parentCategory: { disconnect: true } });
    } else if (values.categoryId.length == 24) {
        query.create = Object.assign(Object.create({}), { name: values.name, image: values.image, parentCategory: { connect: { id: values.categoryId } } });
        query.update = Object.assign(Object.create({}), { name: values.name, image: values.image, parentCategory: { connect: { id: values.categoryId } } });
    }
    try {
        await prisma.categories.upsert(query)
        console.log("Create Or Updated Successfully 👍")
        revalidatePath("/admin/categories")
        return NextResponse.json({ msg: "done!" })
    } catch (e) {
        console.log("Something went wrong when Creating Or Updating with this error 👎")
        console.log(e)
        return NextResponse.json({ msg: "Un Done !" })
    }
}