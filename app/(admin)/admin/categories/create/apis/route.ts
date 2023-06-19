import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const values = await req.json()
    // console.log(req.cookies)
    const session = await getServerSession(authOptions)
    console.log("session => ", session)
    let query = Object.create({});
    query.create = Object.assign(Object.create({}), { name: values.name, image: values.image });
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
        return NextResponse.json({ msg: "done!" })
    } catch (e) {
        console.log("Something went wrong when Creating Or Updating with this error 👎")
        console.log(e)
        return NextResponse.json({ msg: "Un Done !" })
    }
}