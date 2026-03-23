import { ReactNode, useState } from "react";
import { MapPin, ClipboardCheck, CreditCard, Phone } from "lucide-react";
import { ChatbotBubble } from "../ChatbotBubble";
import nswHealthPathologyLogo from "@/assets/9256e51b07053a866d2c019dc2f1084c39b7a895.png";

// NSW Health Pathology logo
function NSWHealthPathologyLogo({ height = 48 }: { height?: number }) {
  return (
    <img
      src={nswHealthPathologyLogo}
      alt="NSW Health Pathology"
      height={height}
      style={{ display: "block", height }}
    />
  );
}

// PathWorks logo (inline SVG)
function PathWorksLogo({ width = 260 }: { width?: number }) {
  return (
    <svg width={width} viewBox="0 0 2749 662" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`.pw-a{fill:none}.pw-b{fill:#002664}.pw-c{fill:#fff}.pw-d{fill:#8ce0ff}.pw-e{fill:#cdd3d6}.pw-f{fill:#d7153a}`}</style>
      </defs>
      <rect className="pw-a" width="2749" height="662" />
      <g>
        <path className="pw-b" d="M686.11,177.36h114.64c22.84,0,43.28,3.98,61.31,11.95,18.02,7.98,32.17,19.66,42.45,35.02,10.27,15.38,15.4,33.76,15.4,55.16s-4.55,38.01-13.68,52.8c-9.13,14.79-22.05,26.07-38.79,33.83-16.74,7.76-36.24,11.64-58.5,11.64h-59.48v111.19h-63.36V177.36Zm121.11,151.7c10.34,0,19.61-2.29,27.79-6.89,8.19-4.6,14.58-10.92,19.18-18.97,4.6-8.04,6.9-17.02,6.9-26.93s-2.41-18.93-7.22-26.62c-4.82-7.68-11.39-13.61-19.72-17.78-8.34-4.16-17.6-6.25-27.79-6.25h-57.54v103.43h58.4Z" />
        <path className="pw-b" d="M960.75,485.18c-11.42-5.38-20.4-13.22-26.93-23.49-6.54-10.27-9.81-22.44-9.81-36.53,0-24.71,9.26-43.35,27.79-55.92,18.54-12.57,47.19-19.07,85.99-19.5l28.01-.43v-13.37c0-21.12-12.07-31.67-36.21-31.67-10.2,0-19.32,2.3-27.36,6.9-8.05,4.6-13.51,11.71-16.38,21.33h-52.36c1.14-23.27,10.59-40.87,28.33-52.79,17.74-11.93,41.12-17.89,70.14-17.89,32.89,0,56.81,6.04,71.76,18.1,14.94,12.07,22.41,29.53,22.41,52.37v156.66h-52.58l-5.17-38.36c-7.33,15.52-16.59,26.51-27.8,32.98-11.2,6.46-25,9.7-41.37,9.7-14.23,0-27.05-2.7-38.47-8.08Zm33.41-42.24c6.96,5.97,15.76,8.94,26.4,8.94,7.46,0,14.68-1.76,21.66-5.27,6.96-3.53,12.64-8.19,17.02-14.01,4.38-5.83,6.57-11.82,6.57-18v-32.97l-22.63,.43c-17.52,.29-31.82,3.34-42.88,9.15-11.07,5.81-16.59,15.06-16.59,27.69,0,10.06,3.48,18.06,10.46,24.02Z" />
        <path className="pw-b" d="M1246.16,309.88l.43,118.73c0,5.32,.67,9.31,2.05,11.96,1.36,2.66,3.4,4.41,6.14,5.27,2.73,.86,6.61,1.29,11.64,1.29h29.95v38.79c-8.32,3.59-21.33,5.38-39,5.38-18.96,0-33.86-2.43-44.71-7.32-10.86-4.89-18.43-11.71-22.74-20.47-4.31-8.77-6.47-19.53-6.47-32.32v-121.32h-36.19v-43.74h38.14l15.94-67.24h44.83v67.02h49.56v43.97h-49.56Z" />
        <path className="pw-b" d="M1323.53,168.73h62.48v129.51c6.9-9.77,15.33-17.78,25.33-24.02,9.98-6.26,22.87-9.37,38.68-9.37,14.36,0,27.44,2.8,39.21,8.4,11.78,5.6,21.16,13.75,28.12,24.45,6.96,10.71,10.46,23.32,10.46,37.82v153.43h-63.15v-144.17c0-9.76-3.55-17.41-10.67-22.95-7.11-5.53-15.97-8.29-26.61-8.29-7.19,0-13.9,1.26-20.15,3.77-6.25,2.52-11.28,6.29-15.08,11.31-3.8,5.03-5.72,11.07-5.72,18.11v142.22h-62.91V168.73Z" />
        <path className="pw-b" d="M1841,488.95h-36.85l-68.31-241.56-69.39,241.56h-35.77l-89.86-311.6h40.3l68.95,248.03,70.25-248.03h31.24l70.04,248.03,70.24-248.03h40.09l-90.94,311.6Z" />
        <path className="pw-b" d="M1961.25,479.9c-15.38-8.9-27.23-21.94-35.56-39.11-8.32-17.16-12.49-37.95-12.49-62.38s3.98-43.89,11.96-61.41c7.97-17.52,19.64-31.1,35.01-40.73,15.38-9.63,33.84-14.44,55.39-14.44s38.43,4.52,53.65,13.58c15.23,9.04,26.97,22.34,35.24,39.86,8.26,17.53,12.38,38.57,12.38,63.14,0,22.84-3.87,42.93-11.63,60.23-7.76,17.32-19.26,30.76-34.48,40.31-15.23,9.55-33.7,14.33-55.39,14.33s-38.71-4.46-54.08-13.37Zm7.11-41.37c10.35,15.51,26.08,23.27,47.19,23.27,19.82,0,35.09-7.44,45.79-22.31,10.7-14.87,16.05-35.52,16.05-61.95s-5.1-45.86-15.3-61.3c-10.2-15.44-25.71-23.17-46.54-23.17s-35.6,7.41-46.44,22.2c-10.84,14.8-16.27,35.55-16.27,62.27,0,25.15,5.17,45.47,15.52,60.99Z" />
        <path className="pw-b" d="M2146.13,266.14h37.93v42.88c5.46-15.52,14.12-27.26,25.97-35.23,11.85-7.98,25.17-11.96,39.97-11.96,7.76,0,13.43,.93,17.02,2.8v38.57c-2.01-.86-4.63-1.5-7.87-1.93-3.23-.43-6.21-.65-8.94-.65-1.58-.13-3.95-.21-7.11-.21-16.95,0-30.74,4.2-41.38,12.6-10.62,8.4-15.94,20.87-15.94,37.39v138.56h-39.65v-222.81Z" />
        <path className="pw-b" d="M2450.83,488.95l-69.81-111.84-43.97,45.47v66.37h-39.65V168.73h39.65v208.81l104.72-111.4h45.69l-80.38,84.9l85.99,137.91h-42.24Z" />
        <path className="pw-b" d="M2543.38,485.83c-13.14-4.95-24.07-12.6-32.76-22.95-8.69-10.34-14.04-23.27-16.05-38.78h36.21c2.72,12.64,9.15,22.38,19.28,29.2,10.13,6.82,22.44,10.24,36.96,10.24,15.52,0,27.76-2.87,36.75-8.62,8.98-5.74,13.46-14.29,13.46-25.64,0-8.19-2.41-14.73-7.22-19.61-4.82-4.89-12.32-8.55-22.52-10.99l-46.11-11.43c-19.11-4.59-33.76-11.63-43.97-21.12-10.2-9.47-15.3-22.2-15.3-38.14,0-13.07,3.19-24.6,9.58-34.59,6.4-9.98,15.99-17.73,28.78-23.27,12.78-5.53,28.3-8.29,46.54-8.29,24.56,0,44.18,5.53,58.83,16.59,14.65,11.07,22.33,26.86,23.05,47.4h-35.33c-1.59-10.78-6.4-19.25-14.44-25.43-8.05-6.18-18.89-9.26-32.55-9.26-14.79,0-26.5,2.94-35.12,8.83-8.62,5.89-12.93,14.58-12.93,26.08,0,7.61,3.02,13.72,9.05,18.31,6.04,4.6,15.51,8.48,28.44,11.64l44.82,11.21c18.68,4.89,32.04,12.86,40.09,23.91,8.05,11.07,12.07,23.06,12.07,36,0,13.64-3.38,25.43-10.13,35.33-6.75,9.92-16.56,17.53-29.42,22.85-12.86,5.31-28.27,7.97-46.22,7.97-16.1,0-30.71-2.48-43.86-7.44Z" />
      </g>
      <circle className="pw-b" cx="331" cy="331" r="255" />
      <g>
        <circle className="pw-c" cx="403.48" cy="166.58" r="20.62" />
        <circle className="pw-f" cx="331" cy="166.58" r="30.92" />
        <circle className="pw-d" cx="258.52" cy="166.58" r="20.62" />
        <circle className="pw-f" cx="403.48" cy="494.55" r="20.62" />
        <circle className="pw-d" cx="331" cy="494.55" r="30.92" />
        <circle className="pw-c" cx="258.52" cy="494.55" r="20.62" />
        <circle className="pw-f" cx="403.65" cy="249.08" r="46.39" />
        <circle className="pw-f" cx="170.23" cy="249.08" r="20.62" />
        <circle className="pw-c" cx="242.88" cy="249.08" r="30.92" />
        <circle className="pw-d" cx="315.54" cy="249.08" r="20.62" />
        <circle className="pw-f" cx="491.77" cy="249.08" r="20.62" />
        <circle className="pw-e" cx="172.49" cy="330.78" r="43.03" />
        <circle className="pw-c" cx="269.02" cy="333.82" r="20.62" />
        <circle className="pw-f" cx="417.24" cy="333.82" r="20.62" />
        <circle className="pw-c" cx="501.66" cy="334.05" r="30.92" />
        <circle className="pw-d" cx="343.13" cy="333.82" r="20.62" />
        <circle className="pw-e" cx="292.52" cy="412.52" r="30.7" />
        <circle className="pw-f" cx="369.48" cy="412.52" r="30.7" />
        <circle className="pw-d" cx="169.32" cy="412.52" r="20.47" />
        <circle className="pw-c" cx="225.81" cy="412.52" r="20.47" />
        <circle className="pw-d" cx="436.19" cy="412.52" r="20.47" />
        <circle className="pw-f" cx="492.68" cy="412.52" r="20.47" />
      </g>
    </svg>
  );
}

