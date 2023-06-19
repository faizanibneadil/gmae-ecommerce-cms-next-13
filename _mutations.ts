import { prisma, } from "@/config/db"
import { getServerSession } from "next-auth"
import { authOptions } from "./config/authOptions"

export type TCategory = {
    image: string
    name: string
    categoryId: undefined
    userId: string
}
export async function createCategory() {
    const session = await getServerSession(authOptions)
    return console.log(session)
}

export async function deleteCategoryById(id: string) {
    try {
        await prisma.categories.delete({ where: { id: id } })
        console.log("Delete Success 👍")
    } catch (e) {
        console.log(e)
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.products.delete({ where: { id } })
        console.log("Delete Product Success 👍")
    } catch (e) {
        console.log(e)
    }
}