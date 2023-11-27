import { createContext } from "react";

const cartContext = createContext(
    {
        cart: {},
        addToCart : ()=>{},
        deleteFromCart : ()=>{},
    }
)

export default cartContext