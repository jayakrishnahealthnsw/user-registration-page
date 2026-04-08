import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Loader2 } from "lucide-react";
import { Layout } from "../components/shared/Layout";
import { IDP_TOKEN_CLAIMS } from "../components/shared/constants";
import nswWaratahSvg from "../../assets/nsw-waratah.svg";

function NswGovIcon({ size = 28 }: { size?: number }) {
  const height = Math.round(size * 280 / 259);
  return (
    <img src={nswWaratahSvg} alt="NSW Government" width={size} height={height} style={{ flexShrink: 0 }} />
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg">
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

export function SelectProviderPage() {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState<IdpOption>(null);

  const handleProviderLogin = (provider: IdpOption) => {
    if (!provider) return;
    setRedirecting(provider);
    const claims = IDP_TOKEN_CLAIMS[provider] ?? {};
    setTimeout(() => {
      navigate("/register/your-details", {
        state: { idp: provider, email: claims.email, firstName: claims.firstName, lastName: claims.lastName },
      });
    }, 400);
  };

  const handleSocialLogin = (provider: "google" | "apple") => {
    setRedirecting(provider);
    setTimeout(() => {
      setRedirecting(null);
      const claims = IDP_TOKEN_CLAIMS[provider];
      navigate("/register/your-details", {
        state: {
          idp: provider,
          email: claims.email,
          firstName: claims.firstName,
          lastName: claims.lastName,
        },
      });
    }, 2800);
  };

  const btnBase: React.CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 18px",
    border: "1.5px solid #E4E7EB",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: "#22272B",
    textAlign: "left",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };

  return (
    <Layout>
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
            <Loader2 size={18} style={{ animation: "spin 0.75s linear infinite", flexShrink: 0, color: "#22272B" }} />
            <span style={{ fontSize: 15, color: "#22272B", fontWeight: 400 }}>
              Redirecting to {REDIRECT_LABEL[redirecting]}…
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-0">
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <h3 style={{ color: "#22272B", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
            How would you like to continue?
          </h3>
          <p style={{ fontSize: 13, color: "#6D7579", lineHeight: 1.5 }}>
            Choose your preferred sign-in method to create your Portal account.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {/* NSW Health */}
          <button
            onClick={() => handleProviderLogin("nsw")}
            style={btnBase}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#002664"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,38,100,0.10)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E4E7EB"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <NswGovIcon size={28} />
            Sign in with @health.nsw.gov.au
          </button>
          <button
            onClick={() => handleProviderLogin("google")}
            style={btnBase}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4285F4"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(66,133,244,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E4E7EB"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <GoogleIcon />
            Sign in with Google
          </button>
          <button
            onClick={() => handleProviderLogin("apple")}
            style={btnBase}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#22272B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,39,43,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E4E7EB"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <AppleIcon />
            Sign in with Apple
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, backgroundColor: "#E4E7EB" }} />
          <span style={{ fontSize: 11, color: "#9BA1A6", fontWeight: 600 }}>OR</span>
          <div style={{ flex: 1, height: 1, backgroundColor: "#E4E7EB" }} />
        </div>

        <p style={{
          fontSize: 11, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.06em", color: "#6D7579", marginBottom: 8,
        }}>
          New User Registration
        </p>
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => navigate("/register/your-details", { state: { idp: "email" } })}
            disabled={!!redirecting}
            style={{ ...btnBase, opacity: redirecting ? 0.6 : 1, cursor: redirecting ? "not-allowed" : "pointer" }}
            onMouseEnter={(e) => { if (!redirecting) { e.currentTarget.style.borderColor = "#002664"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,38,100,0.1)"; }}}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E4E7EB"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <Mail size={18} color="#22272B" strokeWidth={1.8} style={{ flexShrink: 0 }} />
            Create with Email Address
          </button>
        </div>

        <div style={{ borderTop: "1px solid #E4E7EB", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "#ffffff",
              border: "1.5px solid #002664",
              color: "#002664",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Public Sans', sans-serif",
              padding: "8px 20px",
              borderRadius: 6,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#002664"; e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.color = "#002664"; }}
          >
            Back
          </button>
        </div>
      </div>
    </Layout>
  );
}