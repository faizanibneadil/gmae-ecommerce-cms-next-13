import { prisma, } from "@/config/db"

export type TCategory = {
    image: string
    name: string
    categoryId: undefined
    userId: string
}
export async function createCategory(values: TCategory) {
    let query: any = {
        name: values.name,
        image: values.image,
        User: {
            connect: {
                id: values.userId
            }
        }
    };
    if (values.categoryId) {
        query.parentCategory = {
            connect: {
                id: values.categoryId
            }
        }
    }
    try {
        await prisma.categories.create({
            data: query
        })
        console.log("Create Success 👍")
    } catch (e) {
        console.log(e)
    }
}

export async function deleteCategoryById(id: string) {
    try {
        await prisma.categories.delete({ where: { id: id } })
        console.log("Delete Success 👎")
    } catch (e) {
        console.log(e)
    }
}