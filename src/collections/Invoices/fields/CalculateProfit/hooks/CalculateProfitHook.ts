import type { Invoice } from "@/payload-types";
import type { FieldHook } from "payload";

export const CalculateProfitHook: () => FieldHook<Invoice, NonNullable<Invoice['profit']>, Invoice> = () => {
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