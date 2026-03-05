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

export const calculateProfit = ({
    regularPrice,
    salePrice,
    purchasePrice
}: {
    regularPrice: number,
    salePrice: number,
    purchasePrice: number
}): number => {
    const initial_profit = regularPrice - purchasePrice
    // 20                // 70           // 50
    if (!salePrice || salePrice === 0) return initial_profit
    const reduced_price_profit = salePrice - purchasePrice
    //  10                    // 60       / 50
    return reduced_price_profit;
};

export const startOfDay = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate.toISOString();
}

export const endOfDay = () => {
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 999)
    return currentDate.toISOString();
}