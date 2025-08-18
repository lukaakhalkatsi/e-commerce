import { Link } from "react-router-dom";
import "./CSS/Signup.css";
import { AuthContext } from "../Context/AuthContext";
import { useState, useContext } from "react";

function Signup() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedpassword, setRepeatedPassword] = useState("");

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    console.log({ username, email, password, repeatedpassword });
    try {
      if (password === repeatedpassword) {
        await register(username, email, password);
      } else {
        alert("parolebi ar emtxveva ertmanets");
      }
    } catch (error) {
      alert(error.message);
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
            type=""
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
          Register
        </button>
        <p className="signup-text">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span>Login Here</span>
          </Link>
        </p>
        <div className="signup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
