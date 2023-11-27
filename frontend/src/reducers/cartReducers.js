import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {}
    },
    reducers:{
        addToCart: (state, action)=>{
            console.log('added to cart', action.payload.id)
                if(state.items[action.payload.id]){
                    state.items[action.payload.id].quantity += 1
                }else{
                    action.payload = {
                        ...action.payload, quantity: 1}
                    state.items[action.payload.id] = action.payload
                }
        },

        deleteFromCart: (state, action)=>{
            console.log('remove from cart', action.payload.id)
            state.items[action.payload.id].quantity -=1
            if(state.items[action.payload.id].quantity <= 0){
                delete state.items[action.payload.id]
                // state.items = omit(state.items, [state.items[action.payload.id]])
                // console.log(state.items)
            }
        }
    }
}
)

export const {addToCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer