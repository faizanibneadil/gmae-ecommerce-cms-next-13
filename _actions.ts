'use server'
import { revalidatePath } from "next/cache";
import { createAttribute, createCategory, deleteCategoryById } from "./_mutations";

/**
 * 
 * @param values 
 * 
 * Handling Categories CRUD Options
 * 
 */
export async function createCategoryAction(values: any) {
    await createCategory(values)
    revalidatePath("/create/categories")
}

export async function deleteCategoryByIdAction(id: string) {
    await deleteCategoryById(id)
    revalidatePath("/create/categories")
}

export async function createAttributeAction(name: string) {
    await createAttribute(name)
    revalidatePath("/create/attributes")
}

