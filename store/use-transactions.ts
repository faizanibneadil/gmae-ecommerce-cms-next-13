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

type TShops = {
    id: string;
    name: string | null;
};


export interface TransactionStore {
    isFetching: boolean
    bookerId: string
    saleManeId: string
    areaId: string
    shopId: string
    companyId: string
    transactionDate: Date
    items: BillItem[] | undefined;
    shops: TShops[] | undefined
    setBookerId: (bookerId: string) => void
    setSaleManeId: (saleManeId: string) => void
    setAreaId: (areaId: string) => void
    setShopId: (shopId: string) => void
    setCompanyId: (companyId: string) => void
    setDeliveryDate: (transactionDate: Date) => void
    setItems: (items: BillItem[] | undefined) => void
    setShops: (shops: TShops[] | undefined) => void
    setFetching: (isFetching: boolean) => void
    setQty: (id: string, qty: number) => void
    getQty: (id: string) => number | undefined
}

const useTransaction = create<TransactionStore>((set, get) => ({
    isFetching: false,
    bookerId: "",
    saleManeId: "",
    areaId: "",
    shopId: "",
    companyId: "",
    transactionDate: addDays(new Date(), 1),
    items: [],
    shops: [],
    companies: [],
    setFetching: (isFetching) => set((state) => ({ isFetching })),
    setBookerId: (bookerId) => set((state) => ({ bookerId })),
    setSaleManeId: (saleManeId) => set((state) => ({ saleManeId })),
    setAreaId: (areaId) => set((state) => ({ areaId })),
    setShopId: (shopId) => set((state) => ({ shopId })),
    setCompanyId: (companyId) => set((state) => ({ companyId })),
    setDeliveryDate: (transactionDate) => set((state) => ({ transactionDate })),
    setItems: (items) => set((state) => ({ items })),
    setShops: (shops) => set((state) => ({ shops })),
    setQty: (id, qty) => set(state => ({ items: state.items?.map(i => i.id === id ? { ...i, qty } : i) })),
    getQty: (id) => get().items?.find(i => i.id === id)?.qty
}));

export default useTransaction;
