'use server'

import { getPayload } from "payload"
import { cache } from "react"
import config from '@/payload.config'

export const queryCurrencyById = cache(async (id: number | undefined) => {
    const payload = await getPayload({ config })
    const currency = await payload.findByID({
        collection: 'currencies',
        id: id!
    })
    return currency
})