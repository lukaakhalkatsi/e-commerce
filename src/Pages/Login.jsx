import { Link } from "react-router-dom";
import "./CSS/Login.css";

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-fields">
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
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
