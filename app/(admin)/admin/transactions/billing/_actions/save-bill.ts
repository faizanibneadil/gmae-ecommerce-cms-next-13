'use server'

import { createBillingSchema } from "@/_schemas";
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


export async function saveBill(props: SaveBillProps) {
    const res = createBillingSchema.safeParse(props);
    if (!res.success) {
        return Object.values(res.error.format())
            .map((value) => {
                // @ts-ignore
                if (value && value._errors && Array.isArray(value._errors)) {
                    // @ts-ignore
                    return value._errors[0];
                }
                return null;
            })
            .filter((message) => message !== null);
    }

    try {
        await prisma.billing.create({
            data: {
                booker: { connect: { id: res.data.bookerId } },
                saleMane: { connect: { id: res.data.saleManeId } },
                area: { connect: { id: res.data.areaId } },
                company: { connect: { id: res.data.companyId } },
                shop: { connect: { id: res.data.shopId } },
                items: {
                    create: res.data.items.map(i => ({
                        quantity: i.qty as number,
                        products: { connect: { id: i.id } }
                    }))
                },
                deliveryDate: res.data.deliveryDate,
            },
        })
        console.log("Bill has been saved successfully. 👍")
    } catch (error) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
        console.log(error)
        return ['Something Went Wrong.']
    }
}