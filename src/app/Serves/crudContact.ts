import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface MessagesResponse {
    status: string;
    code: number;
    message: string;
    results: number;
    data: Message[];
}

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://mbk-2-backend.vercel.app/api/v1/contact',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getMessages: builder.query<MessagesResponse, void>({
            query: () => '',
            providesTags: ['Contact'],
        }),
        deleteMessage: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
        getMessage: builder.query<Message, string>({
            query: (id) => `/${id}`,
            providesTags: ['Contact'],
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useDeleteMessageMutation,
    useGetMessageQuery,
} = contactApi;
