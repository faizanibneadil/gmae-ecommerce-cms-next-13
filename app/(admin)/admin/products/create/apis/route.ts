import { prisma } from "@/config/db";
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

    // collect properties data
    const id = values.id
    const cid = values.categoryId
    const pid = values.productsId

    // after collect properties delete these properties
    delete values.categoryId
    delete values.id
    delete values.productsId

    // query will be execute
    let query = Object.create({});

    // basic query
    query.create = Object.assign(Object.create({}), values)
    query.update = Object.assign(Object.create({}), values)
    query.where = Object.assign(Object.create({}), { id })

    // if product has category then we well connect with category
    if (cid) {
        query.create = Object.assign(Object.create({}), { ...values, Categories: { connect: { id: cid } } });
        query.update = Object.assign(Object.create({}), { ...values, Categories: { connect: { id: cid } } });
    }

    // if product id is equal to disconnect then we will disconnect variant to parent product
    if(pid && pid === "disconnect"){
        query.update = Object.assign(Object.create({}), { ...values, Products: { disconnect: true } });
    }

    // if this product has parent product id then we will make this product variant
    else if (pid && pid.length == 24) {
        query.create = Object.assign(Object.create({}), { ...values, Products: { connect: { id: pid } } });
        query.update = Object.assign(Object.create({}), { ...values, Products: { connect: { id: pid } } });
    }

    console.log(query)
    try {
        await prisma.products.upsert(query)
        console.log(" Updated Or Created Successful 👍")
        return NextResponse.json({ msg: "ok" })
    } catch (e) {
        console.log(e)
        console.log(" Something went wrong when updating Or creating product 👎")
        return NextResponse.json({ msg: "not ok" })
    }
}