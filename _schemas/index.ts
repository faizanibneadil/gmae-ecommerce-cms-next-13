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
    title: z.string().trim().min(1, "Minimum 1 corrector is required.").max(100, "Maximum 100 correctors are allowed."),
    slug: z.string().trim().toLowerCase().transform(value => value.replace(/[^\w\s-]/g, "").replace(/\s+/g, " ").trim().replace(/\s+/g, "-")),
    description: z.string().trim().max(600, "Maximum 600 correctors are allowed.").optional(),
    regularPrice: z.coerce.number().nonnegative("Negative Numbers not allowed.").default(0),
    salePrice: z.coerce.number().nonnegative("Negative Numbers not allowed.").default(0),
    purchasePrice: z.coerce.number().nonnegative("Negative Numbers not allowed.").default(0),
    purchaseLimit: z.coerce.number().nonnegative("Negative Numbers not allowed.").default(0),
    stock: z.coerce.number().nonnegative("Negative Numbers not allowed.").default(0),
    isTrackStock: z.coerce.boolean().default(false),
    isReviewEnable: z.coerce.boolean().default(false),
    isPublished: z.coerce.boolean().default(false),
    isFeatured: z.coerce.boolean().default(false),
})
    .refine((ctx) => ctx.purchasePrice < ctx.regularPrice && ctx.purchasePrice < ctx.salePrice, { message: "Purchase Price should be lower than Regular Price and Sale Price.", path: ["purchasePrice"] })
    .refine((ctx) => ctx.salePrice < ctx.regularPrice && ctx.salePrice > ctx.purchasePrice, { message: "Sale Price should be lower than Regular Price and higher than Purchase Price.", path: ["salePrice"] })
    .refine((ctx) => ctx.regularPrice > ctx.salePrice && ctx.regularPrice > ctx.purchasePrice, { message: "Regular Price should be higher than Sale Price and higher than Purchase Price.", path: ["salePrice"] })
    .refine((ctx) => ctx.regularPrice > ctx.purchasePrice, { message: "Regular Price should be higher than Purchase Price.", path: ["regularPrice"] })
    .refine((ctx) => ctx.salePrice ? ctx.salePrice < ctx.regularPrice : true, { message: "Sale Price should be lower than Regular Price.", path: ["salePrice"] })
    .refine((ctx) => ctx.salePrice ? ctx.salePrice > ctx.purchasePrice : true, { message: "Sale Price should be higher than the Purchase Price.", path: ["salePrice"] })
    .refine((ctx) => ctx.salePrice ? ctx.regularPrice > ctx.salePrice : true, { message: "Regular Price should be higher than Sale Price.", path: ["regularPrice"] })

export const createImagesSchema = z.object({
    id: z.string(),
    src: z.string().nonempty("Image Source / Id Required."),
    searchText: z.string(),
    altText: z.string()
})

export const createAttributesSchema = z.object({
    productId: z.string(),
    name: z.string().trim().nonempty("Name is required."),
    value: z.string().trim().nonempty("Value is required.")
})

export const createCompanySchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    name: z.string({ required_error: "Company Name is Required." }).trim().nonempty("Company Name is required.")
})

export const createAreaSchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    name: z.string({ required_error: "Area Name is Required." }).trim().nonempty("Company Name is required.")
})

export const createBrandSchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    name: z.string().trim().nonempty("Brand Name is Required.")
})

export const createShopSchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    name: z.string({ required_error: "Name is required." }).trim().nonempty("Shop Name is required."),
    owner: z.string({ required_error: "Owner is required." }).trim().nonempty("Shop Owner is required."),
    phone: z.string().nonempty("Phone Number is required.").refine((value) => /^\d{11}$/.test(value), { message: "Phone Number must be exactly 11 numeric digits." }),
    address: z.string().trim().nonempty("Shop Address is required."),
    popType: z.enum(["RETAILER", "WHOLESALER"], { required_error: "Pop Type is required." }),
    payType: z.enum(["CASH", "CHEQUE", "BILL"], { required_error: "Payment Method is required." })
})

export const createAddressSchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    label: z.string().nonempty("Label is required."),
    streetAddress1: z.string().nonempty("Street Address 1 is required."),
    streetAddress2: z.string().optional(),
    apartment: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postalCode: z.coerce.number({ required_error: "Postal Code / ZIP Code is required." }).refine((value) => /^\d{5}$/.test(value.toString()), { message: "Postal code must be exactly 5 numeric digits." }),
    phone: z.string().nonempty("Phone Number is required.").refine((value) => /^\d{11}$/.test(value), { message: "Phone Number must be exactly 11 numeric digits." })
})

export const createUserSchema = z.object({
    id: z.string({ required_error: "Id is required." }),
    name: z.string().nonempty("Name is required."),
    email: z.string().nonempty("Email is required."),
    cnic: z.string().optional(),
    role: z.enum(["CUSTOMER", "SALES_MAN", "BOOKER", "INVENTORY_STAFF", "ADMIN", "BILLING", "INSIGHTS", "SHOP_OWNER"], { required_error: "User Role is required." }),
    phone: z.string().nonempty("Phone Number is required.").refine((value) => /^\d{11}$/.test(value), { message: "Phone Number must be exactly 11 numeric digits." })
})

export const createBillingSchema = z.object({
    bookerId: z.string().nonempty("Select Booker."),
    saleManeId: z.string().nonempty("Select Sale Man"),
    areaId: z.string().nonempty("Select Area."),
    shopId: z.string().nonempty("Select Shop."),
    companyId: z.string().nonempty("Select Company."),
    deliveryDate: z.date({ required_error: "Select Delivery Date." }),
    items: z.object({
        id: z.string(),
        qty: z.coerce.number().nonnegative("Negative numbers are not allowed.").optional()
    }).array().min(1, "Minimum 1 item should be into a sale.")
})

export const updateBillReturn = z.object({
    saleManId: z.string().nonempty("Select Sale Man"),
    areaId: z.string().nonempty("Select Area."),
})

