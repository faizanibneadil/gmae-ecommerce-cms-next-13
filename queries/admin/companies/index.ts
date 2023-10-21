'use server'

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getCompanies(distributionId: string) {
    const companies = await unstable_cache(
        async () => {
            const data = await prisma.companies.findMany({
                select: { id: true, name: true, _count: { select: { products: true } } },
                where: { distributors: { some: { id: distributionId } } },
            });
            return data
        },
        ['companies'],
        {
            tags: ['companies'],
            revalidate: 10,
        }
    )()
    return companies
}

export async function _getCompanyById(companyId: string) {
    const company = await unstable_cache(
        async () => {
            const data = await prisma.companies.findUnique({ where: { id: companyId } });
            return data
        },
        ['company', companyId],
        {
            tags: ['company', companyId],
            revalidate: 10,
        }
    )()
    return company
}