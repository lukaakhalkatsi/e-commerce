import { useState } from "react";
import "./CSS/ConfirmResetPassword.css";
import { useParams } from "react-router-dom";
import { Loader2, CheckCircle } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ConfirmResetPassword() {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorShake, setErrorShake] = useState(false);

  const handleSubmitConfirmResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 4000);
      return;
    }
    setStatus("loading");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_API_URL}/user/password-reset-confirm/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uidb64, token, new_password: newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Fail");
      }

      await response.json();
      setNewPassword("");
      setStatus("success");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("❌ Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmitConfirmResetPassword}>
        <div className="reset-box">
          <h2>Reset Your Password</h2>
          <input
            className={errorShake ? "error" : ""}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter new password"
            disabled={status === "loading" || status === "success"}
          />

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? (
              <Loader2 className="icon spin" size={20} />
            ) : status === "success" ? (
              <CheckCircle className="icon success" size={20} />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConfirmResetPassword;
