import type { CollectionConfig } from "payload";
import { CapitalizeOrderStatusValue } from "./hooks/CapitalizeOrderStatusValue";

export const OrderStatus: CollectionConfig<'orderStatus'> = {
    slug: 'orderStatus',
    labels: { plural: 'Order Statuses', singular: 'Order Status' },
    admin: {
        useAsTitle: 'label',
        defaultColumns: ['label', 'value', 'createdAt', 'updatedAt']
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'label',
                },
                {
                    type: 'text',
                    name: 'value',
                    hooks: {
                        beforeChange: [CapitalizeOrderStatusValue]
                    }
                }
            ]
        }
    ]
}