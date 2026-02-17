import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";
import { ProfitField } from "./fields/CalculateProfit";
import { BookedByField } from "./fields/BookedByField";
import { DeliveredByField } from "./fields/DeliveredByField";
import { AreaField } from "./fields/AreaField";
import { ShopsField } from "./fields/ShopsField";
import { CompanyField } from "./fields/CompanyField";

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
            type: 'relationship',
            relationTo: 'products',
            name: 'billingProducts',
            hasMany: true,
            hooks: {
                afterChange: [
                    async ({
                        value, // billingProducts IDs
                        req,
                        originalDoc: doc, // current bill document
                        previousDoc,
                    }) => {
                        const billId = doc.id
                        const billingProductsIDs = value as number[]

                        // 1. Agar koi billing product select nahi hai, to is bill ke saare variants ura do
                        if (!billingProductsIDs || billingProductsIDs.length === 0) {
                            await req.payload.delete({
                                collection: 'billingVariants',
                                where: {
                                    billId: { equals: billId },
                                },
                                req,
                            })
                            return
                        }

                        // 2. Database se un variants ko fetch karein jo selected products ke hain (Required Variants)
                        const variantsQuery = await req.payload.find({
                            collection: 'variants',
                            where: {
                                product: { in: billingProductsIDs },
                            },
                            limit: 0,
                            depth: 0,
                            req,
                        })

                        const requiredVariantIDs = variantsQuery.docs.map((v) => v.id)

                        // 3. BillingVariants collection mein check karein ke is bill ke liye abhi kya saved hai
                        const existingBillVariants = await req.payload.find({
                            collection: 'billingVariants',
                            where: {
                                billId: { equals: billId },
                            },
                            limit: 0,
                            depth: 0,
                            req,
                        })

                        const currentSavedVariantIDs = existingBillVariants.docs.map((bv) =>
                            typeof bv.variant === 'object' ? bv.variant.id : bv.variant,
                        )

                        // --- LOGIC 3.1 & 3.2: DELETE UNWANTED & ADD MISSING ---

                        // A. DELETE: Jo variant existing mein hai par required list mein nahi (User ne product remove kiya)
                        for (const existingEntry of existingBillVariants.docs) {
                            const vID = typeof existingEntry.variant === 'object' ? existingEntry.variant.id : existingEntry.variant

                            if (!requiredVariantIDs.includes(vID)) {
                                await req.payload.delete({
                                    collection: 'billingVariants',
                                    id: existingEntry.id,
                                    req,
                                })
                            }
                        }

                        // B. CREATE: Jo variant required hai par existing mein nahi (User ne product add kiya)
                        for (const vID of requiredVariantIDs) {
                            if (!currentSavedVariantIDs.includes(vID)) {
                                await req.payload.create({
                                    collection: 'billingVariants',
                                    data: {
                                        billId: billId,
                                        variant: vID,
                                        quantity: 0,
                                        discount: 0,
                                        // Agar aap tenant use kar rahe hain:
                                        // tenant: doc.tenant 
                                    },
                                    req,
                                })
                            }
                        }

                    }
                ]
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
            name: 'billingItems',
            type: 'join',
            collection: 'billingVariants',
            on: 'billId',
            admin: {
                defaultColumns: ['variant', 'quantity', 'discount'],
                allowCreate: false,
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
