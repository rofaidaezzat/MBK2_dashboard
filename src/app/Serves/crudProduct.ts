import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    tags: string[];
    images: string[];
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProductResponse {
    status: string;
    code: number;
    message: string;
    results: number;
    pagination: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
    data: Product[];
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://mbk-2-backend.vercel.app/api/v1/products',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                console.log("Setting Authorization header:", `Bearer ${token.substring(0, 10)}...`);
            } else {
                console.warn("No token found in localStorage for productsApi");
            }
            return headers;
        },
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductResponse, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => `?page=${page}&limit=${limit}`,
            providesTags: ['Product'],
        }),
        addProduct: builder.mutation<ProductResponse, Partial<Product> | FormData>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation<void, { id: string; body: Partial<Product> | FormData }>({
            query: ({ id, body }) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;
