import { createContext } from "react";

const categoryContext = createContext(
    {
        categories: [],
        setCategory: ()=> {}
    }
);

export default categoryContext