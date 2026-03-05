import { type RelationshipField, deepMerge } from "payload";
import { ValueIsRequired } from "./validators";

export type BookedByFieldType = (overrides?: Partial<RelationshipField>) => RelationshipField
export const BookedByField: BookedByFieldType = (overrides = {}) => {
    const _field: RelationshipField = {
        type: 'relationship',
        relationTo: 'users',
        filterOptions: () => ({ 'roles': { in: ['BOOKER'] } }),
        validate: ValueIsRequired,
        name: 'bookedBy',
        hasMany: false,
        label: 'Booking By (Booker)',
        admin: {
            width: '50%',
            allowCreate: false,
            allowEdit: false,
            placeholder: 'Select a Booker'
        }
    }

    return deepMerge(_field, overrides)
}