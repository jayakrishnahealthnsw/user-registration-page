import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Layout } from "../components/shared/Layout";
import { Eye, EyeOff, Mail, Loader2 } from "lucide-react";

import { IDP_TOKEN_CLAIMS } from "../components/shared/constants";
import nswWaratahSvg from "../../assets/nsw-waratah.svg";

function NswGovIcon({ size = 32 }: { size?: number }) {
  const height = Math.round(size * 280 / 259);
  return (
    <img
      src={nswWaratahSvg}
      alt="NSW Government"
      width={size}
      height={height}
      style={{ flexShrink: 0 }}
    />
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

type IdpOption = "nsw" | "google" | "apple" | null;

const REDIRECT_LABEL: Record<string, string> = {
  nsw: "@health.nsw.gov.au",
  google: "Google",
  apple: "Apple",
};

export function LandingPage() {
  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("sarah.smith123@health.nsw.gov.au");
  const [password, setPassword] = useState("3Htp78123#beri");
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [redirecting, setRedirecting] = useState<IdpOption>(null);

  // Clear spinner if browser restores this page from bfcache (Back button)
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setRedirecting(null);
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "#ffffff",
    border: "1px solid #CDD3D6",
    borderRadius: 4,
    fontSize: 15,
    color: "#22272B",
    fontFamily: "'Public Sans', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };

  const optionBtn: React.CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 18px",
    border: "1px solid #CDD3D6",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 15,
    fontWeight: 500,
    color: "#22272B",
    textAlign: "left",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };

  const handleLogin = () => {
    setLoginAttempted(true);
    if (!email || !password) return;
    window.location.href = "/dashboard";
  };

  const handleProviderLogin = (provider: IdpOption) => {
    if (!provider) return;
    setRedirecting(provider);
    setTimeout(() => {
      // Replace the spinner history entry with a clean /login so Back works correctly
      window.history.replaceState(null, '', '/login');
      window.location.assign("/dashboard");
    }, 1800);
  };

  const emailError = loginAttempted && !email;
  const passwordError = loginAttempted && !password;

  return (
    <Layout showLogo={false}>
      {/* Full-page redirect overlay */}
      {redirecting && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#ECEDF0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          fontFamily: "'Public Sans', sans-serif",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Loader2
              size={18}
              style={{ animation: "spin 0.75s linear infinite", flexShrink: 0, color: "#22272B" }}
            />
            <span style={{ fontSize: 15, color: "#22272B", fontWeight: 400 }}>
              Redirecting to {REDIRECT_LABEL[redirecting]}…
            </span>
          </div>
        </div>
      )}

      <div style={{ fontFamily: "'Public Sans', sans-serif" }}>

        {/* Heading */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 28, fontWeight: 400, color: "#002664", lineHeight: 1.2 }}>
            Welcome to the
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#22272B", lineHeight: 1.2 }}>
            NSW Health Pathology Portal
          </div>
        </div>

        {/* Sign-in option buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>

          {/* NSW Health */}
          <button
            style={optionBtn}
            onClick={() => handleProviderLogin("nsw")}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#002664"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,38,100,0.10)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#CDD3D6"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <NswGovIcon size={28} />
            Sign in with @health.nsw.gov.au
          </button>

          {/* Google */}
          <button
            style={optionBtn}
            onClick={() => handleProviderLogin("google")}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4285F4"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(66,133,244,0.10)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#CDD3D6"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <GoogleIcon />
            Sign in with Google
          </button>

          {/* Apple */}
          <button
            style={optionBtn}
            onClick={() => handleProviderLogin("apple")}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#CDD3D6"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <AppleIcon />
            Sign in with Apple
          </button>

          {/* Email */}
          <button
            style={{
              ...optionBtn,
              borderColor: showEmailForm ? "#002664" : "#CDD3D6",
              boxShadow: showEmailForm ? "0 0 0 3px rgba(0,38,100,0.10)" : "none",
            }}
            onClick={() => setShowEmailForm((v) => !v)}
            onMouseEnter={(e) => { if (!showEmailForm) { e.currentTarget.style.borderColor = "#002664"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,38,100,0.10)"; }}}
            onMouseLeave={(e) => { if (!showEmailForm) { e.currentTarget.style.borderColor = "#CDD3D6"; e.currentTarget.style.boxShadow = "none"; }}}
          >
            <Mail size={20} color="#22272B" strokeWidth={1.8} style={{ flexShrink: 0 }} />
            Sign in with Email
          </button>
        </div>

        {/* Inline email/password form */}
        {showEmailForm && (
          <div style={{ border: "1px solid #CDD3D6", borderRadius: 8, padding: "20px 18px", marginBottom: 20 }}>
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="landing-email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#22272B", marginBottom: 5 }}>
                Email
              </label>
              <input
                id="landing-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ ...inputStyle, borderColor: emailError ? "#B81237" : "#CDD3D6" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#002664"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,38,100,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = emailError ? "#B81237" : "#CDD3D6"; e.currentTarget.style.boxShadow = "none"; }}
              />
              {emailError && <p style={{ fontSize: 12, color: "#B81237", margin: "4px 0 0", fontWeight: 500 }}>Please enter your email.</p>}
            </div>

            <div style={{ marginBottom: 18 }}>
              <label htmlFor="landing-password" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#22272B", marginBottom: 5 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="landing-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  style={{ ...inputStyle, paddingRight: 44, borderColor: passwordError ? "#B81237" : "#CDD3D6" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#002664"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,38,100,0.12)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = passwordError ? "#B81237" : "#CDD3D6"; e.currentTarget.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#6D7579", display: "flex", alignItems: "center" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {passwordError && <p style={{ fontSize: 12, color: "#B81237", margin: "4px 0 0", fontWeight: 500 }}>Please enter your password.</p>}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <button
                onClick={handleLogin}
                style={{ padding: "10px 26px", backgroundColor: "#002664", color: "#ffffff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "'Public Sans', sans-serif", transition: "background-color 0.15s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
              >
                Login
              </button>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigate("/forgot-password"); }}
                style={{ fontSize: 13, color: "#002664", textDecoration: "underline", fontFamily: "'Public Sans', sans-serif", cursor: "pointer" }}
              >
                Forgot your password?
              </a>
            </div>
          </div>
        )}

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #E4E7EB", margin: "0 0 24px 0" }} />

        {/* Register section */}
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#22272B", margin: "0 0 14px 0", lineHeight: 1.5 }}>
            If this is your first time here please register
          </p>
          <button
            onClick={() => navigate("/register")}
            style={{ padding: "10px 26px", backgroundColor: "#002664", color: "#ffffff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "'Public Sans', sans-serif", transition: "background-color 0.15s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
          >
            Register
          </button>
        </div>

      </div>
    </Layout>
  );
}

