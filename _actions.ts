'use server'
import { revalidatePath } from "next/cache";
import { createCategory, deleteCategoryById, deleteProduct } from "./_mutations";
import { getServerSession } from "next-auth";
/**
 * 
 * @param values 
 * 
 * Handling Categories CRUD Options
 * 
 */
export async function createCategoryAction(values: any) {
    const session = await getServerSession()
    await createCategory({ ...values, userId: session?.user.id })
    revalidatePath("/admin/categories")
}

export async function deleteCategoryByIdAction(id: string) {
    await deleteCategoryById(id)
    revalidatePath("/create/categories")
}

export async function deleteProductAction(id: string) {
    await deleteProduct(id)
    revalidatePath("/admin/products")
}

