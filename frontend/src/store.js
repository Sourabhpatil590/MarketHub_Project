import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducers";
import wishListReducer from "./reducers/wishListReducer";

export default configureStore({
    reducer: {
        cart:cartReducer,
        wishList:wishListReducer
    }
})