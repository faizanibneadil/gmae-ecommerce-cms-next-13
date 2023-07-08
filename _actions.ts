'use server'
import { revalidatePath } from "next/cache";
import { createCategory, deleteCategoryById, deleteProduct } from "./_mutations";
import { redirect } from "next/navigation";
import { prisma } from "./config/db";
/**
 * 
 * @param values 
 * 
 * Handling Categories CRUD Options
 * 
 */
export async function createCategoryAction(values: any) {
    const url = `${process.env.BASE_URL}/admin/categories/create/apis`
    fetch(url, { method: 'POST', body: JSON.stringify(values) }).catch(error => {
        console.error(error);
    });
    revalidatePath("/admin/categories")
    redirect("/admin/categories")
}

export async function deleteCategoryByIdAction(id: string) {
    await deleteCategoryById(id)
    revalidatePath("/create/categories")
}

export async function deleteProductAction(id: string) {
    await deleteProduct(id)
    revalidatePath("/admin/products")
}

export async function createProductAction(values: any) {
    const url = `${process.env.BASE_URL}/admin/products/create/apis`
    fetch(url, { method: 'POST', body: JSON.stringify(values) }).catch(error => {
        console.error(error);
    });
    revalidatePath("/admin/products")
    redirect("/admin/products")
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