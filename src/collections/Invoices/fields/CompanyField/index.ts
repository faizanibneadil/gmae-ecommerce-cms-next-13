import { type RelationshipField, deepMerge } from "payload";
import { ValueIsRequired } from "./validators";

export type CompanyFieldType = (overrides?: Partial<RelationshipField>) => RelationshipField
export const CompanyField: CompanyFieldType = (overrides = {}) => {
    const _field: RelationshipField = {
        type: 'relationship',
        relationTo: 'companies',
        name: 'company',
        label: 'Company',
        validate: ValueIsRequired,
        admin: {
            width: '33.33%',
            allowCreate: false,
            allowEdit: false,
            placeholder: 'Select a Company'
        }
    }

    return deepMerge(_field, overrides)
}