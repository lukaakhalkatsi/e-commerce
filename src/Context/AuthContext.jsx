import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// ✅ import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  };

  const refreshAccessToken = useCallback(async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return logout();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_API_URL}/user/token/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        }
      );

      if (!response.ok) throw new Error("Failed to refresh token");

      const data = await response.json();
      localStorage.setItem("access", data.access);

      const decoded = jwtDecode(data.access);
      setUser(decoded);
      return data.access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token && !isTokenExpired(token)) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    } else if (localStorage.getItem("refresh")) {
      refreshAccessToken();
    } else {
      logout(false);
    }
    setLoading(false);
  }, [refreshAccessToken]);

  const login = async (email, password) => {
    setError(null);
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_API_URL}/user/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        toast.error("Login failed");
        throw new Error("Login failed");
      }

      const data = await response.json();
      toast.success("Logged in successfully!");
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      const decoded = jwtDecode(data.access);
      setUser(decoded);
      navigate("/");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register
  const register = async (username, email, password) => {
    setError(null);
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_API_URL}/user/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: username, email, password }),
        }
      );

      if (!response.ok) {
        toast.error("Error Occured");
        throw new Error("Registration failed");
      }
      await response.json();
      toast.success(
        "Link was sent to your email, please verify and then login",
        { autoClose: 10000 }
      );
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = (redirect = true) => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    if (redirect) navigate("/login");
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      refreshAccessToken,
    }),
    [user, loading, error, refreshAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
