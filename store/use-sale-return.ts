import { create } from "zustand";

type TProducts = {
    id: string;
    products: {
        id: string
        title: string | null;
        regularPrice: number | null;
        salePrice: number | null;
        profit: number | null;
    }[];
    quantity: number | null;
    qty?: number | undefined
};

interface TBill {
    id: string;
    accessId: number;
    createdAt: Date;
    isReturned: boolean
}

export interface SaleReturnStore {
    messages: string[] | undefined
    isFetching: boolean
    saleManId: string
    areaId: string
    bills: TBill[] | undefined;
    items: TProducts[] | undefined;
    extraDiscount: string
    setExtraDiscount: (extraDiscount: string) => void
    setItems: (items: TProducts[] | undefined) => void
    setQty: (id: string, qty: number) => void
    getQty: (id: string) => number | undefined
    setSaleManId: (saleManId: string) => void
    setAreaId: (areaId: string) => void
    setBills: (items: TBill[] | undefined) => void
    setFetching: (isFetching: boolean) => void
    setMessages: (message: string[] | undefined) => void
}

const useSaleReturn = create<SaleReturnStore>((set, get) => ({
    messages: [],
    isFetching: false,
    saleManId: "",
    areaId: "",
    bills: [],
    items: [],
    extraDiscount: "",
    setExtraDiscount: (extraDiscount) => set((state) => ({ extraDiscount })),
    setMessages: (messages) => set((state) => ({ messages })),
    setItems: (items) => set((state) => ({ items })),
    setQty: (id, qty) => set(state => ({ items: state.items?.map(i => i.id === id ? { ...i, qty } : i) })),
    getQty: (id) => get().items?.find(i => i.id === id)?.qty,
    setFetching: (isFetching) => set((state) => ({ isFetching })),
    setSaleManId: (saleManId) => set((state) => ({ saleManId })),
    setAreaId: (areaId) => set((state) => ({ areaId })),
    setBills: (bills) => set((state) => ({ bills })),
}));

export default useSaleReturn;
