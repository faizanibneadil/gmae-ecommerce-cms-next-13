import { addDays } from "date-fns";
import { create } from "zustand";

type BillItem = {
    title: string | null;
    images: {
        src: string | null;
    }[];
    id: string;
    regularPrice: number | null;
    salePrice: number | null;
    stock: number | null;
    qty?: number | undefined
};

interface TBill {
    id: string;
    accessId: number;
    createdAt: Date;
}

export interface SaleReturnStore {
    isFetching: boolean
    saleManId: string
    areaId: string
    bills: TBill[] | undefined;
    setSaleManId: (saleManId: string) => void
    setAreaId: (areaId: string) => void
    setBills: (items: TBill[] | undefined) => void
    setFetching: (isFetching: boolean) => void
}

const useSaleReturn = create<SaleReturnStore>((set, get) => ({
    isFetching: false,
    saleManId: "",
    areaId: "",
    bills: [],
    setFetching: (isFetching) => set((state) => ({ isFetching })),
    setSaleManId: (saleManId) => set((state) => ({ saleManId })),
    setAreaId: (areaId) => set((state) => ({ areaId })),
    setBills: (bills) => set((state) => ({ bills })),
}));

export default useSaleReturn;
