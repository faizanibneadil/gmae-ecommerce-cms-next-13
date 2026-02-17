'use client'

import { toast } from "@payloadcms/ui"

export const Qty = (props: any) => {
    console.log(props)

    const updateEntry = async (value: number | string) => {
        try {
            toast.promise(fetch(`/api/${props.collectionSlug}/${props.rowData.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [props.field.name]: Number(value) })
            }), {
                success: 'qty updated',
                error: 'Something went wrong',
                loading: 'Updating qty ...'
            })

        } catch (err) {
            console.error("Update failed", err)
        }
    }

    return <input type="number" defaultValue={props.cellData} onChange={(e) => updateEntry(e.target.value ?? 0)}
        style={{ background: 'transparent', color: 'inherit', border: 'none', width: '100%' }} className="focus:border-none! appearance-none!" />
}