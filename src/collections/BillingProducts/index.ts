import { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const BillingVariants: CollectionConfig<'billingVariants'> = {
    slug: 'billingVariants',
    labels: { plural: 'Billing Variants', singular: 'Billing Variant' },
    access: Pages.access,
    admin: {
        pagination: {
            defaultLimit: 100
        },
    },
    fields: [
        {
            name: 'billId',
            type: 'relationship',
            relationTo: 'billing',
            required: true,
            index: true,
        },
        {
            name: 'variant',
            type: 'relationship',
            relationTo: 'variants',
            required: true,
        },
        {
            name: 'quantity',
            type: 'number',
            defaultValue: 0,
            admin: {
                components: {
                    Cell: '@/collections/BillingProducts/Qty.tsx#Qty'
                }
            }
        },
        {
            name: 'discount',
            type: 'number',
            defaultValue: 0,
        }
    ]
}