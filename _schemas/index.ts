import z from "zod"

export const createCategorySchema = z.object({
    id: z.string({ required_error: "ID is required." }),
    name: z.string({ required_error: "Category Name is required." }),
    slug: z.string({ required_error: "Category slug is required." }),
    order: z.coerce.number(),
    categoryId: z.string()
})

export const createProductSchema = z.object({
    id: z.string({ required_error: "Product ID is Required." }),
    title: z.string({ required_error: "Product title is Required" }),
    slug: z.string({ required_error: "Product slug is required." }),
    description: z.string().optional(),
    regularPrice: z.coerce.number().default(0),
    salePrice: z.coerce.number().default(0),
    purchasePrice: z.coerce.number().default(0),
    purchaseLimit: z.coerce.number().default(0),
    stock: z.coerce.number().default(0),
    isTrackStock: z.coerce.boolean().default(false),
    isReviewEnable: z.coerce.boolean().default(false),
    isPublished: z.coerce.boolean().default(false),
    categories: z.string().optional()
})

export const createImagesSchema = z.object({
    id: z.string(),
    src: z.string(),
    searchText: z.string(),
    altText: z.string()
})

export const createAttributesSchema = z.object({
    productId: z.string(),
    attrId: z.string(),
    name: z.string(),
    value: z.string()
})