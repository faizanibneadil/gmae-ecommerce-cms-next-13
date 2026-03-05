import { FieldHook } from "payload";

export const CapitalizeOrderStatusValue: FieldHook = ({ value, previousDoc }) => {
    return value?.toUpperCase().trim().split(' ').join('_')
}