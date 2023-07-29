export interface CategoriesTypes {
    categories: {
        id: string;
        slug: string | null;
        name: string | null;
        images: {
            id: string;
            src: string | null;
        } | null;
    }[]
}