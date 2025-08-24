import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import "./CSS/ConfirmEmail.css";

function ConfirmEmail() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-backend-935007092710.europe-west3.run.app/api/user/confirm-email/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uidb64, token }),
          }
        );

        if (!response.ok) {
          setStatus("error");
          throw new Error("Failed to confirm email");
        }

        await response.json();
        setStatus("success");
      } catch (error) {
        console.error("❌ Error:", error);
        setStatus("error");
      }
    };

    confirmEmail();
  }, [uidb64, token]);

  // Countdown timer for redirect
  useEffect(() => {
    if (status !== "success") return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          navigate("/login");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, navigate]);

  return (
    <div className="confirm-container">
      <h1>Email Confirmation</h1>

      {status === "loading" && (
        <div className="status-container">
          <Loader2 className="spinner-icon" />
          <p>Confirming your email...</p>
        </div>
      )}

      {status === "success" && (
        <div className="status-container">
          <CheckCircle className="check-icon" />
          <p>Email confirmed successfully! Redirecting in {countdown}...</p>
        </div>
      )}

      {status === "error" && (
        <div className="status-container error">
          <p>❌ Error occurred, please try again.</p>
        </div>
      )}
    </div>
  );
}

export default ConfirmEmail;
