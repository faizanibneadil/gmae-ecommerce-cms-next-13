import * as Yup from 'yup'

export const productFormInitialValues = {
    id: "616c048d746602001fb86ec3",
    title: "",
    slug: "",
    description: "",
    regularPrice: 0,
    salePrice: 0,
    purchasePrice: 0,
    categoryId: "",
    purchaseLimit: false,
    isTrackStock: true,
    isReviewEnable: false,
    visibility: false,
    stock: 0,
    images: [{ id: "", src: "" }],
    attributes: [{ id: "", name: "", value: "" }],
}

export const createProductSchema = Yup.object({
    id: Yup.string(),
    title: Yup.string().required("Product title can not be empty."),
    slug: Yup.string().required("Product slug can not be empty."),
    description: Yup.string().notRequired(),
    regularPrice: Yup
        .number()
        .transform((values, originalValues) => +originalValues)
        .typeError("Price should be a number")
        .required("Price can not be empty"),
    salePrice: Yup.number().typeError("Price should be a number"),
    purchasePrice: Yup.number().typeError("Price should be a number"),
    categoryId: Yup.string().notRequired(),
    purchaseLimit: Yup
        .boolean()
        .notRequired(),
    isTrackStock: Yup.boolean().notRequired(),
    isReviewEnable: Yup.boolean().notRequired(),
    visibility: Yup.boolean().notRequired(),
    stock: Yup.number().typeError("Stock should be a number"),
})