export interface CartItemsType {
    cart: {
        _count: {
            items: number;
        };
        items: {
            quantity: number | null;
            products: {
                id: string;
                title: string | null;
                regularPrice: number | null;
                salePrice: number | null;
                images: {
                    id: string;
                    src: string | null;
                }[];
            } | null;
        }[];
    } | null
}