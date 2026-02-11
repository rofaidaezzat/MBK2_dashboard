import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SalesActivity {
    hour: number;
    sales: number;
}

export interface StatsData {
    totalRevenue: number;
    activeOrders: number;
    inventoryHealth: number;
    siteTraffic: number;
    salesActivity: SalesActivity[];
}

export interface StatsResponse {
    status: string;
    data: StatsData;
}

export const statsApi = createApi({
    reducerPath: 'statsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://mbk-2-backend.vercel.app/api/v1/stats',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getStats: builder.query<StatsResponse, void>({
            query: () => '',
        }),
    }),
});

export const { useGetStatsQuery } = statsApi;
