'use server'
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "./config/db";
import { createAttributesSchema, createCategorySchema, createImagesSchema, createProductSchema, updateDeliveryLocationSchema } from "./_schemas";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export async function createCategoryAction(formData: FormData) {
    const form = Object.fromEntries(formData)
    const { id, categoryId, ...values } = createCategorySchema.parse(form)
    let query = Object.create({});
    query.create = Object.assign(Object.create({}), { ...values });
    query.update = Object.assign(Object.create({}), { ...values });
    query.where = Object.assign(Object.create({}), { id: id });
    if (categoryId === 'undefined') {
        query.update = Object.assign(Object.create({}), { ...values, parentCategory: { disconnect: true } });
    } else if (categoryId) {
        query.create = Object.assign(Object.create({}), { ...values, parentCategory: { connect: { id: categoryId } } });
        query.update = Object.assign(Object.create({}), { ...values, parentCategory: { connect: { id: categoryId } } });
    }
    try {
        await prisma.categories.upsert(query)
        revalidateTag("parent-categories")
        console.log("Create Or Updated Successfully 👍")
    } catch (e) {
        console.log("Something went wrong when Creating Or Updating with this error 👎")
        console.log(e)
    }
}

export async function disconnectSubCategory({ subCategoryId, categoryId }: { subCategoryId?: string, categoryId?: string }) {
    if (subCategoryId && categoryId) {
        try {
            await prisma.categories.update({
                data: {
                    subCategory: {
                        disconnect: {
                            id: subCategoryId
                        }
                    }
                },
                where: {
                    id: categoryId
                }
            })
            revalidateTag("parent-categories")
        } catch (e) {
            console.log(`
                ==================================
                ERROR : When disconnecting sub category
                ==================================
            `)
            console.log(e)
        }
    } else {
        return console.log(`
        ==================================
        ERROR : When disconnecting sub category
        CategoryId and SubCategoryId is
        ==================================
    `);
    }
}

export async function deleteCategoryByIdAction(id: string) {
    // await deleteCategoryById(id)
    revalidateTag("parent-categories")
}

export async function deleteProductAction(id: string) {
    // await deleteProduct(id)
    revalidatePath("/admin/products")
}

export async function createProductAction(formData: any) {
    const form = Object.fromEntries(formData)
    const { id, categories, ...values } = createProductSchema.parse(form)
    let query = Object.create({});
    query.data = Object.assign(Object.create({}), { ...values });;
    query.where = Object.assign(Object.create({}), { id: id });
    if (categories) {
        query.data = Object.assign(Object.create({}), { ...values, Categories: { connect: categories?.split(",").map(c => ({ id: c })) } });
    }
    try {
        await prisma.products.update(query)
        revalidatePath(`/admin/inventory/${id}`)
        console.log("Updated Successfully 👍")
    } catch (e) {
        console.log("Something went wrong when Updating with this error 👎")
        console.log(e)
    }
}

export async function createImageAction(formData: FormData) {
    const form = Object.fromEntries(formData)
    const { id, searchText, ...values } = createImagesSchema.parse(form)
    try {
        await prisma.images.upsert({
            create: {
                ...values,
                searchText: {
                    set: searchText.split(" ")
                }
            },
            update: {
                ...values,
                searchText: {
                    set: searchText.split(" ")
                }
            },
            where: { id: id ?? 'dfe9a1ce-10fe-4569-8ceb-4b50ff1ac05c' }
        })
        revalidateTag("admin-all-images")
    } catch (e) {
        console.log("Something went wrong when Updating with this error 👎")
        console.log(e)
    }
}

export async function connectImageToProductAction({ imageId, productId }: { imageId: string, productId: string }) {
    try {
        await prisma.images.update({
            data: {
                Products: {
                    connect: {
                        id: productId
                    }
                }
            },
            where: {
                id: imageId
            }
        })
        revalidateTag("product-form-images")
        console.log("Successfully connected image with product 👍")
    } catch (e) {
        console.log("Something went wrong when connecting image to production 👎")
        console.log(e)
    }
}

export async function connectVariantAction({ variantId, productId }: { variantId: string, productId?: string }) {
    try {
        await prisma.products.update({
            data: {
                variants: {
                    connect: {
                        id: variantId
                    }
                }
            },
            where: {
                id: productId
            }
        })
        revalidateTag("admin-product-variants")
        console.log("Successfully connected variant 👍")
    } catch (e) {
        console.log("Something went wrong when connecting image to production 👎")
        console.log(e)
    }
}

