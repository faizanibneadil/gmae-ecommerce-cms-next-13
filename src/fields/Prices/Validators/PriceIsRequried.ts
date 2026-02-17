import { Validate } from "payload";

export type PriceIsRequiredType = () => Validate
export const PriceIsRequired: PriceIsRequiredType = () => {
    return (value, { event, req }) => {
        if (value?.length === 0) {
            return 'Price is required.'
        }
        return true
    }
}