import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../features/inventorySlice';

const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
        // Add other reducers as needed
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
