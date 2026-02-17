'use client'
import React, { useEffect, useState } from 'react'
import { useDocumentForm, useDocumentInfo, useForm } from '@payloadcms/ui'
import { sdk } from '@/lib/sdk'
import { BillingVariant } from '@/payload-types'

export const BillingItemsTable = () => {
  const { id: billId, } = useDocumentInfo()
  const {submit} = useForm()
  const [items, setItems] = useState<BillingVariant[]>([])
  const [fetching, setFetching] = useState(false)
  // Data load karne ka function
  const loadData = async () => {
    if (!billId) return
    setFetching(true)
    const res = await sdk.find({
      collection: 'billingVariants',
      where: { billId: { equals: billId } },
      depth: 1, // Variant title lene ke liye
      limit: 0,
      pagination:false
    })
    setItems(res.docs)
    setFetching(false)
  }

  useEffect(() => { loadData() }, [billId])

  // Inline update function (Debounced ya Direct)
  const updateEntry = async (id:number, field:string, value:number|string) => {
    // 1. UI update (Optimistic)
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item))

    // 2. API call
    try {
      await fetch(`/api/billingVariants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: Number(value) })
      })
    } catch (err) {
      console.error("Update failed", err)
    }
  }

  if (!billId) return <div className="field-type">Please save the billing first.</div>

  return (
    <div className="field-type" style={{ marginBottom: '20px' }}>
      <h4 style={{ marginBottom: '10px' }}>Billing Items (Inline Edit)</h4>
      {fetching ? <p>Loading items...</p> : (
        <table className='table table--appearance-condensed'>
          <thead>
            <tr >
              <th style={{ padding: '10px' }}>Variant</th>
              <th style={{ padding: '10px' }}>Quantity</th>
              <th style={{ padding: '10px' }}>Discount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className='drawer-link'>{typeof item.variant === 'object' && item.variant?.title || 'No Title'}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity ?? 0}
                    onChange={(e) => updateEntry(item.id, 'quantity', e.target.value ?? 0)}
                    style={{ background: 'transparent', color: 'inherit', border:'none', width: '100px' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.discount ?? 0}
                    onChange={(e) => updateEntry(item.id, 'discount', e.target.value ?? 0)}
                    style={{ background: 'transparent', color: 'inherit', border:'none', width: '100px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}