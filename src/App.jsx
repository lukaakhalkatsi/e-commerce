import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import Signup from "./Pages/Signup";
import ConfirmEmail from "./Pages/ConfirmEmail";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Routes>
      {/* Independent confirm_url route */}
      <Route path="/confirm_url/:uidb64/:token" element={<ConfirmEmail />} />

      {/* All routes with Navbar + Footer */}
      <Route
        path="/*"
        element={
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route
                path="/men"
                element={
                  <ShopCategory ItemCategory="men" banner={men_banner} />
                }
              />
              <Route
                path="/women"
                element={
                  <ShopCategory ItemCategory="women" banner={women_banner} />
                }
              />
              <Route
                path="/kids"
                element={
                  <ShopCategory ItemCategory="kid" banner={kid_banner} />
                }
              />
              <Route path="/product/:productId" element={<Product />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
            </Routes>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
