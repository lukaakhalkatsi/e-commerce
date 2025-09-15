import React, { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_API_URL}/cart/`
        ); // 👈 your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        console.log(data);
        setCartItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, loading }}>
      {children}
    </CartContext.Provider>
  );
}
