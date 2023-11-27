import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
    name: 'wishList',
    initialState: {
        items: {}
    },
    reducers:{
        addToWishList: (state, action) => {
            state.items[action.payload.id] = action.payload
            console.log('added to wishlist', action.payload.id)
        },
        deleteFromWishList: (state, action) => {
            delete state.items[action.payload.id]
            console.log('removed from wishlist', action.payload.id)
        }
    }
}
)

export const {addToWishList, deleteFromWishList} = WishlistSlice.actions 

export default WishlistSlice.reducer