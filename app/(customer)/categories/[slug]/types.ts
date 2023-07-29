export interface CategoriesAndProductsTypes {
    category: {
        id: string;
        name: string | null;
        slug: string | null;
        images: {
            id: string;
            src: string | null;
        } | null;
        subCategory: {
            id: string;
            name: string | null;
            slug: string | null;
        }[];
        Products: {
            id: string;
            title: string | null
            slug: string | null
            images: {
                src: string | null;
            }[]
        }[];
    } | null
}