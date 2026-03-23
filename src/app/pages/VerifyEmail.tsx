import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Mail, BadgeCheck, AlertTriangle, Ban } from "lucide-react";
import { Layout } from "../components/shared/Layout";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { email?: string; firstName?: string } | null) ?? {};
  const email = state.email ?? "jane.smith@health.nsw.gov.au";
  const firstName = state.firstName ?? "Jane";

  type VerifState = "pending" | "expired";
  const [verifState, setVerifState] = useState<VerifState>("pending");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resentCount, setResentCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = (seconds: number) => {
    setResendCooldown(seconds);
    timerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResentCount((c) => c + 1);
    setVerifState("pending");
    startCooldown(60);
  };

  const handleSuccess = () => navigate("/register/success", {
    state: { email, firstName },
  });

  const handleReturnToSignIn = () => {
    window.open("https://nap-mono-25794994.figma.site/login", "_blank", "noopener,noreferrer");
  };

  const btnBase: React.CSSProperties = {
    padding: "10px 0",
    width: "100%",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Public Sans', sans-serif",
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {verifState === "pending" ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, paddingTop: 8, paddingBottom: 8 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", backgroundColor: "#EFF6FF",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Mail size={32} color="#002664" strokeWidth={1.8} />
            </div>

            <div>
              <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Verify your email address
              </h3>
              <p style={{ fontSize: 13, color: "#6D7579", lineHeight: 1.6, maxWidth: 360 }}>
                Hi <strong style={{ color: "#22272B" }}>{firstName}</strong> — we've sent a verification link to{" "}
                <strong style={{ color: "#22272B" }}>{email}</strong>
                {resentCount > 0 && (
                  <> (resent {resentCount} time{resentCount > 1 ? "s" : ""})</>
                )}.
                Click the link to confirm your address and activate your account.
              </p>
            </div>

            <div style={{
              backgroundColor: "#F2F4F8", borderRadius: 8, padding: "14px 18px",
              width: "100%", textAlign: "left",
            }}>
              {[
                { icon: "✉️", text: "Check your inbox and junk/spam folder" },
                { icon: "⏱", text: "The link expires after 24 hours" },
                { icon: "🔒", text: "Each resend invalidates the previous link — only one active at a time" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, color: "#22272B", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              padding: "10px 14px", borderRadius: 8,
              backgroundColor: "#E5F6E6", border: "1px solid #A7F3A0",
            }}>
              <BadgeCheck size={16} color="#005C05" strokeWidth={2} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: 12, color: "#005C05", lineHeight: 1.5, margin: 0, textAlign: "left" }}>
                Registration submitted. Your account is pending email verification.
              </p>
            </div>

            {/* DEV/TEST simulation panel */}
            <div style={{
              border: "1.5px dashed #C95000", borderRadius: 8, padding: "12px 16px",
              width: "100%", backgroundColor: "#FFFBF5",
            }}>
              <p style={{
                fontSize: 10, fontWeight: 700, color: "#C95000",
                textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8,
              }}>
                DEV / TEST — Simulate email link outcome
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  onClick={handleSuccess}
                  style={{
                    padding: "7px 14px", backgroundColor: "#008A07", color: "#ffffff",
                    border: "none", borderRadius: 6, cursor: "pointer",
                    fontSize: 12, fontWeight: 600, fontFamily: "'Public Sans', sans-serif",
                  }}
                >
                  ✓ Link Clicked (valid token)
                </button>
                <button
                  onClick={() => setVerifState("expired")}
                  style={{
                    padding: "7px 14px", backgroundColor: "#D7153A", color: "#ffffff",
                    border: "none", borderRadius: 6, cursor: "pointer",
                    fontSize: 12, fontWeight: 600, fontFamily: "'Public Sans', sans-serif",
                  }}
                >
                  ✗ Link Expired
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                style={{
                  ...btnBase,
                  backgroundColor: resendCooldown > 0 ? "#F2F4F8" : "#002664",
                  color: resendCooldown > 0 ? "#9BA1A6" : "#ffffff",
                  cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                }}
              >
                {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : "Resend verification email"}
              </button>
              <button
                onClick={handleSuccess}
                style={{
                  ...btnBase,
                  backgroundColor: "#002664",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
              >
                Complete
              </button>
            </div>
          </div>
        ) : (
          /* Expired state */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, paddingTop: 8, paddingBottom: 8 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", backgroundColor: "#FEF2F2",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Ban size={32} color="#D7153A" strokeWidth={1.8} />
            </div>

            <div>
              <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Verification link expired
              </h3>
              <p style={{ fontSize: 13, color: "#6D7579", lineHeight: 1.6, maxWidth: 360 }}>
                The link sent to <strong style={{ color: "#22272B" }}>{email}</strong> has expired.
                Request a new link to complete your email verification.
              </p>
            </div>

            <div style={{
              backgroundColor: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: 8, padding: "12px 16px", width: "100%", textAlign: "left",
            }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <AlertTriangle size={15} color="#D7153A" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5, margin: 0 }}>
                  For security, verification links expire after <strong>24 hours</strong>.
                  Any previous links are now invalid — request a new one below.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                style={{
                  ...btnBase,
                  backgroundColor: resendCooldown > 0 ? "#F2F4F8" : "#002664",
                  color: resendCooldown > 0 ? "#9BA1A6" : "#ffffff",
                  cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                }}
              >
                {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : "Request new verification email"}
              </button>
              <button
                onClick={handleSuccess}
                style={{
                  ...btnBase,
                  backgroundColor: "#002664",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
              >
                Complete
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}