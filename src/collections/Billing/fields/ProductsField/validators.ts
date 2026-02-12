import type { Billing } from "@/payload-types";
import type { Validate } from "payload";
import { array } from "payload/shared";

export const MinimumOneProducts: Validate<any, Billing, any> = (value, args) => {

    if (value?.length === 0) {
        return 'At Least One Product Is Required.'
    }

    return array(value, args as any)
}