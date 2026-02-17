import type { CollectionSlug, SelectFieldServerProps } from 'payload'

import { FieldLabel } from '@payloadcms/ui'

import { ErrorBox } from './ErrorBox'
import './index.css'
import { OptionsSelect } from './OptionsSelect'
import { VariantType } from '@/payload-types'

type Props = {} & SelectFieldServerProps

export const VariantOptionsSelector: React.FC<Props> = async (props) => {
    const { clientField, data, field, path, req, user } = props
    const { label } = clientField

    // Get collection slugs from field custom prop, with defaults for backwards compatibility
    const productsSlug = (field.custom?.productsSlug as string) || 'products'
    const variantTypesSlug = (field.custom?.variantTypesSlug as string) || 'variantTypes'

    const product = await req.payload.findByID({
        id: data.product,
        // @ts-expect-error
        collection: productsSlug,
        depth: 0,
        draft: true,
        select: {
            variants: true,
            variantTypes: true,
        },
        user,
        req,
    })

    // @ts-expect-error - TODO: Fix types
    const existingVariantOptions = product.variants?.docs?.map((variant) => variant.options) ?? []

    // @ts-expect-error
    const variantTypeIDs = product.variantTypes

    const variantTypes: VariantType[] = []

    if (variantTypeIDs?.length && variantTypeIDs.length > 0) {
        const variantType = await req.payload.find({
            req,
            where: {
                id: {
                    in: variantTypeIDs
                }
            },
            collection: variantTypesSlug as 'variantTypes',
            depth: 1,
            joins: {
                options: {
                    sort: 'value',
                },
            },
        })
        if (variantType?.docs?.length) {
            variantType?.docs?.forEach(doc => {
                variantTypes.push(doc)
            })
        }
    }
    // Need to get the variant types separately so that the options are populated
    // if (variantTypeIDs?.length && variantTypeIDs.length > 0) {
    //     for (const variantTypeID of variantTypeIDs) {
    //         const variantType = await req.payload.findByID({
    //             req,
    //             id: variantTypeID,
    //             // @ts-expect-error
    //             collection: variantTypesSlug  as 'variantTypes',
    //             depth: 1,
    //             // @ts-expect-error
    //             joins: {
    //                 options: {
    //                     sort: 'value',
    //                 },
    //             },
    //         })

    //         if (variantType) {
    //             console.log({variantTypeFromLoop:variantType?.options?.docs})
    //             variantTypes.push(variantType)
    //         }
    //     }
    // }

    return (
        <div className="variantOptionsSelector">
            <div className="variantOptionsSelectorHeading">
                <FieldLabel as="span" label={label} />
            </div>

            <ErrorBox existingOptions={existingVariantOptions} path={path}>
                <div className="variantOptionsSelectorList">
                    {variantTypes?.map((type) => {
                        // @ts-expect-error - TODO: Fix types
                        const options = type.options.docs.map((option: VariantOption) => ({
                            label: option.label,
                            value: option.id,
                        }))

                        return (
                            <OptionsSelect
                                field={clientField}
                                key={type.name}
                                label={type.label || type.name}
                                options={options}
                                path={path}
                            />
                        )
                    })}
                </div>
            </ErrorBox>
        </div>
    )
}