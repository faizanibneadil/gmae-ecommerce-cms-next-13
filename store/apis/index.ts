'use client'

import { Categories } from '@prisma/client'
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apis = createApi({
    reducerPath: 'apis',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
    endpoints: (builder) => ({
        getAllCategories: builder.query<any, void>({
            query: () => `/admin/products/create/apis`,
        }),
        saveProduct: builder.mutation({
            query: (values) => ({
                url: `/admin/products/create/apis`,
                method: 'POST',
                body: values,
            }),
        }),
        deleteProductById: builder.mutation({
            query: (id) => ({
                url: `/admin/products/create/apis`,
                method: 'DELETE',
                body: id,
            })
        }),
        editProductById: builder.query<void, string>({
            query: id => `/admin/products/${id}/apis`
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCategoriesQuery, useSaveProductMutation, useEditProductByIdQuery } = apis