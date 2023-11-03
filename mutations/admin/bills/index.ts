'use server'
import "server-only"

import { authOptions } from "@/config/authOptions"
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth"

export async function $addBillToLedger({ billId, distributionId }: { billId: number, distributionId: string }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        throw new Error("Unauthorized")
    }

    try {

        await prisma.$transaction(async tx => {
            const bill = await tx.billing.findUnique({ where: { accessId: billId } })
            if (!bill) {
                console.log("bill Not Fount")
                throw new Error(`Bill Not Found with this Id ${billId}`)
            }

            const ledger = await tx.ledger.findMany({ select: { bills: { select: { id: true } } }, where: { bills: { some: { id: bill.id } } } })
            console.log(ledger)
            if (ledger.find(l => l.bills.find(b => b.id === bill.id))) {
                console.log("Bill already exist in ledger")
                throw new Error("Bill already exist in ledger")
            }

            await tx.ledger.create({
                data: {
                    bills: { connect: { id: bill.id } },
                    distributors: { connect: { id: distributionId } }
                }
            })
        })

        console.log("Bill has been connected with ledger")

    } catch (error: any) {
        console.log("Something Went Wrong When adding bill into ledger. 👎")
        console.log(error)
        throw new Error(error?.message as string)
    }

}