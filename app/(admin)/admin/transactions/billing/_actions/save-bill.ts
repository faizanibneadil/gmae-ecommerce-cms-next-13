'use server'

import { prisma } from "@/config/db"

type BillItem = {
    title: string | null;
    images: {
        src: string | null;
    }[];
    id: string;
    regularPrice: number | null;
    salePrice: number | null;
    stock: number | null;
    qty?: number | undefined
};

interface SaveBillProps {
    bookerId: string
    saleManeId: string
    areaId: string
    companyId: string
    shopId: string
    deliveryDate: Date
    items: BillItem[]
}

export async function saveBill({
    areaId,
    bookerId,
    companyId,
    items,
    saleManeId,
    shopId,
    deliveryDate
}: SaveBillProps) {
    try {
        await prisma.billing.create({
            data: {
                booker: { connect: { id: bookerId } },
                saleMane: { connect: { id: saleManeId } },
                area: { connect: { id: areaId } },
                company: { connect: { id: companyId } },
                shop: { connect: { id: shopId } },
                items: {
                    create: items.map(i => ({
                        quantity: i.qty as number,
                        products: { connect: { id: i.id } }
                    }))
                },
                deliveryDate: deliveryDate,
            },
        })
        console.log("Bill has been saved successfully. 👍")
    } catch (error) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
    }
}