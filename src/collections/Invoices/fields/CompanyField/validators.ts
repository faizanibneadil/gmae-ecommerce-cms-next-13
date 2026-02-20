import type { Billing } from "@/payload-types";
import { type Validate } from "payload";
import { relationship } from "payload/shared";

export const ValueIsRequired: Validate<any, Billing, any> = (value, args) => {

    if (!value) {
        return 'Company is Required.'
    }

    return relationship(value, args as any)
}