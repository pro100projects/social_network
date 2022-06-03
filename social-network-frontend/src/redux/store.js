// Redux
import { configureStore } from '@reduxjs/toolkit';
// Slices
import chatSlice from './slice/chatSlice';
import userSlice from "./slice/userSlice";


const store = configureStore({
    reducer: {
        chat: chatSlice,
        user: userSlice,
    }
});

export default store;