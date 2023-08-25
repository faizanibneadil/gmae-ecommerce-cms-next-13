import { create } from "zustand";

type CartItem = {
    id: string | undefined;
    title: string | undefined | null;
    regularPrice: number | null | undefined;
    salePrice: number | null | undefined;
    image: string | null | undefined
    qty?: number;
    discount?: number;
    subtotal?: number;
};

interface CartStore {
    items: CartItem[];
    discount: number;
    total: number;
    location: string
    addToCart: (item: CartItem) => void;
    isProductInCart: (id: string | undefined) => boolean
    currantItem: (id: string | undefined) => CartItem | undefined
    calculateDiscount: (items: CartItem[]) => number
    calculateTotal: (items: CartItem[]) => number
    removeProductToCart: (id: string | undefined) => void
    setLocation: (location: string) => void
}

const useCart = create<CartStore>((set, get) => ({
    items: [],
    discount: 0,
    total: 0,
    location: "",
    setLocation: (location) => {
        set((state) => ({ location }))
        set((state) => ({ discount: get().calculateDiscount(state.items), total: get().calculateTotal(state.items) + +state.location }))
    },
    currantItem: (id) => get().items.find(i => i.id === id),
    isProductInCart: (id) => Boolean(get().items.find(i => i.id === id ? true : false)),
    calculateDiscount: (items) => items.reduce((p, n) => p + Number(n.discount), 0),
    calculateTotal: (items) => items.reduce((p, n) => p + Number(n.subtotal), 0),
    addToCart: (newItem) => {
        if (get().isProductInCart(newItem.id)) {
            set((state) => ({
                items: state.items.map(p => p.id === newItem.id ? {
                    ...newItem,
                    qty: Number(p.qty) + 1,
                    subtotal: (Number(p.qty) + 1) * Number(newItem.salePrice) ?? Number(newItem.regularPrice),
                    discount: (Number(p.qty) + 1) * (Number(newItem.regularPrice) - Number(newItem.salePrice))
                } : p)
            }))
            set((state) => ({ discount: get().calculateDiscount(state.items), total: get().calculateTotal(state.items) }))
            return
        }
        set((state) => ({
            items: [...state.items, {
                ...newItem,
                qty: 1,
                subtotal: 1 * Number(newItem.salePrice) ?? Number(newItem.regularPrice),
                discount: 1 * (Number(newItem.regularPrice) - Number(newItem.salePrice))
            }]
        }))
        set((state) => ({ discount: get().calculateDiscount(state.items), total: get().calculateTotal(state.items) }))
    },
    removeProductToCart: (id) => {
        set((state) => ({ items: state.items.filter(p => p.id != id) }))
        set((state) => ({ discount: get().calculateDiscount(state.items), total: get().calculateTotal(state.items) }))
    }
}));

export default useCart;
