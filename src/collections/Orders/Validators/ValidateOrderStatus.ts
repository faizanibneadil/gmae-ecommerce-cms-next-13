import { Validate } from "payload";

export const ValidateOrderStatus: Validate = (value) => {

    if (!value) {
        return 'Set Order Status.'
    }

    return true
}