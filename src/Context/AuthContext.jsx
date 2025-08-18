import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const bodyValue = { email, password };
    const response = await fetch(
      "https://ecommerce-backend-935007092710.europe-west3.run.app/api/user/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyValue),
      }
    );

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    console.log(data);
    // setUser(data.user);
    // Store tokens
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    navigate("/");
  };

  const register = async (username, email, password) => {
    const bodyValue = { name: username, email, password };
    const response = await fetch(
      "https://ecommerce-backend-935007092710.europe-west3.run.app/api/user/register/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyValue),
      }
    );

    if (!response.ok) throw new Error("Registration failed");
    const data = await response.json();
    console.log(data);
  };

  const value = { user, login, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
