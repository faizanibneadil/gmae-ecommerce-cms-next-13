import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { DefaultValue } from "payload";

export type SetDefaultPriceType = () => DefaultValue
export const SetDefaultPrice: SetDefaultPriceType = () => {
    return async ({ req }) => {
        try {
            const selectedDistribution = getTenantFromCookie(req.headers, 'number')

            if (!selectedDistribution) {
                return undefined
            }

            const _defaultCurrency = await req.payload.find({
                req,
                collection: 'currencies',
                where: {
                    and: [
                        {
                            'tenant.id': {
                                equals: selectedDistribution
                            }
                        },
                        {
                            code: {
                                equals: 'USD'
                            }
                        }
                    ]
                }
            })

            if (_defaultCurrency?.docs?.length === 0) {
                return undefined
            }

            const currency = {
                currency: _defaultCurrency?.docs?.at(0),
                price: 0
            }


            return [currency]
        } catch (error) {
            req.payload.logger.error({ error }, 'Something went wong to get default currency.')
            return undefined
        }
    }
}