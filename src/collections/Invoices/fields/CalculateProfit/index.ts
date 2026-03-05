import { type NumberField, deepMerge } from "payload"
import { CalculateProfitHook } from "./hooks/CalculateProfitHook"

export type CalculateProfitField = (overrides?: Partial<NumberField>) => NumberField
export const ProfitField: CalculateProfitField = (overrides = {}) => {
    const _field: NumberField = {
        type: 'number',
        name: 'profit',
        label: 'Invoice Profit',
        defaultValue: 0,
        hooks: {
            beforeChange: [CalculateProfitHook()]
        }
    }

    return deepMerge(_field, overrides)
} 