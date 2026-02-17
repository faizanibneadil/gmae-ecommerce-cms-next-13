import type { Validate } from 'payload'

export const validateOptions: Validate = async (values, { data, req }) => {
    const { t } = req

    if (!values || values.length === 0) {
        return 'Variant Option Required'
    }

    const productID = data.product

    if (!productID) {
        return 'Product Required.'
    }

    const product = await req.payload.findByID({
        req,
        id: productID,
        collection: 'products',
        depth: 1,
        joins: {
            variants: {
                where: {
                    // TODO: comment for now because currently we are not using trash functionality
                    // deletedAt: { exists: false },
                    ...(data.id && {
                        id: {
                            not_equals: data.id, // exclude the current variant from the search
                        },
                    }),
                },
            },
        },
        select: {
            variants: true,
            variantTypes: true,
        },
        user: req.user,
    })

    const variants = product.variants?.docs ?? []

    // @ts-expect-error - TODO: Fix types
    if (values.length < product?.variantTypes?.length) {
        return 'Variant Options Required All'
    }

    if (variants.length > 0) {
        const existingOptions: (number | string)[][] = []

        variants.forEach((variant: any) => {
            existingOptions.push(variant.options)
        })

        const exists = existingOptions.some((combo) => {
            return combo.length === values.length && combo.every((val) => values.includes(val))
        })

        if (exists) {
            return 'Variant Option Already Exist'
        }
    }

    return true
}