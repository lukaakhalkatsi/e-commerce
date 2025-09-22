import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_API_URL}/cart/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        console.log("Fetched:", data);
        setCartItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchCartItems();
    }
  }, [user, token]);

  const addItemToCart = async (slug) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_API_URL}/cart/add_item/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ slug }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (slug) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_API_URL}/cart/remove_item/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ slug }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item from cart");
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        loading,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
