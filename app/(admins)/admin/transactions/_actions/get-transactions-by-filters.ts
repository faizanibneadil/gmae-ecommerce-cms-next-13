'use server'

import { prisma } from "@/config/db"
import { Prisma } from "@prisma/client"

interface Props {
    transactionId?: number
    bookerId?: string
    saleManId?: string
    areaId?: string
    shopId?: string
    companyId?: string
    deliveryDate?: Date | string
    issueDate?: Date | string
}

export async function getFilteredTransactions({
    areaId,
    bookerId,
    companyId,
    deliveryDate,
    issueDate,
    saleManId,
    shopId,
    transactionId,
}: Props) {
    try {
        const where: Prisma.BillingWhereInput = {};

        // Add conditions only if the argument is provided
        if (areaId !== undefined) {
            where.area = { id: areaId };
        }
        if (bookerId !== undefined) {
            where.booker = { id: bookerId };
        }
        if (shopId !== undefined) {
            where.shop = { id: shopId };
        }
        if (companyId !== undefined) {
            where.company = { id: companyId };
        }
        if (issueDate !== undefined) {
            where.createdAt = { gte: issueDate };
        }
        if (saleManId !== undefined) {
            where.saleMane = { id: saleManId };
        }
        if (deliveryDate !== undefined) {
            where.deliveryDate = deliveryDate;
        }
        if (transactionId !== undefined) {
            where.accessId = transactionId;
        }

        const transactions = await prisma.billing.findMany({
            select: {
                id: true,
                accessId: true,
                createdAt: true
            },
            where
        });
        return transactions;
    } catch (error) {
        console.error(error);
        throw error;
    }
}