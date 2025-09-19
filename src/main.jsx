import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./Context/ShopContext.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartProvider>
          <ShopContextProvider>
            <App />
          </ShopContextProvider>
        </CartProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
