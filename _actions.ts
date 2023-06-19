'use server'
import { revalidatePath } from "next/cache";
import { createCategory, deleteCategoryById, deleteProduct } from "./_mutations";
import { redirect } from "next/navigation";
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