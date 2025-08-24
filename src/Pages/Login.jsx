import { Link } from "react-router-dom";
import "./CSS/Login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";
// ✅ import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      toast.error(error.message || "Login failed, try again.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmitLogin}>
          <div className="login-fields">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>
          <button type="submit">
            {loading ? <Loading /> : <span>Continue</span>}
          </button>
        </form>
        <p className="login-text">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span>Register Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
