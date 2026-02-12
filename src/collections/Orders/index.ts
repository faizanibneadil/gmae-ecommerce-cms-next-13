import type { CollectionConfig, Validate } from "payload";
import { ValidateOrderStatus } from "./Validators/ValidateOrderStatus";
import { DefaultOrderStatus } from "./DefaultValue/DefaultOrderStatus";

export const Orders: CollectionConfig<'orders'> = {
    slug: 'orders',
    labels: { plural: 'Orders', singular: 'Order' },
    admin: {
        useAsTitle: 'createdAt'
    },
    fields: [
        {
            type: 'relationship',
            relationTo: 'order-status',
            name: 'status',
            label: 'Order Status',
            validate: ValidateOrderStatus,
            defaultValue: DefaultOrderStatus,
            admin: {
                position: 'sidebar'
            }
        }
    ]
}