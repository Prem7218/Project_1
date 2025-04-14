import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) =>  {
    const [productCount, setProductCount] = useState(0);

    return (
        <CartContext.Provider value={{productCount, setProductCount}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);