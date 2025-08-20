import { Link } from "react-router-dom";
import "./CSS/Signup.css";
import { AuthContext } from "../Context/AuthContext";
import { useState, useContext } from "react";

// ✅ import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading/Loading";

function Signup() {
  const { register, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedpassword, setRepeatedPassword] = useState("");

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    // validation
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !repeatedpassword.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    if (password !== repeatedpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await register(username, email, password);
    } catch (error) {
      toast.error(error.message || "Signup failed, please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <div className="signup-fields">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Your Name"
          />
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
          <input
            value={repeatedpassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
            type="password"
            placeholder="Repeat Password"
          />
        </div>
        <button type="button" onClick={handleSubmitRegister}>
          {loading ? <Loading /> : <span>Register</span>}
        </button>
        <p className="signup-text">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span>Login Here</span>
          </Link>
        </p>
        <div className="signup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
