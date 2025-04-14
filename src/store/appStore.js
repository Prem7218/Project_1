import { configureStore } from "@reduxjs/toolkit";
import cartProvider from "../slices/cartSlice";

export const appStore = configureStore({
    name: "appStore",
    reducer: {
        cartData: cartProvider,
    }
})