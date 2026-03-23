import { ChevronRight, User, Stethoscope, MapPin, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { Layout } from "../components/shared/Layout";

const REGISTRATION_STEPS_INFO = [
  {
    id: 1,
    icon: User,
    title: "Your Details",
    desc: "First name, last name, work email and contact phone number.",
  },
  {
    id: 2,
    icon: Stethoscope,
    title: "Professional Info",
    desc: "Your role, primary facility, AHPRA number and staff ID.",
  },
  {
    id: 3,
    icon: MapPin,
    title: "Practice Details",
    desc: "Practice name, suburb and postcode for real-time practitioner matching.",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Security",
    desc: "Create a secure password and agree to our terms.",
  },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col gap-0">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h3
            style={{
              color: "#22272B",
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Practitioner Self-Registration
          </h3>
          <p style={{ fontSize: 14, color: "#22272B", lineHeight: 1.6, maxWidth: 380, margin: "0 auto" }}>
            Create your PathWorks account in three quick steps. This process takes
            approximately <strong>3–5 minutes</strong> to complete.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#F2F4F8",
            borderRadius: 10,
            padding: "16px 20px",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#6D7579",
              marginBottom: 12,
            }}
          >
            What you'll need to complete
          </p>
          {REGISTRATION_STEPS_INFO.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.id} style={{ display: "contents" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    paddingBottom: idx < REGISTRATION_STEPS_INFO.length - 1 ? 14 : 0,
                    marginBottom: idx < REGISTRATION_STEPS_INFO.length - 1 ? 14 : 0,
                    borderBottom:
                      idx < REGISTRATION_STEPS_INFO.length - 1
                        ? "1px solid #E4E7EB"
                        : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        backgroundColor: "#002664",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#ffffff" }}>
                        {s.id}
                      </span>
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        backgroundColor: "#E8EDF5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} color="#002664" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#22272B", marginBottom: 2 }}>
                      {s.title}
                    </p>
                    <p style={{ fontSize: 12, color: "#6D7579", lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            backgroundColor: "#FFF8F0",
            border: "1px solid #F5C97A",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 24,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <ShieldCheck size={16} color="#8C5E00" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12, color: "#5C3D00", lineHeight: 1.6, margin: 0 }}>
            By registering you agree to our{" "}
            <a
              href="#"
              style={{ color: "#002664", fontWeight: 600, textDecoration: "underline" }}
              onClick={(e) => e.stopPropagation()}
            >
              Terms of Use
            </a>{" "}
            and acknowledge our{" "}
            <a
              href="#"
              style={{ color: "#002664", fontWeight: 600, textDecoration: "underline" }}
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </a>
            . We recommend you read both before proceeding.
          </p>
        </div>

        <button
          onClick={() => navigate("/select-provider")}
          style={{
            width: "100%",
            padding: "13px 24px",
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
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
        >
          Start Registration
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>

        <div className="flex justify-center mt-5 pt-4" style={{ borderTop: "1px solid #E4E7EB" }}>
          <span style={{ fontSize: 13, color: "#6D7579" }}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#002664",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Public Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Sign in
            </button>
          </span>
        </div>
      </div>
    </Layout>
  );
}
