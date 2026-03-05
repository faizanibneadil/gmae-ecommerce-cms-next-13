import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import type { DefaultValue } from "payload";

export const DefaultOrderStatus: DefaultValue = async ({ req }) => {
    try {

        const selectedDistribution = getTenantFromCookie(req.headers, 'number')

        if (!selectedDistribution) {
            return undefined
        }

        const orderStatus = await req.payload.find({
            req,
            collection: 'orderStatus',
            where: {
                and: [
                    {
                        'tenant.id': {
                            equals: selectedDistribution
                        }
                    },
                    {
                        value: {
                            equals: 'PENDING'
                        }
                    }
                ]
            }
        })

        if (orderStatus?.docs?.length) {
            return orderStatus?.docs?.at(0)?.id
        }

        return undefined

    } catch (error) {
        req.payload.logger.error({ error }, 'Something went wrong to get pending status')
        return undefined
    }
}