import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './Serves/cruduser';
import { productsApi } from './Serves/crudProduct';
import { contactApi } from './Serves/crudContact';
import { ordersApi } from './Serves/crudOrders';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productsApi.middleware,
            contactApi.middleware,
            ordersApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
