'use client'

import { ShimmerEffect, useRowLabel } from '@payloadcms/ui'
import { Suspense, use } from 'react'
import { queryVariantById } from '../getVariantLabel'

export function VariantLabel() {
    const { data, rowNumber } = useRowLabel<{ variant?: number }>()

    const rowIdx = `Variant ${String((rowNumber ?? 0) + 1).padStart(2, '0')} `

    // if (data?.variant && typeof data?.variant === 'number') {
    //     const getCurrency = queryVariantById(data?.variant)
    //     return <Suspense fallback={<ShimmerEffect height="1rem" width="8rem" />}>
    //         <RenderVariantInfo getCurrency={getCurrency} />
    //     </Suspense>
    // }

    return <div>{rowIdx}</div>
}

function RenderVariantInfo(props: { getCurrency: ReturnType<typeof queryVariantById> }) {
    const variant = use(props.getCurrency)
    return <div>{variant?.title}</div>
}