export function Layout({ children, showLogo = false }: { children: ReactNode; showLogo?: boolean }) {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <>
      <style>{`
        @media (min-width: 641px) {
          .register-card { padding: 24px 40px !important; }
        }
        @media (max-width: 640px) {
          .register-card { padding: 24px 20px !important; }
        }
        .chatbot-button { transition: all 0.3s ease; }
        .chatbot-button:hover {
          transform: scale(1.08);
          filter: drop-shadow(0 6px 12px rgba(215, 21, 58, 0.45));
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div
        className="min-h-screen w-full flex flex-col"
        style={{ backgroundColor: "#ffffff", fontFamily: "'Public Sans', sans-serif" }}
      >
        {/* NSW Government Top Banner */}
        <div
          className="text-xs"
          style={{ backgroundColor: "#002664", color: "#ffffff", padding: "10px 0" }}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between">
            <span style={{ fontWeight: 600 }}>A NSW Government website</span>
            <div className="hidden md:flex items-center gap-5">
              {[
                {
                  icon: <MapPin size={13} strokeWidth={2} style={{ flexShrink: 0 }} />,
                  label: "Find a collection centre",
                },
                {
                  icon: <ClipboardCheck size={13} strokeWidth={2} style={{ flexShrink: 0 }} />,
                  label: "We accept all referrals",
                },
                {
                  icon: <CreditCard size={13} strokeWidth={2} style={{ flexShrink: 0 }} />,
                  label: "Payments",
                },
                {
                  icon: <Phone size={13} strokeWidth={2} style={{ flexShrink: 0 }} />,
                  label: "Contact us",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  {item.icon} {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Header */}
        <header
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #E4E7EB",
            padding: "14px 0",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center">
            <div className="flex-shrink-0">
              <NSWHealthPathologyLogo />
            </div>
            <div className="flex-1 flex justify-center px-3">
              <h3
                style={{
                  color: "#22272B",
                  lineHeight: 1.3,
                  textAlign: "center",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                Secure access when and where you need it
              </h3>
            </div>
            <div className="flex-shrink-0 invisible" aria-hidden="true">
              <NSWHealthPathologyLogo />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-start justify-center px-4 py-6">
          <div className="w-full max-w-lg">
            {showLogo && (
              <div className="flex justify-center mb-3">
                <PathWorksLogo width={160} />
              </div>
            )}

            <div
              className="register-card"
              style={{
                backgroundColor: "#ffffff",
                border: "none",
                borderRadius: 12,
                padding: "32px 40px",
                boxShadow: "none",
              }}
            >
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#22272B",
            color: "#ffffff",
            padding: "12px 0 10px",
            marginTop: "auto",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex flex-wrap justify-center gap-4 mb-2 text-xs">
              {["About", "Privacy", "Accessibility", "Contact"].map((item, idx, arr) => (
                <div key={item} style={{ display: "contents" }}>
                  <a
                    href="#"
                    style={{ color: "#B8C6F0", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    {item}
                  </a>
                  {idx < arr.length - 1 && (
                    <span style={{ color: "#3A4043" }}>|</span>
                  )}
                </div>
              ))}
            </div>
            <div
              className="text-xs"
              style={{
                borderTop: "1px solid #3A4043",
                paddingTop: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                color: "#9BA1A6",
              }}
            >
              <span>© 2026 NSW Health Pathology</span>
              <span style={{ color: "#3A4043" }}>•</span>
              <span>Build 1.0.31248</span>
            </div>
          </div>
        </footer>

        {/* Chatbot FAB */}
        {!chatbotOpen && (
          <button
            className="chatbot-button"
            onClick={() => setChatbotOpen(true)}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              width: 64,
              height: 64,
              borderRadius: 0,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "none",
              zIndex: 1000,
              padding: 0,
            }}
            aria-label="Open NSW Health Pathology Chatbot"
          >
            <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 8 C74 8 92 22 92 40 C92 53 84 64 70 69 L76 90 L54 72 C52.7 72.1 51.4 72.2 50 72.2 C26 72.2 8 58 8 40 C8 22 26 8 50 8 Z" fill="#8B1A0E"/>
              <circle cx="34" cy="40" r="5.5" fill="white"/>
              <circle cx="50" cy="40" r="5.5" fill="white"/>
              <circle cx="66" cy="40" r="5.5" fill="white"/>
            </svg>
          </button>
        )}

        {/* Chatbot panel */}
        <ChatbotBubble isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      </div>
    </>
  );
}
