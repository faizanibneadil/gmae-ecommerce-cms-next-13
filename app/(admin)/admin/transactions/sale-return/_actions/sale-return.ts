'use server'

import { updateBillReturn } from "@/_schemas";
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

interface SaleReturnProps {
    saleManId: string
    areaId: string
}


export async function updateBill(props: SaleReturnProps) {
    const res = updateBillReturn.safeParse(props);
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
        const bills = await prisma.billing.findMany({
            select: {
                id: true,
                accessId: true,
                createdAt: true,
            },
            where: {
                saleMane: { id: res.data.saleManId },
                area: { id: res.data.areaId },
                // createdAt: new Date().toISOString()
            },
        })
        return bills
    } catch (error) {
        console.log("Something Wnt Wrong When fetching Bill by areaId and Sale Man Id. 👎")
        console.log(error)
    }
}