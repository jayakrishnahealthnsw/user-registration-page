import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Check, ShieldCheck, Info, AlertTriangle, Loader2 } from "lucide-react";
import { Layout } from "../components/shared/Layout";
import { StepIndicator } from "../components/shared/StepIndicator";
import {
  FieldLabel, PasswordInput, InlineError,
} from "../components/shared/FormComponents";
import { PasswordStrength } from "../components/shared/PasswordStrength";
import { passwordValid, sanitiseInput } from "../components/shared/validation";

const BACK_BTN: React.CSSProperties = {
  background: "#ffffff",
  border: "1.5px solid #002664",
  color: "#002664",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'Public Sans', sans-serif",
  padding: "8px 20px",
  borderRadius: 6,
};

const NEXT_BTN: React.CSSProperties = {
  flex: 1,
  padding: "11px 24px",
  backgroundColor: "#002664",
  color: "#ffffff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 700,
  fontFamily: "'Public Sans', sans-serif",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  transition: "background-color 0.15s ease",
};

// US-SR-10: Mock CAPTCHA overlay
function MockCaptcha({
  onVerified,
  onDismiss,
}: {
  onVerified: () => void;
  onDismiss: () => void;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleCheck = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(onVerified, 600);
    }, 1800);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.50)",
      zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, fontFamily: "'Public Sans', sans-serif",
    }}>
      <div style={{
        backgroundColor: "#ffffff", borderRadius: 12, padding: "28px 32px",
        maxWidth: 380, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, backgroundColor: "#FFF3E0",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ShieldCheck size={22} color="#C95000" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#22272B", marginBottom: 1 }}>Security Verification</p>
            <p style={{ fontSize: 11, color: "#6D7579" }}>US-SR-10 · Rate limit threshold reached</p>
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#3A4043", lineHeight: 1.6, marginBottom: 20 }}>
          Multiple rapid submission attempts were detected from this session.
          Please complete the verification below to continue.
        </p>

        <div style={{
          border: "1px solid #CDD3D6", borderRadius: 8, padding: "16px 20px",
          backgroundColor: "#F9FAFB", display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 20,
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              onClick={handleCheck}
              role="checkbox"
              aria-checked={state === "done"}
              tabIndex={0}
              onKeyDown={(e) => e.key === " " && handleCheck()}
              style={{
                width: 24, height: 24, borderRadius: 4, border: "2px solid",
                borderColor: state === "done" ? "#008A07" : "#CDD3D6",
                backgroundColor: state === "done" ? "#008A07" : "#ffffff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: state === "idle" ? "pointer" : "default",
                transition: "all 0.2s ease", flexShrink: 0,
              }}
            >
              {state === "loading" && (
                <Loader2 size={14} color="#002664" style={{ animation: "spin 1s linear infinite" }} />
              )}
              {state === "done" && <Check size={14} color="#ffffff" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: 14, color: "#22272B", fontWeight: state === "done" ? 600 : 400 }}>
              {state === "idle" ? "I'm not a robot" : state === "loading" ? "Verifying…" : "Verified ✓"}
            </span>
          </div>
          <div style={{ textAlign: "center", lineHeight: 1.3 }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>🛡️</div>
            <div style={{ fontSize: 8, color: "#9BA1A6", fontWeight: 600 }}>NSWHP<br />SECURITY</div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          style={{
            width: "100%", padding: "10px 0",
            backgroundColor: "#ffffff", color: "#002664",
            border: "1px solid #CDD3D6", borderRadius: 6,
            cursor: "pointer", fontSize: 13, fontWeight: 600,
            fontFamily: "'Public Sans', sans-serif",
          }}
        >
          Cancel
        </button>
        <p style={{ fontSize: 10, color: "#9BA1A6", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
          This challenge appears when unusual activity is detected.
          Your session has been logged per NSWHP security policy (US-SR-10).
        </p>
      </div>
    </div>
  );
}

// US-SR-10: Sanitisation warning popup
function SanitisationWarning({ onContinue, onCancel }: { onContinue: () => void; onCancel: () => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.50)",
      zIndex: 2100, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, fontFamily: "'Public Sans', sans-serif",
    }}>
      <div style={{
        backgroundColor: "#ffffff", borderRadius: 12, padding: "28px 32px",
        maxWidth: 400, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, backgroundColor: "#FEF2F2",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <AlertTriangle size={22} color="#D7153A" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#22272B", marginBottom: 1 }}>Input Sanitisation Applied</p>
            <p style={{ fontSize: 11, color: "#6D7579" }}>US-SR-10 · Potentially harmful content removed</p>
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#3A4043", lineHeight: 1.6, marginBottom: 16 }}>
          One or more of your submitted fields contained potentially harmful content (HTML, script tags, or SQL keywords).
          The content has been automatically sanitised and the event has been logged in the audit trail.
        </p>

        <div style={{
          backgroundColor: "#FFF8F0", border: "1px solid #F5C97A",
          borderRadius: 8, padding: "10px 14px", marginBottom: 20,
          display: "flex", gap: 8, alignItems: "flex-start",
        }}>
          <Info size={14} color="#8C5E00" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: "#5C3D00", lineHeight: 1.5, margin: 0 }}>
            Your registration will continue with the sanitised data. If you believe this was a mistake, please review your entries before proceeding.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "10px 0",
              backgroundColor: "#ffffff", color: "#002664",
              border: "1.5px solid #002664", borderRadius: 6,
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              fontFamily: "'Public Sans', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#002664"; e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#002664"; }}
          >
            Review entries
          </button>
          <button
            onClick={onContinue}
            style={{
              flex: 1, padding: "10px 0",
              backgroundColor: "#D7153A", color: "#ffffff",
              border: "none", borderRadius: 6,
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              fontFamily: "'Public Sans', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A3102B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D7153A")}
          >
            Proceed anyway
          </button>
        </div>
      </div>
    </div>
  );
}

export function SecurityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = (location.state as Record<string, string | null | boolean> | null) ?? {};

  // Step 4 defaults — checkboxes left unchecked per spec
  const [password, setPassword] = useState((incoming.password as string | undefined) ?? "Pathworks2025!");
  const [confirmPassword, setConfirmPassword] = useState((incoming.confirmPassword as string | undefined) ?? "Pathworks2025!");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitTimes, setSubmitTimes] = useState<number[]>([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showSanitiseWarning, setShowSanitiseWarning] = useState(false);
  const [pendingNavigate, setPendingNavigate] = useState(false);

  const pwAllRulesPass = passwordValid(password);
  const confirmMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  const showPwError = !!(submitAttempted && !pwAllRulesPass);
  const showMismatchError = confirmMismatch || !!(submitAttempted && password !== confirmPassword);

  const canProceed =
    pwAllRulesPass &&
    password === confirmPassword &&
    agreeTerms &&
    agreePrivacy;

  const doNavigate = () => {
    const email = (incoming.email as string | undefined) ?? "";
    const firstName = (incoming.firstName as string | undefined) ?? "";
    navigate("/register/verify-email", {
      state: { email, firstName },
    });
  };

  const handleSubmit = () => {
    if (!canProceed) { setSubmitAttempted(true); return; }

    // Check sanitisation of all fields (US-SR-10) — fires only at final submit
    const fieldsToCheck = [
      incoming.firstName as string ?? "",
      incoming.lastName as string ?? "",
      incoming.email as string ?? "",
      incoming.mobile as string ?? "",
      incoming.role as string ?? "",
      incoming.facility as string ?? "",
      incoming.department as string ?? "",
      incoming.staffId as string ?? "",
      incoming.ahpra as string ?? "",
      incoming.mpn as string ?? "",
      incoming.practiceName as string ?? "",
      incoming.suburb as string ?? "",
      incoming.postcode as string ?? "",
    ];

    let anySanitised = false;
    fieldsToCheck.forEach((f) => {
      const { wasDirty } = sanitiseInput(f);
      if (wasDirty) anySanitised = true;
    });

    if (anySanitised) {
      setShowSanitiseWarning(true);
      setPendingNavigate(true);
      return;
    }

    // Rate limit check (US-SR-10)
    const now = Date.now();
    const recent = submitTimes.filter((t) => now - t < 15_000);
    const updated = [...recent, now];
    setSubmitTimes(updated);
    if (updated.length >= 3 && !captchaVerified) {
      setShowCaptcha(true);
      return;
    }

    doNavigate();
  };

  const handleCaptchaVerified = () => {
    setShowCaptcha(false);
    setCaptchaVerified(true);
    doNavigate();
  };

  const handleCaptchaDismiss = () => {
    setShowCaptcha(false);
  };

  const handleSanitiseContinue = () => {
    setShowSanitiseWarning(false);
    setPendingNavigate(false);
    // Now check rate limit
    const now = Date.now();
    const recent = submitTimes.filter((t) => now - t < 15_000);
    const updated = [...recent, now];
    setSubmitTimes(updated);
    if (updated.length >= 3 && !captchaVerified) {
      setShowCaptcha(true);
      return;
    }
    doNavigate();
  };

  const handleSanitiseCancel = () => {
    setShowSanitiseWarning(false);
    setPendingNavigate(false);
  };

  const handleBack = () =>
    navigate("/register/practice", { state: incoming });

  const checkboxItems = [
    {
      key: "agreeTerms",
      checked: agreeTerms,
      onToggle: () => setAgreeTerms((v) => !v),
      errorMsg: "You must accept the Terms of Use to proceed.",
      label: (
        <>
          I accept the{" "}
          <a href="#" style={{ color: "#002664", textDecoration: "underline" }}>
            Terms of Use
          </a>
        </>
      ),
    },
    {
      key: "agreePrivacy",
      checked: agreePrivacy,
      onToggle: () => setAgreePrivacy((v) => !v),
      errorMsg: "You must accept the Privacy Notice to proceed.",
      label: (
        <>
          I accept the{" "}
          <a href="#" style={{ color: "#002664", textDecoration: "underline" }}>
            Privacy Notice
          </a>{" "}
          and consent to the collection of my personal information.
        </>
      ),
    },
  ];

  return (
    <Layout>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {showCaptcha && (
        <MockCaptcha onVerified={handleCaptchaVerified} onDismiss={handleCaptchaDismiss} />
      )}
      {showSanitiseWarning && (
        <SanitisationWarning onContinue={handleSanitiseContinue} onCancel={handleSanitiseCancel} />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <StepIndicator current={4} />

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
            Security
          </h3>
          <p style={{ fontSize: 13, color: "#6D7579" }}>Step 4 of 4 — Create a password &amp; accept terms</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <div>
            <FieldLabel htmlFor="password" required>Create password</FieldLabel>
            <PasswordInput
              id="password"
              placeholder="Enter a secure password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              hasError={showPwError}
            />
            <PasswordStrength password={password} />
            {showPwError && (
              <InlineError message="Password must satisfy all 5 requirements above before you can continue." />
            )}
          </div>

          <div>
            <FieldLabel htmlFor="confirmPassword" required>Confirm password</FieldLabel>
            <PasswordInput
              id="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
              hasError={showMismatchError}
            />
            {showMismatchError && <InlineError message="Passwords do not match." />}
          </div>

          <div style={{ borderTop: "1px solid #E4E7EB", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {checkboxItems.map((item) => {
              const showError = submitAttempted && !item.checked;
              return (
                <div key={item.key}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                    <div
                      style={{
                        width: 18, height: 18, minWidth: 18, borderRadius: 4,
                        border: `2px solid ${showError ? "#D7153A" : item.checked ? "#002664" : "#CDD3D6"}`,
                        backgroundColor: item.checked ? "#002664" : "#ffffff",
                        boxShadow: showError ? "0 0 0 3px rgba(215,21,58,0.10)" : "none",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 1, transition: "all 0.15s ease", cursor: "pointer",
                      }}
                      onClick={item.onToggle}
                    >
                      {item.checked && <Check size={11} color="#ffffff" strokeWidth={3} />}
                    </div>
                    <span style={{ fontSize: 13, color: "#22272B", lineHeight: 1.5 }}>
                      {item.label}
                    </span>
                  </label>
                  {showError && <InlineError message={item.errorMsg} />}
                </div>
              );
            })}
          </div>

        </div>

        <div style={{ borderTop: "1px solid #E4E7EB", marginTop: 24, paddingTop: 16, display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={handleBack}
            style={BACK_BTN}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#002664"; e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#002664"; }}
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            style={NEXT_BTN}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
          >
            Submit Registration
            <ShieldCheck size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </Layout>
  );
}