import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";
import { ProfitField } from "./fields/CalculateProfit";
import { BookedByField } from "./fields/BookedByField";
import { DeliveredByField } from "./fields/DeliveredByField";
import { AreaField } from "./fields/AreaField";
import { ShopsField } from "./fields/ShopsField";
import { CompanyField } from "./fields/CompanyField";
import { ProductsField } from "./fields/ProductsField";

export const Billing: CollectionConfig<'billing'> = {
    slug: 'billing',
    labels: { plural: 'Billings', singular: 'Billing' },
    access: Pages.access,
    admin: {
        useAsTitle: 'createdAt',
    },
    enableQueryPresets: true,
    fields: [
        {
            type: 'row',
            fields: [BookedByField(), DeliveredByField()]
        },
        {
            type: 'row',
            fields: [AreaField(), ShopsField(), CompanyField()]
        },
        {
            type: 'group',
            label: 'Billing Products',
            admin: {
                hideGutter: true,
                description: 'Before start select product you have to select Company based on company product will show.',
            },
            fields: [ProductsField()]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'date',
                    name: 'deliverAt',
                    label: 'Deliver At (Delivery Date)',
                    required: true,
                    defaultValue: () => {
                        const now = new Date()
                        now.setDate(now.getDate() + 1)
                        return now
                    }
                },
                {
                    type: 'number',
                    name: 'extraDiscount',
                    label: 'Extra Discount',
                    defaultValue: 0
                }
            ]
        },
        {
            type: 'row',
            fields: [ProfitField()]
        }
    ],
}
