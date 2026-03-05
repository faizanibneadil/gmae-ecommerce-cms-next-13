import type { CollectionConfig } from 'payload'

export const PaymentMethods: CollectionConfig<'paymentMethods'> = {
    slug: 'paymentMethods',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
            label: 'Payment Method',
            admin: {
                placeholder: 'e.g. Cash, Bank Transfer, JazzCash',
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
            label: 'Is Active?',
        },
    ],
}