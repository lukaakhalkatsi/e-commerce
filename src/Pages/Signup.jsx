import { Link } from "react-router-dom";
import "./CSS/Signup.css";
import { AuthContext } from "../Context/AuthContext";
import { useState, useContext, useEffect } from "react";

// ✅ import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading/Loading";

function Signup() {
  const { register, resendEmailConfirm, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedpassword, setRepeatedPassword] = useState("");

  // ✅ New states
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canClick, setCanClick] = useState(false);

  // ✅ Countdown effect
  useEffect(() => {
    let interval;
    if (showResend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !canClick) {
      setCanClick(true);
    }
    return () => clearInterval(interval);
  }, [showResend, timer]);

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
      // ✅ Show resend link & start timer
      setShowResend(true);
      setTimer(60);
      setCanClick(false);
    } catch (error) {
      toast.error(error.message || "Signup failed, please try again.");
    }
  };

  // ✅ Handle resend email click
  const handleResendEmailConfirm = async () => {
    if (!canClick) return;
    try {
      console.log(`email ${email}`);
      await resendEmailConfirm(email);
      setTimer(60);
      setCanClick(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmitRegister}>
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
          <button type="submit">
            {loading ? <Loading /> : <span>Register</span>}
          </button>
        </form>

        {showResend ? (
          <p className="resend-email">
            Didn’t get a mail?{" "}
            {canClick ? (
              <span className="resend-link" onClick={handleResendEmailConfirm}>
                Resend
              </span>
            ) : (
              <span className="resend-wait">Wait {timer}s</span>
            )}
          </p>
        ) : (
          <p className="signup-text">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span>Login Here</span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
