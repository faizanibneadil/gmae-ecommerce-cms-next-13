import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const priceFormatter = new Intl.NumberFormat("en-US", {
    currency: "PKR",
    style: "currency"
})

export const calculatePercentage = (
    regularPrice: number,
    salePrice: number
): number => {
    if (!salePrice || salePrice === 0) return 0
    const discount = regularPrice - salePrice;
    const percentage = (discount / regularPrice) * 100;
    return percentage;
};