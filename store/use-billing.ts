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

export interface BillStore {
    message: string[] | undefined
    isFetching: boolean
    bookerId: string
    saleManeId: string
    areaId: string
    shopId: string
    companyId: string
    deliveryDate: Date
    items: BillItem[] | undefined;
    shops: TShops[] | undefined
    setMessage: (message: string[] | undefined) => void
    setBookerId: (bookerId: string) => void
    setSaleManeId: (saleManeId: string) => void
    setAreaId: (areaId: string) => void
    setShopId: (shopId: string) => void
    setCompanyId: (companyId: string) => void
    setDeliveryDate: (deliveryDate: Date) => void
    setItems: (items: BillItem[] | undefined) => void
    setShops: (shops: TShops[] | undefined) => void
    setFetching: (isFetching: boolean) => void
    setQty: (id: string, qty: number) => void
    getQty: (id: string) => number | undefined
    resetQty: () => void
}

const useBilling = create<BillStore>((set, get) => ({
    message: [],
    isFetching: false,
    bookerId: "",
    saleManeId: "",
    areaId: "",
    shopId: "",
    companyId: "",
    deliveryDate: addDays(new Date(), 1),
    items: [],
    shops: [],
    companies: [],
    setMessage: (message) => set((state) => ({ message })),
    setFetching: (isFetching) => set((state) => ({ isFetching })),
    setBookerId: (bookerId) => set((state) => ({ bookerId })),
    setSaleManeId: (saleManeId) => set((state) => ({ saleManeId })),
    setAreaId: (areaId) => set((state) => ({ areaId })),
    setShopId: (shopId) => set((state) => ({ shopId })),
    setCompanyId: (companyId) => set((state) => ({ companyId })),
    setDeliveryDate: (deliveryDate) => set((state) => ({ deliveryDate })),
    setItems: (items) => set((state) => ({ items })),
    setShops: (shops) => set((state) => ({ shops })),
    setQty: (id, qty) => set(state => ({ items: state.items?.map(i => i.id === id ? { ...i, qty } : i) })),
    getQty: (id) => get().items?.find(i => i.id === id)?.qty,
    resetQty: () => set((state) => ({ items: state.items?.map(i => ({ ...i, qty: 0 })) }))
}));

export default useBilling;
