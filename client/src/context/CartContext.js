import { createContext, useContext } from "react";

export const CartContext = createContext({
  products: [],
  totalPrice: 0,
});

export const useCartContext = () => useContext(CartContext);
