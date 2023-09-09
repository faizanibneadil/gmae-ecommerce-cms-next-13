'use server'
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "./config/db";
import { createAttributesSchema, createBrandSchema, createCategorySchema, createCompanySchema, createImagesSchema, createProductSchema, createShopSchema, updateDeliveryLocationSchema } from "./_schemas";
import { redirect } from "next/navigation";
import { calculatePercentage } from "./lib/utils";
import { z } from "zod";

export async function createCategoryAction(form: any) {
    const res = createCategorySchema.parse(form)
    const { id, ...values } = res
    try {
        await prisma.categories.update({
            data: { ...values },
            where: { id }
        })
        revalidatePath(`/admin/categories/${id}`)
        console.log("Category Updated Successfully 👍")
    } catch (e) {
        console.log("Something went wrong when Creating Or Updating with this error 👎")
        console.log(e)
    }
}

export async function deleteCategoryByIdAction(id: string) {
    await prisma.categories.delete({ where: { id } })
    revalidatePath("/admin/categories")
}

export async function deleteProductAction(id: string) {
    await prisma.products.delete({ where: { id } })
    revalidatePath("/admin/inventory")
}

export async function createProductAction(values: z.infer<typeof createProductSchema>) {
    const { id, regularPrice, salePrice, ...otherValues } = createProductSchema.parse(values)
    try {
        await prisma.products.update({
            data: {
                ...otherValues,
                regularPrice,
                salePrice,
                discountInPercentage: calculatePercentage(regularPrice, salePrice)
            },
            where: { id }
        })
        revalidatePath(`/admin/inventory/${id}`)
        console.log("Updated Successfully 👍")
    } catch (e) {
        console.log("Something went wrong when Updating Product with this error 👎")
        console.log(e)
    }
}