export async function connectImageToCategoryAction({ imageId, categoryId }: { imageId: string, categoryId: string }) {
    try {
        await prisma.images.update({
            data: {
                Categories: {
                    connect: {
                        id: categoryId
                    }
                }
            },
            where: {
                id: imageId
            }
        })
        revalidateTag("parent-categories")
        console.log("Successfully connected image with product 👍")
    } catch (e) {
        console.log("Something went wrong when connecting image to production 👎")
        console.log(e)
    }
}

export async function disconnectImageToProductAction({ imageId, productId }: { imageId: string, productId: string }) {
    try {
        await prisma.images.update({
            data: {
                Products: {
                    disconnect: {
                        id: productId
                    }
                }
            },
            where: {
                id: imageId
            }
        })
        revalidateTag("product-form-images")
        console.log("Successfully connected image with product 👍")
    } catch (e) {
        console.log("Something went wrong when connecting image to production 👎")
        console.log(e)
    }
}

export async function createAttributesAction(formData: FormData) {
    const form = Object.fromEntries(formData.entries())
    const { productId, attrId, ...values } = createAttributesSchema.parse(form)
    try {
        await prisma.attributes.upsert({
            create: {
                ...values,
                product: {
                    connect: {
                        id: productId
                    }
                }
            },
            update: {
                ...values,
                product: {
                    connect: {
                        id: productId
                    }
                }
            },
            where: {
                id: attrId ?? productId
            }
        })
        revalidatePath(`/admin/inventory/${productId}`)
    } catch (e) {
        console.log("Something went wrong when Updating with this error 👎")
        console.log(e)
    }
}

export async function initializeNewInventory() {
    const { id } = await prisma.products.create({ data: {}, select: { id: true } })
    redirect(`/admin/inventory/${id}`)
}

export async function initializeNewCategory() {
    const { id } = await prisma.categories.create({ data: {}, select: { id: true } })
    revalidateTag("parent-categories")
    redirect(`/admin/categories?id=${id}`)
}

export async function addNewDeliveryLocation() {
    try {
        await prisma.deliveryLocations.create({ data: {} })
        revalidateTag("locations")
    } catch (e) {
        console.log(e)
    }
}

export async function updateDeliveryLocationAction(formData: FormData) {
    const form = Object.fromEntries(formData.entries())
    const values = updateDeliveryLocationSchema.parse(form)
    try {
        await prisma.deliveryLocations.update({
            data: {
                location: values.location,
                rate: values.LocationRate
            },
            where: {
                id: values.locationId
            }
        })
        revalidateTag("locations")
        console.log("Location has been successfully updated.👍")
    } catch (e) {
        console.log(e)
    }
}

export async function deleteDeliveryLocation({ locationId }: { locationId: string }) {
    try {
        await prisma.deliveryLocations.delete({
            where: {
                id: locationId
            }
        })
        revalidateTag("locations")
        console.log("Location has been successfully deleted.👍")
    } catch (e) {
        console.log(e)
    }
}

export async function addToFavorite(productId: string, userId?: string) {
    try {
        const favorite = await prisma.favorites.findUnique({
            where: {
                userId: userId,
            },
        });

        if (favorite) {
            const { productId: db_productIds } = favorite;
            const updatedProductIds = db_productIds.includes(productId)
                ? db_productIds.filter((id) => id !== productId)
                : [...db_productIds, productId];

            await prisma.favorites.update({
                where: {
                    userId: userId,
                },
                data: {
                    productId: updatedProductIds,
                },
            });
            console.log("Successfully updated & added to favorites 👍")
        } else {
            await prisma.favorites.create({
                data: {
                    productId: [productId],
                    User: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            console.log("Successfully added to favorites 👍")
        }
        revalidatePath("/favorite")
    } catch (e) {
        console.log(e)
        console.log("Something went wrong when adding to favorites 👎")
    }
}

interface AddToCartTypes {
    userId: string | undefined
    productId: string | undefined
}

export async function addToCart({ userId, productId }: AddToCartTypes) {
    try {
        // update product quantity if product is existed in cart item
        const item = await prisma.cartItem.findMany({ where: { products: { id: productId }, Cart: { user: { id: userId } } } })
        await prisma.cart.upsert({
            create: {
                user: { connect: { id: userId } },
                items: { create: { quantity: 1, products: { connect: { id: productId } } } }
            },
            update: {
                items: {
                    upsert: {
                        create: { quantity: 1, products: { connect: { id: productId } } },
                        update: { quantity: { increment: 1 } },
                        where: { id: !!item.length ? item[0].id : "add-new-item-to-cart" }
                    }
                }
            },
            where: { userId }
        })
        revalidateTag("user-cart")
    } catch (e) {
        console.log(e)
    }
}