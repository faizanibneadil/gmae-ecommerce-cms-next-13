'use server'

import { updateBillReturn } from "@/_schemas";
import { prisma } from "@/config/db";
import { revalidatePath } from "next/cache";

type BillItem = {
    id: string;
    products: {
        id: String
        title: string | null;
    }[];
    quantity: number | null;
    qty?: number | undefined
};

interface SaveBillProps {
    billId: string
    items: BillItem[] | undefined
}


export async function saveBill(props: SaveBillProps) {
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
        await prisma.billing.update({
            data: {
                returnItems: {
                    create: res.data.items.map(i => ({
                        quantity: i.qty,
                        products: { connect: { id: i.products[0].id } }
                    }))
                },
                isReturned: true
            },
            where: { id: props.billId }
        })
        console.log("Bill has been updated successfully. 👍")
        revalidatePath(`/admin/transactions/sale-return/${props.billId}`, "page")
    } catch (error) {
        console.log("Something Wnt Wrong When Creating New Bill Entry. 👎")
        console.log(error)
        return ['Something Went Wrong.']
    }
}