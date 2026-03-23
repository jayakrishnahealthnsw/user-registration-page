import React, { useState, useEffect, useRef } from "react";
import { Lock, Mail, Info, AlertTriangle, Check, Ban } from "lucide-react";
import { Layout } from "../components/shared/Layout";
import {
  FieldLabel, TextInput, PasswordInput, InlineError,
} from "../components/shared/FormComponents";
import { PasswordStrength } from "../components/shared/PasswordStrength";
import { validateEmailFormat, passwordValid } from "../components/shared/validation";

type FpState = "enter_email" | "email_sent" | "new_password" | "expired" | "complete";

export function ForgotPasswordPage() {
  const [fpState, setFpState] = useState<FpState>("enter_email");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwAttempted, setPwAttempted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const startCooldown = (secs: number) => {
    setResendCooldown(secs);
    timerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const emailValid = validateEmailFormat(email);
  const showEmailError = emailTouched && !emailValid;
  const pwAllValid = passwordValid(newPw);
  const pwMatch = newPw === confirmPw && confirmPw.length > 0;

  const handleEmailSubmit = () => {
    setEmailTouched(true);
    if (!emailValid) return;
    setFpState("email_sent");
    startCooldown(60);
  };

  const handleNewPasswordSubmit = () => {
    setPwAttempted(true);
    if (!pwAllValid || !pwMatch) return;
    setFpState("complete");
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    startCooldown(60);
  };

  const handleBack = () => {
    window.open("https://nap-mono-25794994.figma.site/login", "_blank", "noopener,noreferrer");
  };

  const handleSignIn = () => {
    window.open("https://nap-mono-25794994.figma.site/login", "_blank", "noopener,noreferrer");
  };

  const primaryBtn: React.CSSProperties = {
    padding: "11px 0",
    backgroundColor: "#002664",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Public Sans', sans-serif",
    width: "100%",
    transition: "background-color 0.15s ease",
  };

  const outlineBtn: React.CSSProperties = {
    padding: "10px 0",
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#002664",
    border: "1px solid #002664",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'Public Sans', sans-serif",
  };

  const ghostBtn: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#6D7579",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Public Sans', sans-serif",
    padding: 0,
    alignSelf: "center",
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 4, paddingBottom: 4 }}>

        {/* ── Enter email ──────────────────────────────────────────────── */}
        {fpState === "enter_email" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 4 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", backgroundColor: "#EFF6FF",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px",
              }}>
                <Lock size={26} color="#002664" strokeWidth={2} />
              </div>
              <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
                Reset your password
              </h3>
              <p style={{ fontSize: 13, color: "#6D7579", lineHeight: 1.5 }}>
                Enter your registered work email address and we'll send a time-limited reset link.
              </p>
              <p style={{ fontSize: 11, color: "#9BA1A6", marginTop: 6, lineHeight: 1.5 }}>
                For "Create with Email Address" accounts only.{" "}
                Google / Apple users — manage via your provider.
              </p>
            </div>

            <div>
              <FieldLabel htmlFor="fp-email" required>Registered email address</FieldLabel>
              <TextInput
                id="fp-email"
                placeholder="e.g. name@health.nsw.gov.au"
                value={email}
                onChange={setEmail}
                type="email"
                autoComplete="email"
                onBlur={() => setEmailTouched(true)}
                hasError={showEmailError}
              />
              {showEmailError && <InlineError message="Enter a valid email address." />}
            </div>

            <button
              onClick={handleEmailSubmit}
              style={primaryBtn}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
            >
              Send reset link
            </button>

            <div style={{
              backgroundColor: "#F2F4F8", borderRadius: 8, padding: "10px 14px",
              display: "flex", gap: 8, alignItems: "flex-start",
            }}>
              <Info size={14} color="#6D7579" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 11, color: "#6D7579", lineHeight: 1.5, margin: 0 }}>
                <strong>US-SR-12:</strong> The same neutral confirmation is shown whether the email
                is registered or not — this prevents account enumeration.
                Unrecognised attempts are logged in the audit trail.
              </p>
            </div>

            <button onClick={handleBack} style={{ ...ghostBtn, color: "#002664", fontSize: 13, fontWeight: 600, alignSelf: "center" }}>
              Back to sign in options
            </button>
          </>
        )}

        {/* ── Email sent ───────────────────────────────────────────────── */}
        {fpState === "email_sent" && (
          <>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", backgroundColor: "#E5F6E6",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px",
              }}>
                <Mail size={28} color="#008A07" strokeWidth={2} />
              </div>
              <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Check your email
              </h3>
              <p style={{ fontSize: 13, color: "#6D7579", lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>
                If <strong style={{ color: "#22272B" }}>{email}</strong> matches a registered account,
                you'll receive a password reset link within a few minutes.
              </p>
            </div>

            <div style={{ backgroundColor: "#F2F4F8", borderRadius: 8, padding: "14px 18px" }}>
              {[
                { icon: "✉️", text: "Check your inbox and junk/spam folder" },
                { icon: "⏱", text: "Reset links expire after 1 hour" },
                { icon: "🔒", text: "Each new request invalidates any previous reset link" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, color: "#22272B", lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* DEV/TEST simulation */}
            <div style={{
              border: "1.5px dashed #C95000", borderRadius: 8,
              padding: "12px 16px", backgroundColor: "#FFFBF5",
            }}>
              <p style={{
                fontSize: 10, fontWeight: 700, color: "#C95000",
                textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8,
              }}>
                DEV / TEST — Simulate reset link outcome
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  onClick={() => setFpState("new_password")}
                  style={{
                    padding: "7px 14px", backgroundColor: "#008A07", color: "#ffffff",
                    border: "none", borderRadius: 6, cursor: "pointer",
                    fontSize: 12, fontWeight: 600, fontFamily: "'Public Sans', sans-serif",
                  }}
                >
                  ✓ Link Clicked (within validity)
                </button>
                <button
                  onClick={() => setFpState("expired")}
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

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                style={{
                  ...outlineBtn,
                  color: resendCooldown > 0 ? "#9BA1A6" : "#002664",
                  borderColor: resendCooldown > 0 ? "#E4E7EB" : "#002664",
                  backgroundColor: resendCooldown > 0 ? "#F2F4F8" : "#ffffff",
                  cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                }}
              >
                {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : "Resend reset email"}
              </button>
              <button onClick={handleBack} style={ghostBtn}>
                Back to sign in
              </button>
            </div>
          </>
        )}

        {/* ── Link expired ─────────────────────────────────────────────── */}
        {fpState === "expired" && (
          <>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", backgroundColor: "#FEF2F2",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px",
              }}>
                <Ban size={28} color="#D7153A" strokeWidth={2} />
              </div>
              <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Reset link expired
              </h3>
              <p style={{ fontSize: 13, color: "#6D7579", lineHeight: 1.6 }}>
                This reset link is no longer valid. For security, links expire after 1 hour.
              </p>
            </div>

            <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <AlertTriangle size={15} color="#D7153A" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5, margin: 0 }}>
                  Request a new reset email. Any previous links are now invalidated.
                </p>
              </div>
            </div>

            <button
              onClick={() => { setFpState("email_sent"); handleResend(); }}
              style={primaryBtn}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
            >
              Request new reset email
            </button>
            <button onClick={handleBack} style={ghostBtn}>
              Back to sign in
            </button>
          </>
        )}

        {/* ── New password ─────────────────────────────────────────────── */}
        {fpState === "new_password" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 4 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", backgroundColor: "#EFF6FF",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px",
              }}>
                <Lock size={26} color="#002664" strokeWidth={2} />
              </div>
              <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
                Set your new password
              </h3>
              <p style={{ fontSize: 12, color: "#6D7579", lineHeight: 1.5 }}>
                Your password must satisfy all 5 NSWHP requirements (US-SR-11).
              </p>
            </div>

            <div>
              <FieldLabel htmlFor="fp-new-pw" required>New password</FieldLabel>
              <PasswordInput
                id="fp-new-pw"
                placeholder="Create a secure password"
                value={newPw}
                onChange={setNewPw}
                autoComplete="new-password"
                hasError={pwAttempted && !pwAllValid}
              />
              <PasswordStrength password={newPw} />
              {pwAttempted && !pwAllValid && (
                <InlineError message="Password must meet all 5 security requirements above." />
              )}
            </div>

            <div>
              <FieldLabel htmlFor="fp-confirm-pw" required>Confirm new password</FieldLabel>
              <PasswordInput
                id="fp-confirm-pw"
                placeholder="Re-enter your password"
                value={confirmPw}
                onChange={setConfirmPw}
                autoComplete="new-password"
                hasError={pwAttempted && !pwMatch}
              />
              {pwAttempted && !pwMatch && (
                <InlineError message="Passwords do not match." />
              )}
            </div>

            <button
              onClick={handleNewPasswordSubmit}
              style={primaryBtn}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
            >
              Set new password
            </button>
          </>
        )}

        {/* ── Complete ─────────────────────────────────────────────────── */}
        {fpState === "complete" && (
          <>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", backgroundColor: "#E5F6E6",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px",
              }}>
                <Check size={32} color="#008A07" strokeWidth={2.5} />
              </div>
              <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Password updated successfully
              </h3>
              <p style={{ fontSize: 13, color: "#6D7579", lineHeight: 1.6 }}>
                Your password has been reset. Please sign in with your new credentials.
              </p>
            </div>

            <button
              onClick={handleSignIn}
              style={primaryBtn}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
            >
              Sign in with new password
            </button>
          </>
        )}

      </div>
    </Layout>
  );
}
