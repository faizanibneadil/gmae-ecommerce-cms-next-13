import { type RelationshipField, deepMerge } from "payload";
import { ValueIsRequired } from "./validators";

export type DeliveredByFieldType = (overrides?: Partial<RelationshipField>) => RelationshipField
export const DeliveredByField: DeliveredByFieldType = (overrides = {}) => {
    const _field: RelationshipField = {
        type: 'relationship',
        relationTo: 'users',
        filterOptions: () => ({ 'roles': { in: ['SALES_MAN'] } }),
        name: 'deliveredBy',
        label: 'Deliver By (Sale Man)',
        validate: ValueIsRequired,
        admin: {
            width: '50%',
            allowCreate: false,
            allowEdit: false,
            placeholder: 'Select a Sale Man'
        }
    }

    return deepMerge(_field, overrides)
}