'use server'

import { getPayload } from "payload"
import { cache } from "react"
import config from '@/payload.config'

export const queryVariantById = cache(async (id: number | undefined) => {
    const payload = await getPayload({ config })
    const variant = await payload.findByID({
        collection: 'variants',
        id: id!
    })
    return variant
})