import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { deepMerge, JoinField, Where, type ArrayField } from "payload";
import { SetDefaultPrice } from "./DefaultValues/setDefaultPrice";
import { PriceIsRequired } from "./Validators/PriceIsRequried";

export type PricesFieldType = (overrides?: Partial<JoinField>) => JoinField
export const PricesField: PricesFieldType = (overrides = {}) => {
    const _field: JoinField = {
        type: 'join',
        collection: 'invoices',
        name: 'invoices',
        on: 'billingProducts',
        // defaultValue: SetDefaultPrice(),
        // validate: PriceIsRequired(),
        admin: {
            description: 'This price will also be used for sorting and filtering products. If you have variants enabled then you can enter the lowest or average price to help with search and filtering, but this price will not be used for checkout.',
        }
    }

    return deepMerge(_field, overrides)
}