export async function createImageAction(form: any) {
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
        revalidatePath(`admin/inventory/${productId}`)
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

export async function disconnectVariantAction({ variantId, productId }: { variantId: string, productId?: string }) {
    try {
        await prisma.products.update({
            data: {
                variants: {
                    disconnect: {
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
        revalidatePath("/admin/categories")
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
        revalidatePath(`admin/inventory/${productId}`)
        console.log("Successfully connected category with product 👍")
    } catch (e) {
        console.log("Something went wrong when connecting image to production 👎")
        console.log(e)
    }
}

export async function connectCategories({ categoriesIds, productId }: { categoriesIds: string[], productId: string }) {
    try {
        await prisma.products.update({
            data: {
                Categories: {
                    set: categoriesIds?.map(p => ({ id: p }))
                }
            },
            where: {
                id: productId
            }
        })
        revalidatePath(`/admin/inventory/${productId}/categories`)
        console.log("Successfully updated product categories 👍")
    } catch (e) {
        console.log("Something went wrong when connecting image to production 👎")
        console.log(e)
    }
}

export async function connectSubCategories({ categoriesIds, categoryId }: { categoriesIds: string[], categoryId: string }) {
    try {
        await prisma.categories.update({
            data: {
                subCategories: {
                    set: categoriesIds?.map(c => ({ id: c }))
                }
            },
            where: {
                id: categoryId
            }
        })
        revalidatePath(`/admin/categories/${categoryId}/categories`)
        revalidatePath(`/admin/categories`)
        console.log("Successfully updated sub Categories 👍")
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
    return id
}

export async function initializeNewCategory() {
    const { id } = await prisma.categories.create({ data: {}, select: { id: true } })
    revalidatePath("/admin/categories")
    return id
}

export async function initImage() {
    const { id } = await prisma.images.create({ data: {}, select: { id: true } })
    return id
}

export async function initCompany() {
    const { id } = await prisma.companies.create({ data: {}, select: { id: true } })
    return id
}

export async function createCompany(form: typeof createCompanySchema) {
    const { id, ...values } = createCompanySchema.parse(form)
    try {
        await prisma.companies.update({
            data: { ...values },
            where: { id }
        })
        revalidatePath(`/admin/companies/${id}`)
        console.log("Company Successful Created Or Updated 👍")
    } catch (e) {
        console.log("Something went wrong when creating new or updating company 👎")
        console.log(e)
    }
}

export async function initBrand() {
    const { id } = await prisma.brands.create({ data: {}, select: { id: true } })
    return id
}


export async function createBrand(form: typeof createBrandSchema) {
    const { id, ...values } = createBrandSchema.parse(form)
    try {
        await prisma.brands.update({
            data: { ...values },
            where: { id }
        })
        revalidatePath(`/admin/brands/${id}`)
        console.log("Brand Successful Created Or Updated 👍")
    } catch (e) {
        console.log("Something went wrong when creating new or updating Brand 👎")
        console.log(e)
    }
}

export async function initShop() {
    const { id } = await prisma.shops.create({ data: {}, select: { id: true } })
    return id
}

export async function createShop(form: typeof createShopSchema) {
    const { id, ...values } = createShopSchema.parse(form)
    try {
        await prisma.shops.update({
            data: { ...values },
            where: { id }
        })
        revalidatePath(`/admin/shops/${id}`)
        console.log("Shop Successful Created Or Updated 👍")
    } catch (e) {
        console.log("Something went wrong when creating new or updating Shop 👎")
        console.log(e)
    }
}


export async function initAttribute({ productId }: { productId: string }) {
    await prisma.attributes.create({
        data: {
            product: {
                connect: {
                    id: productId
                }
            }
        }
    })
}

export async function deleteAttribute({ productId, attributeId }: { productId: string, attributeId: string }) {
    await prisma.attributes.delete({
        where: {
            product: {
                id: productId
            },
            id: attributeId
        }
    })
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

interface AddToFavoriteProps {
    productId: string | undefined,
    userId: string | undefined
}
export async function addToFavorite({ productId, userId }: AddToFavoriteProps) {
    if (!productId && !userId) {
        return;
    }

    try {
        const favorite = await prisma.favorites.findUnique({
            where: {
                userId: userId,
            },
        });

        if (favorite) {
            const { productId: db_productIds } = favorite;
            const updatedProductIds = db_productIds.includes(`${productId}`)
                ? db_productIds.filter((id) => id !== productId)
                : [...db_productIds, productId];

            await prisma.favorites.update({
                where: {
                    userId: userId,
                },
                data: {
                    productId: updatedProductIds as [],
                },
            });
            console.log("Successfully updated & added to favorites 👍")
        } else {
            await prisma.favorites.create({
                data: {
                    productId: [productId as string],
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
        revalidatePath(`/cart`)
    } catch (e) {
        console.log(e)
    }
}
export async function removeToCart({ userId, productId }: AddToCartTypes) {
    try {
        // update product quantity if product is existed in cart item
        const item = await prisma.cartItem.findMany({ where: { products: { id: productId }, Cart: { user: { id: userId } } } })
        await prisma.cart.update({
            data: {
                items: {
                    delete: {
                        id: item[0].id
                    }
                }
            },
            where: { userId }
        })
        revalidatePath(`/cart`)
    } catch (e) {
        console.log(e)
    }
}

export async function decrementToCart({ userId, productId }: AddToCartTypes) {
    try {
        // update product quantity if product is existed in cart item
        const item = await prisma.cartItem.findMany({ where: { products: { id: productId }, Cart: { user: { id: userId } } } })
        if (Number(item[0]?.quantity) <= 1) {
            await prisma.cart.update({
                data: {
                    items: {
                        delete: {
                            id: item[0].id
                        }
                    }
                },
                where: { userId }
            })
        } else {
            await prisma.cart.update({
                data: {
                    items: {
                        update: {
                            data: { quantity: { decrement: 1 } },
                            where: { id: item[0].id }
                        }
                    }
                },
                where: { userId }
            })
        }
        revalidatePath(`/cart`)
    } catch (e) {
        console.log(e)
    }
}

