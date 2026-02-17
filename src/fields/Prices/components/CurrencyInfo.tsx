'use client'

import { ShimmerEffect, useRowLabel } from '@payloadcms/ui'
import { Suspense, use } from 'react'
import { queryCurrencyById } from './getCurrencyById'

export function CurrencyInfo() {
    const { data, rowNumber } = useRowLabel<{ currency?: number, price: number }>()
    
    const rowIdx = `Price ${String((rowNumber ?? 0) + 1).padStart(2, '0')} `

    if (data?.currency && typeof data?.currency === 'number') {
        const getCurrency = queryCurrencyById(data?.currency)
        return <Suspense fallback={<ShimmerEffect height="1rem" width="8rem" />}>
            <RenderCurrencyInfo getCurrency={getCurrency} price={data?.price} />
        </Suspense>
    }

    return <div>No Currency Selected in {rowIdx}</div>
}

function RenderCurrencyInfo(props: { getCurrency: ReturnType<typeof queryCurrencyById>, price: number }) {
    const currency = use(props.getCurrency)
    return <div>{currency?.code} — {currency?.label} — {currency?.symbol}{props.price}</div>
}

