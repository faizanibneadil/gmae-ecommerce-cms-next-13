import type { Billing } from "@/payload-types";
import type { FieldHook } from "payload";

export const CalculateProfitHook: () => FieldHook<Billing, NonNullable<Billing['profit']>, Billing> = () => {
    return ({
        value,
        previousValue,
    }) => {

        if (value !== previousValue) {
            return value!
        }

        return value!
    }
}