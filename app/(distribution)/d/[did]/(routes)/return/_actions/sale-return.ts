'use server'

import { findBillBySaleManAndAreaId } from "@/_schemas";
import { prisma } from "@/config/db"
import { endOfDay, startOfDay } from "@/lib/utils";

interface SaleReturnProps {
    saleManId: string
    areaId: string
    did: string
}


export async function updateBill(props: SaleReturnProps) {
    const res = findBillBySaleManAndAreaId.safeParse(props);
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
                isReturned: true
            },
            where: {
                saleMane: { id: res.data.saleManId },
                area: { id: res.data.areaId },
                distributor: { id: props.did },
                createdAt: {
                    gte: startOfDay(),
                    lte: endOfDay(),
                },
            },
        })
        return bills
    } catch (error) {
        console.log("Something Wnt Wrong When fetching Bill by areaId and Sale Man Id. 👎")
        console.log(error)
        throw new Error("Something Went Wrong When Returning Bill. 👎")
    }
}