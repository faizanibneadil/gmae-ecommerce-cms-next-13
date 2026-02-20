import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";
import { ProfitField } from "./fields/CalculateProfit";
import { BookedByField } from "./fields/BookedByField";
import { DeliveredByField } from "./fields/DeliveredByField";
import { AreaField } from "./fields/AreaField";
import { ShopsField } from "./fields/ShopsField";
import { CompanyField } from "./fields/CompanyField";
import { PopulateSelectedProductsVariants } from "./hooks/PopulateSelectedProductsVariants";

export const Invoices: CollectionConfig<'invoices'> = {
    slug: 'invoices',
    labels: { plural: 'Invoices', singular: 'Invoice' },
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
            type: 'relationship',
            relationTo: 'products',
            name: 'billingProducts',
            hasMany: true,
            hooks: {
                afterChange: [PopulateSelectedProductsVariants()]
            },
            filterOptions: ({ data }) => {
                // console.log({ data })
                const companyID = data?.company

                if (companyID) {
                    return {
                        'company.id': {
                            equals: companyID
                        }
                    }
                }

                return false
            },
            admin: {
                condition: ({ company }) => Boolean(company),
                allowCreate: false,
                allowEdit: false,
                isSortable: false,
            }
        },
        {
            name: 'items',
            type: 'join',
            collection: 'invoiceItems',
            on: 'billId',
            maxDepth:2,
            admin: {
                components: {
                    Field: '@/collections/Invoices/components/SyncBillingItems.tsx#SyncBillingItems'
                },
                condition: ({ company, billingProducts }) => {
                    const hasCompany = Boolean(company)
                    const hasManyBillingProducts = Array.isArray(billingProducts) && billingProducts.length > 0

                    return hasCompany && hasManyBillingProducts
                },
                defaultColumns: ['product', 'variant', 'quantity', 'discount'],
                allowCreate: false,
                disableRowTypes: true,
                disableGroupBy:false,
                disableListColumn: false,
                disableListFilter: false,
            }
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
