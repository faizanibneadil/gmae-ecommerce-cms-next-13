'use server'
import "server-only"

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getLedgerBills({ distributionId }: { distributionId: string }) {
    const salesMen = await unstable_cache(
        async () => {
            try {
                const bills = await prisma.billing.findMany({
                    where: {
                        distributor: { id: distributionId },
                        Ledger: { id: {} },
                    },
                });
                return bills
            } catch (error) {
                console.log(error)
            }
        },
        ['_getLedgerBills'],
        {
            tags: ['_getLedgerBills'],
            revalidate: 10,
        }
    )()
    return salesMen
}
