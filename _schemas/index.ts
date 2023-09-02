import z from "zod"

export const createCategorySchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, "Minimum 1 correctors are required.").max(40, "Maximum 40 correctors are allowed."),
    slug: z.string().trim().toLowerCase().transform(value => value.replace(/[^\w\s-]/g, "").replace(/\s+/g, " ").trim().replace(/\s+/g, "-")),
    order: z.coerce.number().nonnegative("0 Or Positive numbers only allowed. Ex: 1,2,3 ... 4"),
    isPublished: z.coerce.boolean(),
    displayOnLandingPage: z.coerce.boolean()
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
    isFeatured: z.coerce.boolean().default(false),
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

export const updateDeliveryLocationSchema = z.object({
    locationId: z.string(),
    location: z.string(),
    LocationRate: z.coerce.number()
})

export const createCompanySchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    name: z.string({ required_error: "Company Name is Required." })
})

export const createBrandSchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    name: z.string({ required_error: "Company Name is Required." })
})

export const createShopSchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    name: z.string({ required_error: "Id is required." }),
    owner: z.string({ required_error: "Id is required." }),
    phone: z.coerce.number({ required_error: "Id is required." }),
    address: z.string({ required_error: "Id is required." }),
    popType: z.enum(["RETAILER", "WHOLESALER"]),
    payType: z.enum(["CASH", "CHEQUE", "BILL"])
})