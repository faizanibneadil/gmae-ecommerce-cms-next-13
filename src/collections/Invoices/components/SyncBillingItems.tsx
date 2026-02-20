'use client'

import { JoinField, useDocumentInfo } from "@payloadcms/ui"
import type { JoinFieldClientComponent } from "payload"

export const SyncBillingItems: JoinFieldClientComponent = (props) => {
    const { lastUpdateTime } = useDocumentInfo()

    return <JoinField key={lastUpdateTime} {...props} />
}