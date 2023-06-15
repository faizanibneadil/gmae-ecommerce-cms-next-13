import { prisma } from "@/config/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const categories = await prisma.categories.findMany({ where: { parentCategory: null } })
        return NextResponse.json({ categories })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ msg: " not ok " })
    }

}

export async function POST(req: NextRequest) {
    const values = await req.json()
    const categoryId = values.categoryId
    const id = values.id
    delete values.categoryId
    delete values.id
    delete values.productsId
    try {
        await prisma.products.upsert({
            create: {
                ...values,
                Categories: {
                    connect: {
                        id: categoryId
                    }
                }
            },
            update: {
                ...values,
                Categories: {
                    connect: {
                        id: categoryId
                    }
                }
            },
            where: {
                id: id
            }
        })
        console.log(" Updated Or Created Successful 👍")
        revalidatePath("/admin/products")
        return NextResponse.json({ msg: "ok" })
    } catch (e) {
        console.log(e)
        console.log(" Something went wrong when updating Or creating product 👎")
        return NextResponse.json({ msg: "not ok" })
    }
}