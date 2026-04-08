import React from "react";
import { useLocation } from "react-router";
import { Check, Mail, ShieldCheck, Clock } from "lucide-react";
import { Layout } from "../components/shared/Layout";

export function SuccessPage() {
  const location = useLocation();
  const state = (location.state as { email?: string; firstName?: string } | null) ?? {};
  const email = state.email ?? "jane.smith@health.nsw.gov.au";
  const firstName = state.firstName ?? "Jane";

  const handleSignIn = () => {
    window.location.href = "/dashboard";
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 20, paddingTop: 8, paddingBottom: 8 }}>

        {/* Success icon */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          backgroundColor: "#E5F6E6",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "3px solid #008A07",
        }}>
          <Check size={36} color="#008A07" strokeWidth={2.5} />
        </div>

        {/* Heading */}
        <div>
          <h3 style={{ color: "#22272B", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            Registration complete!
          </h3>
          <p style={{ fontSize: 14, color: "#6D7579", lineHeight: 1.6, maxWidth: 380, margin: "0 auto" }}>
            Thank you, <strong style={{ color: "#22272B" }}>{firstName}</strong>.
            Your Portal account has been created and your email address has been verified.
          </p>
        </div>

        {/* What happens next */}
        <div style={{
          backgroundColor: "#F2F4F8", borderRadius: 10, padding: "16px 20px",
          width: "100%", textAlign: "left",
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", color: "#6D7579", marginBottom: 14,
          }}>
            What happens next
          </p>

          {[
            {
              icon: <Mail size={16} color="#002664" strokeWidth={2} />,
              title: "Confirmation email sent",
              desc: `A confirmation has been sent to ${email}. Keep this for your records.`,
            },
            {
              icon: <ShieldCheck size={16} color="#002664" strokeWidth={2} />,
              title: "Identity verification",
              desc: "An NSWHP administrator will verify your practitioner credentials. This typically takes 1–2 business days.",
            },
            {
              icon: <Clock size={16} color="#002664" strokeWidth={2} />,
              title: "Account activation",
              desc: "Once verified, you will receive an email with instructions to complete your account setup and sign in.",
            },
          ].map((item, idx, arr) => (
            <div
              key={item.title}
              style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                paddingBottom: idx < arr.length - 1 ? 14 : 0,
                marginBottom: idx < arr.length - 1 ? 14 : 0,
                borderBottom: idx < arr.length - 1 ? "1px solid #E4E7EB" : "none",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, backgroundColor: "#E8EDF5",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#22272B", marginBottom: 2 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 12, color: "#6D7579", lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Registration summary */}
        <div style={{
          backgroundColor: "#ffffff", border: "1px solid #E4E7EB",
          borderRadius: 10, padding: "14px 18px", width: "100%", textAlign: "left",
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", color: "#9BA1A6", marginBottom: 10,
          }}>
            Registration summary
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Name", value: firstName },
              { label: "Email", value: email },
              { label: "Status", value: "Pending — Email Verified" },
              { label: "Submitted", value: new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "long", year: "numeric" }) },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "5px 0", borderBottom: "1px solid #F2F4F8",
              }}>
                <span style={{ fontSize: 12, color: "#6D7579" }}>{row.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#22272B", textAlign: "right", maxWidth: "60%" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleSignIn}
          style={{
            width: "100%", padding: "13px 24px",
            backgroundColor: "#002664", color: "#ffffff",
            border: "none", borderRadius: 6,
            cursor: "pointer", fontSize: 15, fontWeight: 700,
            fontFamily: "'Public Sans', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, transition: "background-color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
        >
          Sign in to Portal
        </button>

        <p style={{ fontSize: 12, color: "#9BA1A6", lineHeight: 1.5, maxWidth: 360 }}>
          Your account will be activated once identity verification is complete.
          Until then, sign-in attempts will display a "Pending Approval" message.
        </p>
      </div>
    </Layout>
  );
}