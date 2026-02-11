import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ProductSummary {
    _id: string;
    title: string;
    price: number;
}

export interface OrderItem {
    product: ProductSummary;
    quantity: number;
    price: number;
    _id: string;
}

export interface Order {
    _id: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled'; // Adjust based on actual API
    shippingAddress: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OrdersResponse {
    status: string;
    code: number;
    message: string;
    results: number;
    pagination: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
    data: Order[];
}

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://mbk-2-backend.vercel.app/api/v1/orders',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrders: builder.query<OrdersResponse, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 } = {}) => `?page=${page}&limit=${limit}`,
            providesTags: ['Order'],
        }),
        deleteOrder: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),
        getOrder: builder.query<Order, string>({
            query: (id) => `/${id}`,
            providesTags: ['Order'],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useDeleteOrderMutation,
    useGetOrderQuery,
} = ordersApi;
