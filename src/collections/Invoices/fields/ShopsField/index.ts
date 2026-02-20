import { type RelationshipField, deepMerge } from "payload";
import { ValueIsRequired } from "./validators";

export type ShopsFieldType = (overrides?: Partial<RelationshipField>) => RelationshipField
export const ShopsField: ShopsFieldType = (overrides = {}) => {
    const _field: RelationshipField = {
        type: 'relationship',
        relationTo: 'shops',
        name: 'shop',
        label: 'Shop',
        validate: ValueIsRequired,
        admin: {
            width: '33.33%',
            allowCreate: false,
            allowEdit: false,
            placeholder: 'Select a Shop',
        },
        filterOptions: ({ data }) => data?.area ? ({ 'area.id': { equals: data?.area } }) : false,
    }

    return deepMerge(_field, overrides)
}