import { getTenantFromCookie } from "@payloadcms/plugin-multi-tenant/utilities";
import { deepMerge, Where, type ArrayField } from "payload";
import { SetDefaultPrice } from "./DefaultValues/setDefaultPrice";
import { PriceIsRequired } from "./Validators/PriceIsRequried";

export type PricesFieldType = (overrides?: Partial<ArrayField>) => ArrayField
export const PricesField: PricesFieldType = (overrides = {}) => {
    const _field: ArrayField = {
        type: 'array',
        name: 'prices',
        admin: {
            description: 'This price will also be used for sorting and filtering products. If you have variants enabled then you can enter the lowest or average price to help with search and filtering, but this price will not be used for checkout.',
            components: {
                RowLabel: '@/fields/Prices/components/CurrencyInfo.tsx#CurrencyInfo'
            },
            initCollapsed: true,
            isSortable: false
        },
        labels: { plural: 'Price', singular: 'Prices' },
        validate: PriceIsRequired(),
        defaultValue: SetDefaultPrice(),
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        type: 'relationship',
                        name: 'currency',
                        label: 'Currency',
                        relationTo: 'currencies',
                        admin: {
                            width: '50%',
                            allowCreate: false,
                            allowEdit: false,
                            isSortable:false,
                        },
                        filterOptions: ({ data, siblingData }) => {
                            // @ts-expect-error
                            const currentCurrencyID = typeof siblingData?.currency === 'object' ? siblingData?.currency?.id : siblingData?.currency;

                            const filteredCurrenciesIDs: (string | number)[] = [];
                            if (data?.prices?.length) {
                                for (const item of data.prices) {
                                    if (item?.currency) {
                                        const id = typeof item.currency === 'object' ? item.currency.id : item.currency;

                                        if (id && id !== currentCurrencyID) {
                                            filteredCurrenciesIDs.push(id);
                                        }
                                    }
                                }
                            }

                            if (filteredCurrenciesIDs.length === 0) {
                                return true;
                            }

                            return {
                                id: {
                                    not_in: filteredCurrenciesIDs
                                }
                            };
                        }
                    },
                    {
                        type: 'number',
                        name: 'price',
                        defaultValue: 0,
                        admin: {
                            width: '50%',

                        }
                    }
                ]
            }
        ]
    }

    return deepMerge(_field, overrides)
}