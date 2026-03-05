import type { Invoice } from "@/payload-types";
import type { Validate } from "payload";
import { relationship } from "payload/shared";

export const ValueIsRequired: Validate<any, Invoice, any> = (value, args) => {

    if (!value) {
        return 'Sales Man is Required.'
    }

    return relationship(value, args as any)
}