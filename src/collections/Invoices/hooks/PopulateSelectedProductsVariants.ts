import { Invoice } from "@/payload-types";
import type { FieldHook } from "payload";

export type PopulateSelectedProductsVariantsType = () => FieldHook<Invoice, Invoice['billingProducts'], Invoice>

export const PopulateSelectedProductsVariants: PopulateSelectedProductsVariantsType = () => {
    return async ({ value, previousValue, req, data, originalDoc: doc }) => {
        // IDs extract karein selected products ki
        const billingProductsIDs = (value ?? [])?.map(item => (typeof item === 'object' ? item.id : item));
        const billId = doc?.id || (data as any)?.id;

        // 1. Change Check
        const hasChanged = JSON.stringify(value) !== JSON.stringify(previousValue);
        if (!billId || !hasChanged) return value!;

        // 2. Fetch Existing Items from DB (Kyuki data variable mein sirf IDs hain)
        // Hamein depth 0 chahiye taake sirf IDs milein performance ke liye
        const existingEntries = await req.payload.find({
            collection: 'invoiceItems',
            where: { billId: { equals: billId } },
            depth: 0,
            limit: 0,
            req,
        });

        // 3. Agar list khali hai to sab delete kardo
        if (!billingProductsIDs || billingProductsIDs.length === 0) {
            if (existingEntries.docs.length > 0) {
                await req.payload.delete({
                    collection: 'invoiceItems',
                    where: { billId: { equals: billId } },
                    req,
                });
            }
            return value!;
        }

        // 4. Products with Joined Variants fetch karein
        const productsWithJoins = await req.payload.find({
            collection: 'products',
            where: { id: { in: billingProductsIDs } },
            depth: 0,
            pagination: false,
            select: { variants: true, enableVariants: true },
            req
        });

        // --- Logic: Map what SHOULD be in DB ---
        const targetVariantsMap = new Map<number, number>(); // variantID -> parentProductID
        const targetProductsSet = new Set<number>(); // direct productIDs

        for (const product of productsWithJoins.docs) {
            if (product.enableVariants) {
                const variants = (product as any).variants?.docs ?? [];
                for (const v of variants) {
                    const vID = typeof v === 'object' ? v.id : v;
                    targetVariantsMap.set(vID, product.id);
                }
            } else {
                targetProductsSet.add(product.id);
            }
        }

        // --- Filtering Logic ---
        const idsToDelete: number[] = [];
        const alreadyInDB_Variants = new Set<number>();
        const alreadyInDB_Products = new Set<number>();

        for (const entry of existingEntries.docs) {
            const variantID = typeof entry.variant === 'object' ? entry.variant?.id : entry.variant;
            const productID = typeof entry.product === 'object' ? entry.product?.id : entry.product;

            if (variantID) {
                if (!targetVariantsMap.has(variantID)) idsToDelete.push(entry.id);
                else alreadyInDB_Variants.add(variantID);
            } else if (productID && !variantID) {
                if (!targetProductsSet.has(productID)) idsToDelete.push(entry.id);
                else alreadyInDB_Products.add(productID);
            }
        }

        // 5. Execute Delete
        if (idsToDelete.length > 0) {
            await req.payload.delete({
                collection: 'invoiceItems',
                where: { id: { in: idsToDelete } },
                req,
            });
        }

        // 6. Execute Creation (Parallel)
        const executablePromises: Promise<any>[] = [];
        const tenant = doc?.tenant || (data as any)?.tenant;

        // Missing Variants Create karein
        targetVariantsMap.forEach((parentID, variantID) => {
            if (!alreadyInDB_Variants.has(variantID)) {
                executablePromises.push(
                    req.payload.create({
                        collection: 'invoiceItems',
                        data: { billId, variant: variantID, product: parentID, quantity: 0, discount: 0, tenant },
                        req
                    })
                );
            }
        });

        // Missing Simple Products Create karein
        for (const pID of targetProductsSet) {
            if (!alreadyInDB_Products.has(pID)) {
                executablePromises.push(
                    req.payload.create({
                        collection: 'invoiceItems',
                        data: { billId, product: pID, quantity: 0, discount: 0, tenant },
                        req
                    })
                );
            }
        }

        if (executablePromises.length > 0) {
            await Promise.all(executablePromises);
            console.log(`Created ${executablePromises.length} new items.`);
        }

        return value!;
    }
}