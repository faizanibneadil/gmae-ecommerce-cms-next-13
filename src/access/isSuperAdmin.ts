import { User } from "@/payload-types";
import type { Access } from "payload";

export const isSuperAdmin = (user: User | null) => {
    if (user?.roles?.includes('SUPER_ADMIN')) {
        return true
    }
    return false
}