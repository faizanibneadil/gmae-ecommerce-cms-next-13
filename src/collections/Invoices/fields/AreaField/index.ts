import { type RelationshipField, deepMerge } from "payload";
import { ValueIsRequired } from "./validators";

export type AreaFieldType = (overrides?: Partial<RelationshipField>) => RelationshipField
export const AreaField: AreaFieldType = (overrides = {}) => {
    const _field: RelationshipField = {
        type: 'relationship',
        relationTo: 'areas',
        name: 'area',
        label: 'Area',
        validate: ValueIsRequired,
        admin: {
            width: '33.33%',
            allowCreate: false,
            allowEdit: false,
            placeholder: 'Select a Area'
        },
    }

    return deepMerge(_field, overrides)
}