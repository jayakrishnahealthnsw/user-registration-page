import React, { useState, useEffect, useRef } from "react";
import { ChatbotBubble } from "./ChatbotBubble";
import { CLEAN_PW_RULES } from "./PwRules";
import { useNavigate } from "react-router";
import {
  MapPin,
  ClipboardCheck,
  CreditCard,
  Phone,
  Eye,
  EyeOff,
  ChevronRight,
  Check,
  User,
  Stethoscope,
  ShieldCheck,
  Mail,
  Lock,
  AlertTriangle,
  Loader2,
  Info,
  BadgeCheck,
  Ban,
} from "lucide-react";
import nswHealthPathologyLogo from "@/assets/9256e51b07053a866d2c019dc2f1084c39b7a895.png"; // NSWHP_logo.png

// -- NSW Health Pathology logo
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

// -- PathWorks logo (inline SVG)
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

// -- Step indicator
const STEPS = [
  { id: 1, label: "Your details", icon: User },
  { id: 2, label: "Professional", icon: Stethoscope },
  { id: 3, label: "Practice",     icon: MapPin },
  { id: 4, label: "Security",     icon: ShieldCheck },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {STEPS.map((step, idx) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} style={{ display: "contents" }}>
            <div className="flex flex-col items-center" style={{ minWidth: 72 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: done ? "#002664" : active ? "#002664" : "#ffffff",
                  border: done || active ? "2px solid #002664" : "2px solid #CDD3D6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                }}
              >
                {done ? (
                  <Check size={16} color="#ffffff" strokeWidth={2.5} />
                ) : (
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: active ? "#ffffff" : "#6D7579",
                    }}
                  >
                    {step.id}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 11,
                  marginTop: 4,
                  fontWeight: active || done ? 600 : 400,
                  color: active || done ? "#002664" : "#6D7579",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: done ? "#002664" : "#E4E7EB",
                  marginBottom: 18,
                  transition: "background-color 0.25s ease",
                  minWidth: 24,
                  maxWidth: 48,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// -- Reusable field components

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        color: "#22272B",
        marginBottom: 5,
      }}
    >
      {children}
      {required && <span style={{ color: "#D7153A", marginLeft: 3 }}>*</span>}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 14,
  color: "#22272B",
  backgroundColor: "#ffffff",
  border: "1px solid #CDD3D6",
  borderRadius: 6,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  fontFamily: "'Public Sans', sans-serif",
};

function TextInput({
  id,
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
  onBlur,
  hasError,
}: {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  onBlur?: () => void;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); onBlur?.(); }}
      style={{
        ...inputStyle,
        borderColor: hasError ? "#D7153A" : focused ? "#002664" : "#CDD3D6",
        boxShadow: hasError
          ? "0 0 0 3px rgba(215,21,58,0.10)"
          : focused
          ? "0 0 0 3px rgba(0,38,100,0.10)"
          : "none",
      }}
    />
  );
}

function SelectInput({
  id,
  value,
  onChange,
  children,
  onBlur,
  hasError,
  style: overrideStyle,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  onBlur?: () => void;
  hasError?: boolean;
  style?: React.CSSProperties;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => { setFocused(false); onBlur?.(); }}
      style={{
        ...inputStyle,
        borderColor: hasError ? "#D7153A" : focused ? "#002664" : "#CDD3D6",
        boxShadow: hasError
          ? "0 0 0 3px rgba(215,21,58,0.10)"
          : focused
          ? "0 0 0 3px rgba(0,38,100,0.10)"
          : "none",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236D7579' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: 36,
        ...overrideStyle,
      }}
    >
      {children}
    </select>
  );
}

function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
  autoComplete,
  hasError,
}: {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  hasError?: boolean;
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          borderColor: hasError ? "#D7153A" : focused ? "#002664" : "#CDD3D6",
          boxShadow: hasError
            ? "0 0 0 3px rgba(215,21,58,0.10)"
            : focused
            ? "0 0 0 3px rgba(0,38,100,0.10)"
            : "none",
          paddingRight: 42,
        }}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        tabIndex={-1}
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#6D7579",
          display: "flex",
          alignItems: "center",
          padding: 2,
        }}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={17} strokeWidth={1.8} /> : <Eye size={17} strokeWidth={1.8} />}
      </button>
    </div>
  );
}

// -- Password strength meter

// US-SR-11: 5-rule password complexity (client-side enforcement)
export const PW_RULES = [
  { label: "At least 8 characters",  test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Lowercase letter (a-z)", test: (p: string) => /[a-z]/.test(p) },
  { label: "Number (0-9)",           test: (p: string) => /[0-9]/.test(p) },
  { label: "Special character",      test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function passwordValid(pw: string) {
  return PW_RULES.every((r) => r.test(pw));
}

function PasswordStrength({ password }: { password: string }) {
  const checks = CLEAN_PW_RULES.map((r) => ({ label: r.label, ok: r.test(password) }));
  const score = checks.filter((c) => c.ok).length; // 0-5
  const barColors: Record<number, string> = {
    0: "#E4E7EB", 1: "#D7153A", 2: "#C95000", 3: "#E07800", 4: "#008A07", 5: "#002664",
  };
  const strengthLabels: Record<number, string> = {
    0: "", 1: "Very Weak", 2: "Weak", 3: "Fair", 4: "Good", 5: "Strong",
  };
  const colour = barColors[score];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8 }}>
      {/* 5-segment bar */}
      <div style={{ display: "flex", gap: 3, marginBottom: 5 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i <= score ? colour : "#E4E7EB",
              transition: "background-color 0.2s",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: colour, fontWeight: 600 }}>{strengthLabels[score]}</span>
        <span style={{ fontSize: 10, color: "#9BA1A6" }}>{score}/5 requirements met</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 12px" }}>
        {checks.map((c) => (
          <span
            key={c.label}
            style={{
              fontSize: 11,
              color: c.ok ? "#008A07" : "#6D7579",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span style={{ fontSize: 13 }}>{c.ok ? "✓" : "○"}</span>
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// -- US-SR-03 helpers

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

const CURRENT_YEAR = new Date().getFullYear();
const DOB_MIN_YEAR = CURRENT_YEAR - 100;
const DOB_MAX_YEAR = CURRENT_YEAR - 18;

function validateEmailFormat(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validateAuMobile(mobile: string) {
  const cleaned = mobile.replace(/[\s\-()]/g, "");
  return /^(04\d{8}|\+614\d{8}|614\d{8})$/.test(cleaned);
}

// AHPRA: 3 uppercase letters + 10 digits (e.g. MED0001234567)
function validateAhpra(value: string) {
  return /^[A-Za-z]{3}\d{10}$/.test(value.trim());
}

// Medicare Provider Number: 6 digits + 1 letter + 1 check digit (e.g. 2123456A)
function validateMpn(value: string) {
  return /^\d{4,8}[A-Za-z]\d?$/.test(value.trim());
}

// -- US-SR-10: Input sanitisation helper
const DANGEROUS_PATTERN = /(<script[\s\S]*?<\/script>|<[^>]+>|javascript:|SELECT\s|INSERT\s|DROP\s|DELETE\s|UPDATE\s)/gi;

function sanitiseInput(raw: string): { clean: string; wasDirty: boolean } {
  const clean = raw.replace(DANGEROUS_PATTERN, "");
  const wasDirty = clean !== raw;
  if (wasDirty) {
    console.warn("[NSWHP Audit · US-SR-10] Potentially harmful input sanitised", {
      original: raw,
      sanitised: clean,
      timestamp: new Date().toISOString(),
    });
  }
  return { clean, wasDirty };
}

const SENIOR_NURSING_ROLES = new Set([
  "Registered Nurse (RN)",
  "Enrolled Nurse (EN)",
  "Clinical Nurse Specialist (CNS)",
  "Nurse Unit Manager (NUM)",
]);

function InlineError({ message }: { message: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
      <AlertTriangle size={12} color="#D7153A" strokeWidth={2.5} style={{ flexShrink: 0 }} />
      <p style={{ fontSize: 12, color: "#D7153A", margin: 0, lineHeight: 1.4 }}>{message}</p>
    </div>
  );
}

function ReadOnlyField({
  id,
  label,
  value,
  providerBadge,
  required,
}: {
  id: string;
  label: string;
  value: string;
  providerBadge?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      <div
        id={id}
        style={{
          ...inputStyle,
          backgroundColor: "#F2F4F8",
          color: "#6D7579",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "default",
          userSelect: "none" as const,
        }}
      >
        <Lock size={13} color="#9BA1A6" strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </span>
        {providerBadge && (
          <span style={{
            fontSize: 10, fontWeight: 700, color: "#002664",
            backgroundColor: "#E8EDF5", padding: "2px 7px",
            borderRadius: 4, whiteSpace: "nowrap", flexShrink: 0,
          }}>
            from {providerBadge}
          </span>
        )}
      </div>
    </div>
  );
}

// -- Step 1: Your Details (US-SR-03)

function StepOne({
  data,
  onChange,
  idp,
  submitAttempted,
}: {
  data: { firstName: string; lastName: string; dob: string; email: string; mobile: string };
  onChange: (k: string, v: string) => void;
  idp: "email" | "google" | "apple" | null;
  submitAttempted: boolean;
}) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const parsedDob = data.dob ? data.dob.split("-") : ["", "", ""];
  const [dobYear, setDobYear] = useState(parsedDob[0] || "");
  const [dobMonth, setDobMonth] = useState(parsedDob[1] || "");
  const [dobDay, setDobDay] = useState(parsedDob[2] || "");

  const commitDob = (d: string, m: string, y: string) => {
    onChange("dob", d && m && y ? `${y}-${m}-${d}` : "");
  };

  const touch = (field: string) => setTouched((p) => ({ ...p, [field]: true }));
  const show = (field: string) => touched[field] || submitAttempted;

  const errors: Record<string, string> = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  else if (data.firstName.trim().length < 2) errors.firstName = "Must be at least 2 characters.";

  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  else if (data.lastName.trim().length < 2) errors.lastName = "Must be at least 2 characters.";

  if (!data.dob) {
    errors.dob = "Date of birth is required.";
  } else {
    const d = new Date(data.dob);
    if (isNaN(d.getTime())) errors.dob = "Enter a valid date.";
    else {
      const age = CURRENT_YEAR - d.getFullYear();
      if (age < 18) errors.dob = "You must be at least 18 years old.";
      else if (age > 100) errors.dob = "Please enter a valid date of birth.";
    }
  }

  if (!data.email.trim()) errors.email = "Work email address is required.";
  else if (!validateEmailFormat(data.email)) errors.email = "Enter a valid email address (e.g. name@health.nsw.gov.au).";

  if (!data.mobile.trim()) errors.mobile = "Mobile number is required.";
  else if (!validateAuMobile(data.mobile)) errors.mobile = "Enter a valid Australian mobile (e.g. 0412 345 678).";

  const isEmailLocked = idp === "google" || idp === "apple";
  const providerName = idp === "google" ? "Google" : idp === "apple" ? "Apple" : undefined;

  const daysInMonth = dobMonth && dobYear
    ? getDaysInMonth(parseInt(dobMonth), parseInt(dobYear))
    : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const years = Array.from(
    { length: DOB_MAX_YEAR - DOB_MIN_YEAR + 1 },
    (_, i) => DOB_MAX_YEAR - i
  );

  return (
    <div className="flex flex-col gap-4">

      {isEmailLocked && (
        <div style={{
          backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE",
          borderRadius: 8, padding: "10px 14px",
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: "50%", backgroundColor: "#002664",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: 1,
          }}>
            <Check size={10} color="#ffffff" strokeWidth={3} />
          </div>
          <p style={{ fontSize: 12, color: "#1D4ED8", lineHeight: 1.6, margin: 0 }}>
            Your <strong>name and email</strong> have been pre-filled from your{" "}
            <strong>{providerName}</strong> account. Please verify the details and complete the remaining fields.
          </p>
        </div>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <FieldLabel htmlFor="firstName" required>First name</FieldLabel>
          <TextInput
            id="firstName"
            placeholder="e.g. Jane"
            value={data.firstName}
            onChange={(v) => onChange("firstName", v)}
            autoComplete="given-name"
            onBlur={() => touch("firstName")}
            hasError={!!(show("firstName") && errors.firstName)}
          />
          {show("firstName") && errors.firstName && <InlineError message={errors.firstName} />}
        </div>
        <div style={{ flex: 1 }}>
          <FieldLabel htmlFor="lastName" required>Last name</FieldLabel>
          <TextInput
            id="lastName"
            placeholder="e.g. Smith"
            value={data.lastName}
            onChange={(v) => onChange("lastName", v)}
            autoComplete="family-name"
            onBlur={() => touch("lastName")}
            hasError={!!(show("lastName") && errors.lastName)}
          />
          {show("lastName") && errors.lastName && <InlineError message={errors.lastName} />}
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="dobDay" required>Date of birth</FieldLabel>
        <div style={{ display: "flex", gap: 8 }}>
          <SelectInput
            id="dobDay"
            value={dobDay}
            hasError={!!(show("dob") && errors.dob)}
            style={{ flex: "0 0 80px", minWidth: 0 }}
            onChange={(v) => { setDobDay(v); commitDob(v, dobMonth, dobYear); }}
            onBlur={() => touch("dob")}
          >
            <option value="">DD</option>
            {days.map((d) => (
              <option key={d} value={String(d).padStart(2, "0")}>
                {String(d).padStart(2, "0")}
              </option>
            ))}
          </SelectInput>
          <SelectInput
            id="dobMonth"
            value={dobMonth}
            hasError={!!(show("dob") && errors.dob)}
            style={{ flex: "1 1 0", minWidth: 0 }}
            onChange={(v) => {
              setDobMonth(v);
              const newMax = getDaysInMonth(parseInt(v), parseInt(dobYear) || 2000);
              const adj = dobDay && parseInt(dobDay) > newMax
                ? String(newMax).padStart(2, "0")
                : dobDay;
              if (adj !== dobDay) setDobDay(adj);
              commitDob(adj, v, dobYear);
            }}
            onBlur={() => touch("dob")}
          >
            <option value="">Month</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
            ))}
          </SelectInput>
          <SelectInput
            id="dobYear"
            value={dobYear}
            hasError={!!(show("dob") && errors.dob)}
            style={{ flex: "0 0 90px", minWidth: 0 }}
            onChange={(v) => { setDobYear(v); commitDob(dobDay, dobMonth, v); }}
            onBlur={() => touch("dob")}
          >
            <option value="">YYYY</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>{y}</option>
            ))}
          </SelectInput>
        </div>
        {show("dob") && errors.dob
          ? <InlineError message={errors.dob} />
          : <p style={{ fontSize: 12, color: "#6D7579", marginTop: 5 }}>Used to verify your identity. Format: DD / Month / YYYY.</p>
        }
      </div>

      <div>
        <FieldLabel htmlFor="email" required>Work email address</FieldLabel>
        {isEmailLocked ? (
          <ReadOnlyField
            id="email"
            label=""
            value={data.email}
            providerBadge={providerName}
            required={false}
          />
        ) : (
          <>
            <TextInput
              id="email"
              type="email"
              placeholder="e.g. jane.smith@health.nsw.gov.au"
              value={data.email}
              onChange={(v) => onChange("email", v)}
              autoComplete="email"
              onBlur={() => touch("email")}
              hasError={!!(show("email") && errors.email)}
            />
            {show("email") && errors.email
              ? <InlineError message={errors.email} />
              : <p style={{ fontSize: 12, color: "#6D7579", marginTop: 5 }}>Use your @health.nsw.gov.au address for faster approval.</p>
            }
          </>
        )}
      </div>

      <div>
        <FieldLabel htmlFor="mobile" required>Mobile number</FieldLabel>
        <TextInput
          id="mobile"
          type="tel"
          placeholder="e.g. 0412 345 678"
          value={data.mobile}
          onChange={(v) => onChange("mobile", v)}
          autoComplete="tel"
          onBlur={() => touch("mobile")}
          hasError={!!(show("mobile") && errors.mobile)}
        />
        {show("mobile") && errors.mobile
          ? <InlineError message={errors.mobile} />
          : <p style={{ fontSize: 12, color: "#6D7579", marginTop: 5 }}>
              Australian mobile required for SMS MFA verification (e.g. 0412 345 678).
            </p>
        }
      </div>

    </div>
  );
}

// -- Step 2: Professional Details (US-SR-04)

const ROLES_LIST = [
  { group: "Medical", label: "Medical Officer" },
  { group: "Medical", label: "Registrar" },
  { group: "Medical", label: "Intern" },
  { group: "Medical", label: "Pathologist" },
  { group: "Nursing", label: "Nurse Practitioner" },
  { group: "Nursing", label: "Registered Nurse (RN)" },
  { group: "Nursing", label: "Clinical Nurse Specialist (CNS)" },
  { group: "Nursing", label: "Nurse Unit Manager (NUM)" },
  { group: "Nursing", label: "Enrolled Nurse (EN)" },
  { group: "Allied Health / Science", label: "Scientist" },
  { group: "Allied Health / Science", label: "Allied Health Professional" },
  { group: "Administration", label: "Administrative Officer" },
  { group: "Administration", label: "Other" },
];

const AHPRA_PREFIXES: Record<string, string> = {
  MED: "Medical practitioner",
  NMW: "Nursing & midwifery",
  PHO: "Psychology",
  DEN: "Dental",
  OPT: "Optometry",
  POD: "Podiatry",
  OST: "Osteopathy",
  CHI: "Chiropractic",
  OCC: "Occupational therapy",
  PHY: "Physiotherapy",
  ABO: "Aboriginal & Torres Strait Islander health practice",
};

function AhpraPrefixBadge({ value }: { value: string }) {
  const prefix = value.trim().slice(0, 3).toUpperCase();
  const profession = AHPRA_PREFIXES[prefix];
  if (!profession || value.trim().length < 3) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 11, fontWeight: 600, color: "#002664",
      backgroundColor: "#E8EDF5", padding: "2px 8px",
      borderRadius: 4, marginTop: 6,
    }}>
      <BadgeCheck size={11} color="#002664" strokeWidth={2.5} />
      {profession} registration
    </span>
  );
}

function StepTwo({
  data,
  onChange,
  submitAttempted,
}: {
  data: { role: string; facility: string; department: string; staffId: string; ahpra: string; mpn: string };
  onChange: (k: string, v: string) => void;
  submitAttempted: boolean;
}) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (f: string) => setTouched((p) => ({ ...p, [f]: true }));
  const show  = (f: string) => touched[f] || submitAttempted;

  const isSeniorNursing = SENIOR_NURSING_ROLES.has(data.role);

  const errors: Record<string, string> = {};
  if (!data.role)     errors.role     = "Please select your role.";
  if (!data.facility) errors.facility = "Please select your primary facility.";

  if (!data.ahpra.trim()) {
    errors.ahpra = "AHPRA Registration Number is required.";
  } else if (!validateAhpra(data.ahpra)) {
    errors.ahpra = "Invalid format — must be 3 letters + 10 digits (e.g. MED0001234567).";
  }

  if (data.mpn.trim() && !isSeniorNursing && !validateMpn(data.mpn)) {
    errors.mpn = "Invalid Medicare Provider Number — expected format: 6 digits + letter + digit (e.g. 2123456A).";
  }

  const facilities = [
    "John Hunter Hospital (JHH)",
    "Royal Prince Alfred Hospital (RPAH)",
    "Westmead Hospital",
    "Liverpool Hospital",
    "St George Hospital",
    "Nepean Hospital",
    "Gosford Hospital",
    "Calvary Mater Newcastle",
    "Other",
  ];

  const handleRoleChange = (v: string) => {
    onChange("role", v);
    if (SENIOR_NURSING_ROLES.has(v)) onChange("mpn", "N/A");
    else if (data.mpn === "N/A") onChange("mpn", "");
  };

  return (
    <div className="flex flex-col gap-4">

      <div>
        <FieldLabel htmlFor="role" required>Role / Position</FieldLabel>
        <SelectInput
          id="role"
          value={data.role}
          onChange={handleRoleChange}
          onBlur={() => touch("role")}
          hasError={!!(show("role") && errors.role)}
        >
          <option value="">Select your role…</option>
          {["Medical", "Nursing", "Allied Health / Science", "Administration"].map((grp) => (
            <optgroup key={grp} label={grp}>
              {ROLES_LIST.filter((r) => r.group === grp).map((r) => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </optgroup>
          ))}
        </SelectInput>
        {show("role") && errors.role && <InlineError message={errors.role} />}
        {isSeniorNursing && (
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            marginTop: 6, fontSize: 12, color: "#6D7579",
          }}>
            <Info size={12} color="#6D7579" strokeWidth={2} />
            Senior Nursing role — Medicare Provider Number not required.
          </div>
        )}
      </div>

      <div>
        <FieldLabel htmlFor="facility" required>Primary facility</FieldLabel>
        <SelectInput
          id="facility"
          value={data.facility}
          onChange={(v) => onChange("facility", v)}
          onBlur={() => touch("facility")}
          hasError={!!(show("facility") && errors.facility)}
        >
          <option value="">Select a facility…</option>
          {facilities.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </SelectInput>
        {show("facility") && errors.facility && <InlineError message={errors.facility} />}
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
          <FieldLabel htmlFor="ahpra" required>AHPRA Registration Number</FieldLabel>
          <a
            href="https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 11, color: "#002664", textDecoration: "underline", fontWeight: 600, flexShrink: 0 }}
          >
            Look up AHPRA ↗
          </a>
        </div>
        <TextInput
          id="ahpra"
          placeholder="e.g. MED0001234567"
          value={data.ahpra}
          onChange={(v) => onChange("ahpra", v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 13))}
          onBlur={() => touch("ahpra")}
          hasError={!!(show("ahpra") && errors.ahpra)}
          autoComplete="off"
        />
        {show("ahpra") && errors.ahpra ? (
          <InlineError message={errors.ahpra} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <p style={{ fontSize: 12, color: "#6D7579", marginTop: 5 }}>
              Format: 3 letters + 10 digits — auto-uppercased as you type.
            </p>
            {validateAhpra(data.ahpra) && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 11, fontWeight: 700, color: "#008A07",
                marginTop: 5,
              }}>
                <BadgeCheck size={12} color="#008A07" strokeWidth={2.5} /> Valid
              </span>
            )}
          </div>
        )}
        <AhpraPrefixBadge value={data.ahpra} />
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <FieldLabel htmlFor="mpn">Medicare Provider Number (MPN)</FieldLabel>
          <span style={{
            fontSize: 10, fontWeight: 700, color: "#6D7579",
            backgroundColor: "#E4E7EB", padding: "1px 7px",
            borderRadius: 4, marginBottom: 5,
          }}>
            OPTIONAL
          </span>
        </div>

        {isSeniorNursing ? (
          <div style={{
            ...inputStyle,
            backgroundColor: "#F2F4F8",
            display: "flex", alignItems: "center", gap: 8,
            cursor: "default", userSelect: "none" as const,
            borderColor: "#CDD3D6",
          }}>
            <Ban size={14} color="#9BA1A6" strokeWidth={2} style={{ flexShrink: 0 }} />
            <span style={{ color: "#9BA1A6", fontStyle: "italic" }}>Not applicable</span>
            <span style={{
              marginLeft: "auto", fontSize: 10, fontWeight: 700,
              color: "#6D7579", backgroundColor: "#E4E7EB",
              padding: "2px 7px", borderRadius: 4,
            }}>
              SENIOR NURSING
            </span>
          </div>
        ) : (
          <TextInput
            id="mpn"
            placeholder="e.g. 2123456A"
            value={data.mpn}
            onChange={(v) => onChange("mpn", v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 9))}
            onBlur={() => touch("mpn")}
            hasError={!!(show("mpn") && errors.mpn)}
            autoComplete="off"
          />
        )}

        {!isSeniorNursing && show("mpn") && errors.mpn ? (
          <InlineError message={errors.mpn} />
        ) : isSeniorNursing ? (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginTop: 6 }}>
            <Info size={12} color="#6D7579" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 12, color: "#6D7579", margin: 0, lineHeight: 1.5 }}>
              MPN is not required for Senior Nursing roles. Account matching will use your AHPRA
              number and practice details.
            </p>
          </div>
        ) : (
          <p style={{ fontSize: 12, color: "#6D7579", marginTop: 5 }}>
            Provide your MPN if you have one. Format validated on entry. Matching uses AHPRA + practice details.
          </p>
        )}

        {!isSeniorNursing && data.mpn.trim() && validateMpn(data.mpn) && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 11, fontWeight: 700, color: "#008A07", marginTop: 5,
          }}>
            <BadgeCheck size={12} color="#008A07" strokeWidth={2.5} /> Valid MPN
          </span>
        )}
      </div>

      <div style={{ borderTop: "1px solid #E4E7EB", paddingTop: 4 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.06em", color: "#9BA1A6", marginBottom: 12,
        }}>
          Additional details (optional)
        </p>

        <div style={{ marginBottom: 14 }}>
          <FieldLabel htmlFor="department">Department / Ward</FieldLabel>
          <TextInput
            id="department"
            placeholder="e.g. Oncology, ED, ICU"
            value={data.department}
            onChange={(v) => onChange("department", v)}
          />
        </div>

        <div>
          <FieldLabel htmlFor="staffId">Staff / Employee ID</FieldLabel>
          <TextInput
            id="staffId"
            placeholder="e.g. NSW123456"
            value={data.staffId}
            onChange={(v) => onChange("staffId", v)}
          />
          <p style={{ fontSize: 12, color: "#6D7579", marginTop: 5 }}>
            Providing your staff ID speeds up account verification.
          </p>
        </div>
      </div>

    </div>
  );
}

// -- Step 3: Practice Details (US-SR-05) + Real-Time Match (US-SR-06)

function validatePostcode(p: string) {
  return /^\d{4}$/.test(p.trim());
}

const MAX_PRACTICE_NAME = 100;

type MatchTrust = "mpn_full" | "ahpra_only" | "senior_nursing" | "no_match";
type MatchStatus = "idle" | "matching" | "matched" | "no_match";

function MatchResultPanel({
  status,
  trust,
  firstName,
  lastName,
  ahpra,
  mpn,
  practiceName,
  suburb,
  isSeniorNursing,
  onProceedNoMatch,
}: {
  status: MatchStatus;
  trust: MatchTrust | null;
  firstName: string;
  lastName: string;
  ahpra: string;
  mpn: string;
  practiceName: string;
  suburb: string;
  isSeniorNursing: boolean;
  onProceedNoMatch: () => void;
}) {
  const [proceedHover, setProceedHover] = useState(false);

  if (status === "matching") {
    return (
      <div style={{
        border: "1px solid #E4E7EB", borderRadius: 10, padding: "16px 18px",
        display: "flex", alignItems: "center", gap: 12, backgroundColor: "#ffffff",
      }}>
        <Loader2 size={20} color="#002664" style={{ animation: "spin 1s linear infinite", flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#22272B", marginBottom: 2 }}>
            Matching practitioner record…
          </p>
          <p style={{ fontSize: 11, color: "#6D7579", margin: 0 }}>
            Checking AHPRA + Name + Practice Details against the NHPO register.
          </p>
        </div>
      </div>
    );
  }

  if (status === "no_match") {
    return (
      <div style={{ border: "1.5px solid #C95000", borderRadius: 10, overflow: "hidden" }}>
        <div style={{
          backgroundColor: "#FFF3E0", padding: "12px 16px",
          display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", backgroundColor: "#C95000",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
          }}>
            <AlertTriangle size={14} color="#ffffff" strokeWidth={2.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#7D3700" }}>
                No Match Found
              </span>
              <span style={{
                fontSize: 10, fontWeight: 700, color: "#ffffff",
                backgroundColor: "#C95000", padding: "1px 7px",
                borderRadius: 4, letterSpacing: "0.04em",
              }}>
                MANUAL REVIEW REQUIRED
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#7D3700", margin: 0, lineHeight: 1.5 }}>
              {isSeniorNursing
                ? "No AHPRA record found for this Senior Nursing role without MPN. Registration can continue — NSWHP will verify manually."
                : "No record matched AHPRA, name and practice details in the NHPO register. Registration can continue — NSWHP will verify your entitlement manually."}
            </p>
          </div>
        </div>

        <div style={{ padding: "12px 16px", borderTop: "1px solid #FFD4A3", backgroundColor: "#FFFBF5" }}>
          <p style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.06em", color: "#7D3700", marginBottom: 8,
          }}>
            What happens next
          </p>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: "#22272B", lineHeight: 1.75 }}>
            <li>Your registration will be submitted with status <strong>"No Match – Manual Review Required"</strong></li>
            <li>This event will be logged in the audit trail with your authenticated session ID</li>
            <li>An NSWHP administrator will manually verify your practitioner entitlement</li>
            <li>You will be notified by email once your account is approved or if further information is needed</li>
          </ul>
        </div>

        <div style={{
          padding: "10px 16px", borderTop: "1px solid #FFD4A3",
          backgroundColor: "#FFF8EC",
          display: "flex", alignItems: "flex-start", gap: 8,
        }}>
          <Info size={13} color="#C95000" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 11, color: "#7D3700", margin: 0, lineHeight: 1.5 }}>
            Compensating controls active: rate limiting · session attempt limits · full audit logging · Gov. IdP gating (future state).
          </p>
        </div>

        {trust !== "no_match" && (
          <div style={{ padding: "12px 16px", borderTop: "1px solid #FFD4A3" }}>
            <p style={{ fontSize: 12, color: "#6D7579", marginBottom: 10, lineHeight: 1.5 }}>
              You can still complete registration. NSWHP will verify your entitlement
              before your account is activated.
            </p>
            <button
              onClick={onProceedNoMatch}
              style={{
                width: "100%",
                padding: "10px 16px",
                backgroundColor: proceedHover ? "#7D3700" : "#C95000",
                color: "#ffffff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "'Public Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={() => setProceedHover(true)}
              onMouseLeave={() => setProceedHover(false)}
            >
              <AlertTriangle size={14} strokeWidth={2.5} />
              Proceed — NSWHP will verify my entitlement manually
            </button>
          </div>
        )}

        {trust === "no_match" && (
          <div style={{
            padding: "10px 16px", borderTop: "1px solid #FFD4A3",
            backgroundColor: "#FFF3E0",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Check size={14} color="#C95000" strokeWidth={2.5} style={{ flexShrink: 0 }} />
            <p style={{ fontSize: 12, fontWeight: 700, color: "#7D3700", margin: 0 }}>
              Acknowledged — continuing with manual review. Event logged in audit trail.
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!trust || status !== "matched") return null;

  const isFullTrust = trust === "mpn_full";

  const trustLabel =
    trust === "mpn_full" ? "MPN + AHPRA" :
    trust === "senior_nursing" ? "SENIOR NURSING" :
    "AHPRA ONLY";

  const verifiedRows = [
    { label: "Practitioner name", value: `${firstName} ${lastName}` },
    { label: "AHPRA No.", value: ahpra },
    ...(isFullTrust ? [{ label: "Medicare Provider No.", value: mpn }] : []),
    { label: "Practice location", value: `${practiceName}, ${suburb}` },
  ];

  return (
    <div style={{ border: "1.5px solid #008A07", borderRadius: 10, overflow: "hidden" }}>
      <div style={{
        backgroundColor: "#E5F6E6", padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", backgroundColor: "#008A07",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Check size={14} color="#ffffff" strokeWidth={3} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#005C05" }}>
              Matched — Exact
            </span>
            <span style={{
              fontSize: 10, fontWeight: 700, color: "#ffffff",
              backgroundColor: "#008A07", padding: "1px 7px",
              borderRadius: 4, letterSpacing: "0.04em",
            }}>
              {trustLabel}
            </span>
          </div>
          <p style={{ fontSize: 11, color: "#005C05", marginTop: 2, marginBottom: 0 }}>
            Status → "Matched - Exact" · Match event logged in audit trail.
          </p>
        </div>
        <ShieldCheck size={18} color="#008A07" strokeWidth={2} style={{ flexShrink: 0 }} />
      </div>

      <div style={{ padding: "12px 16px", borderTop: "1px solid #C3EDBA" }}>
        <p style={{
          fontSize: 11, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.06em", color: "#6D7579", marginBottom: 10,
        }}>
          Verified &amp; Locked Fields
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {verifiedRows.map((row) => (
            <div key={row.label} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 10px", backgroundColor: "#F2F4F8", borderRadius: 6,
            }}>
              <Lock size={12} color="#6D7579" strokeWidth={2} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: "#6D7579", minWidth: 150, flexShrink: 0 }}>
                {row.label}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#22272B" }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {trust === "ahpra_only" && (
        <div style={{
          padding: "10px 16px", borderTop: "1px solid #C3EDBA",
          backgroundColor: "#FFF8EC",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <AlertTriangle size={13} color="#C95000" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#7D3700", marginBottom: 4 }}>
                Compensating controls applied (AHPRA-only match)
              </p>
              <ul style={{ margin: 0, paddingLeft: 14, fontSize: 11, color: "#7D3700", lineHeight: 1.7 }}>
                <li>Rate limiting on registration attempts</li>
                <li>Session attempt limits enforced</li>
                <li>Full audit logging active</li>
                <li>Gov. IdP gating — <em>future state</em></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {trust === "senior_nursing" && (
        <div style={{ padding: "10px 16px", borderTop: "1px solid #C3EDBA" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Info size={13} color="#6D7579" strokeWidth={2} style={{ flexShrink: 0 }} />
            <p style={{ fontSize: 11, color: "#6D7579", margin: 0 }}>
              Senior Nursing role matched without MPN. Pre-fill and lock applied
              using AHPRA + practice details.
            </p>
          </div>
        </div>
      )}

      {trust === "mpn_full" && (
        <div style={{ padding: "10px 16px", borderTop: "1px solid #C3EDBA" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Info size={13} color="#6D7579" strokeWidth={2} style={{ flexShrink: 0 }} />
            <p style={{ fontSize: 11, color: "#6D7579", margin: 0 }}>
              Full match — MPN + Name + Practice verified. Proceed with any IdP.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// -- US-SR-05 form
function StepPractice({
  data,
  onChange,
  submitAttempted,
  ahpra,
  mpn,
  role,
  firstName,
  lastName,
  onMatchResult,
}: {
  data: { practiceName: string; suburb: string; postcode: string };
  onChange: (k: string, v: string) => void;
  submitAttempted: boolean;
  ahpra: string;
  mpn: string;
  role: string;
  firstName: string;
  lastName: string;
  onMatchResult: (trust: MatchTrust | null) => void;
}) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (f: string) => setTouched((p) => ({ ...p, [f]: true }));
  const show  = (f: string) => touched[f] || submitAttempted;

  const [matchStatus, setMatchStatus] = useState<MatchStatus>("idle");
  const [matchTrust,  setMatchTrust]  = useState<MatchTrust | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const errors: Record<string, string> = {};
  if (!data.practiceName.trim())
    errors.practiceName = "Practice name is required.";
  else if (data.practiceName.trim().length > MAX_PRACTICE_NAME)
    errors.practiceName = `Must not exceed ${MAX_PRACTICE_NAME} characters.`;
  if (!data.suburb.trim())
    errors.suburb = "Suburb is required.";
  if (!data.postcode.trim())
    errors.postcode = "Postcode is required.";
  else if (!validatePostcode(data.postcode))
    errors.postcode = "Enter a valid 4-digit Australian postcode (e.g. 2000).";

  const isSeniorNursing = SENIOR_NURSING_ROLES.has(role);
  const hasMpn = !isSeniorNursing && validateMpn(mpn);

  const ahpraPrefix = ahpra.trim().slice(0, 3).toUpperCase();
  const ahpraRecognised = ahpraPrefix.length === 3 && ahpraPrefix in AHPRA_PREFIXES;

  const allReady =
    data.practiceName.trim().length > 0 &&
    data.practiceName.trim().length <= MAX_PRACTICE_NAME &&
    data.suburb.trim().length > 0 &&
    validatePostcode(data.postcode) &&
    validateAhpra(ahpra) &&
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2;

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!allReady) {
      setMatchStatus("idle");
      setMatchTrust(null);
      onMatchResult(null);
      return;
    }
    setMatchStatus("matching");
    setMatchTrust(null);
    onMatchResult(null);
    timerRef.current = setTimeout(() => {
      if (!ahpraRecognised) {
        setMatchStatus("no_match");
        return;
      }
      const trust: MatchTrust = isSeniorNursing
        ? "senior_nursing"
        : hasMpn
        ? "mpn_full"
        : "ahpra_only";
      setMatchStatus("matched");
      setMatchTrust(trust);
      onMatchResult(trust);
    }, 1400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.practiceName, data.suburb, data.postcode, ahpra, firstName, lastName, role, mpn]);

  const handleProceedNoMatch = () => {
    setMatchTrust("no_match");
    onMatchResult("no_match");
  };

  return (
    <div className="flex flex-col gap-4">

      <div style={{
        backgroundColor: "#EFF3FF", border: "1px solid #C7D2FE",
        borderRadius: 8, padding: "10px 14px",
        display: "flex", gap: 8, alignItems: "flex-start",
      }}>
        <Info size={14} color="#002664" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 12, color: "#002664", lineHeight: 1.6, margin: 0 }}>
          All three fields are used together with your <strong>AHPRA number</strong>{" "}
          and <strong>name</strong> for real-time practitioner matching (US-SR-06).
        </p>
      </div>

      <div>
        <FieldLabel htmlFor="practiceName" required>Practice name</FieldLabel>
        <TextInput
          id="practiceName"
          placeholder="e.g. NSW Health Pathology – Camperdown"
          value={data.practiceName}
          onChange={(v) => onChange("practiceName", v.slice(0, MAX_PRACTICE_NAME))}
          onBlur={() => touch("practiceName")}
          hasError={!!(show("practiceName") && errors.practiceName)}
          autoComplete="organization"
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 4 }}>
          <div style={{ flex: 1 }}>
            {show("practiceName") && errors.practiceName
              ? <InlineError message={errors.practiceName} />
              : <p style={{ fontSize: 12, color: "#6D7579", margin: 0 }}>
                  Name of your primary work location or pathology practice.
                </p>
            }
          </div>
          <span style={{
            fontSize: 11, flexShrink: 0, marginLeft: 8, marginTop: 1,
            color: data.practiceName.length > MAX_PRACTICE_NAME * 0.85 ? "#C95000" : "#9BA1A6",
          }}>
            {data.practiceName.length}/{MAX_PRACTICE_NAME}
          </span>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="suburb" required>Suburb</FieldLabel>
        <TextInput
          id="suburb"
          placeholder="e.g. Camperdown"
          value={data.suburb}
          onChange={(v) => onChange("suburb", v)}
          onBlur={() => touch("suburb")}
          hasError={!!(show("suburb") && errors.suburb)}
          autoComplete="address-level2"
        />
        {show("suburb") && errors.suburb
          ? <InlineError message={errors.suburb} />
          : <p style={{ fontSize: 12, color: "#6D7579", marginTop: 4 }}>
              Used for practitioner matching.
            </p>
        }
      </div>

      <div>
        <FieldLabel htmlFor="postcode" required>Postcode</FieldLabel>
        <TextInput
          id="postcode"
          placeholder="e.g. 2050"
          value={data.postcode}
          onChange={(v) => onChange("postcode", v.replace(/\D/g, "").slice(0, 4))}
          onBlur={() => touch("postcode")}
          hasError={!!(show("postcode") && errors.postcode)}
          autoComplete="postal-code"
        />
        {show("postcode") && errors.postcode
          ? <InlineError message={errors.postcode} />
          : <p style={{ fontSize: 12, color: "#6D7579", marginTop: 4 }}>
              Valid Australian postcode — 4 digits (e.g. 2000).
            </p>
        }
      </div>

      {(matchStatus === "matching" || matchStatus === "matched" || matchStatus === "no_match") && (
        <MatchResultPanel
          status={matchStatus}
          trust={matchTrust}
          firstName={firstName}
          lastName={lastName}
          ahpra={ahpra}
          mpn={mpn}
          practiceName={data.practiceName}
          suburb={data.suburb}
          isSeniorNursing={isSeniorNursing}
          onProceedNoMatch={handleProceedNoMatch}
        />
      )}

    </div>
  );
}

// -- Step 4: Security

function StepThree({
  data,
  onChange,
  submitAttempted,
}: {
  data: {
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
    agreePrivacy: boolean;
  };
  onChange: (k: string, v: string | boolean) => void;
  submitAttempted?: boolean;
}) {
  const pwAllRulesPass = passwordValid(data.password);
  const confirmMismatch = data.confirmPassword.length > 0 && data.password !== data.confirmPassword;
  const showPwError = !!(submitAttempted && !pwAllRulesPass);
  const showMismatchError = confirmMismatch || !!(submitAttempted && data.password !== data.confirmPassword);

  return (
    <div className="flex flex-col gap-4">
      <div style={{
        backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE",
        borderRadius: 8, padding: "10px 14px",
        display: "flex", gap: 10, alignItems: "flex-start",
      }}>
        <Info size={14} color="#002664" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 12, color: "#1D4ED8", lineHeight: 1.6, margin: 0 }}>
          <strong>US-SR-11</strong> — Password policy is enforced here at the application layer.
          Azure B2C does not enforce complexity for Graph API accounts.
          All 5 requirements must be met before you can proceed.
        </p>
      </div>

      <div>
        <FieldLabel htmlFor="password" required>
          Create password
        </FieldLabel>
        <PasswordInput
          id="password"
          placeholder="Enter a secure password"
          value={data.password}
          onChange={(v) => onChange("password", v)}
          autoComplete="new-password"
          hasError={showPwError}
        />
        <PasswordStrength password={data.password} />
        {showPwError && (
          <InlineError message="Password must satisfy all 5 requirements above before you can continue." />
        )}
      </div>
      <div>
        <FieldLabel htmlFor="confirmPassword" required>
          Confirm password
        </FieldLabel>
        <PasswordInput
          id="confirmPassword"
          placeholder="Re-enter your password"
          value={data.confirmPassword}
          onChange={(v) => onChange("confirmPassword", v)}
          autoComplete="new-password"
          hasError={showMismatchError}
        />
        {showMismatchError && (
          <InlineError message="Passwords do not match." />
        )}
      </div>

      <div
        style={{
          borderTop: "1px solid #E4E7EB",
          paddingTop: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[
          {
            key: "agreeTerms",
            checked: data.agreeTerms,
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
            checked: data.agreePrivacy,
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
        ].map((item) => {
          const showError = submitAttempted && !item.checked;
          return (
            <div key={item.key}>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    minWidth: 18,
                    borderRadius: 4,
                    border: `2px solid ${showError ? "#D7153A" : item.checked ? "#002664" : "#CDD3D6"}`,
                    backgroundColor: item.checked ? "#002664" : "#ffffff",
                    boxShadow: showError ? "0 0 0 3px rgba(215,21,58,0.10)" : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                    transition: "all 0.15s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => onChange(item.key, !item.checked)}
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
  );
}

// -- US-SR-01: Intro / Start Registration screen

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

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
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
        onClick={onStart}
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
          <a
            href="https://nap-mono-25794994.figma.site/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#002664", textDecoration: "none", fontWeight: 600 }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Sign in
          </a>
        </span>
      </div>
    </div>
  );
}

// -- US-SR-02: Select Identity Provider

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

type IdpOption = "google" | "apple" | null;

function IdpSelectScreen({
  onEmailCreate,
  onBack,
  onSocialSuccess,
  onForgotPassword,
}: {
  onEmailCreate: () => void;
  onBack: () => void;
  onSocialSuccess: (provider: "google" | "apple") => void;
  onForgotPassword: () => void;
}) {
  const [redirecting, setRedirecting] = useState<IdpOption>(null);

  const handleSocialLogin = (provider: "google" | "apple") => {
    setRedirecting(provider);
    setTimeout(() => {
      setRedirecting(null);
      onSocialSuccess(provider);
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
    <div className="flex flex-col gap-0">
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <h3 style={{ color: "#22272B", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
          How would you like to continue?
        </h3>
        <p style={{ fontSize: 13, color: "#6D7579", lineHeight: 1.5 }}>
          Choose your preferred sign-in method to create your PathWorks account.
        </p>
      </div>

      {redirecting && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 8, paddingBottom: 16,
        }}>
          <Loader2 size={22} color="#002664" style={{ animation: "spin 1s linear infinite" }} />
          <p style={{ fontSize: 13, color: "#002664", fontWeight: 600, margin: 0 }}>
            Redirecting to {redirecting === "google" ? "Google" : "Apple"}…
          </p>
          <p style={{ fontSize: 11, color: "#6D7579", margin: 0 }}>
            You'll be returned here after authenticating.
          </p>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        <button
          onClick={() => handleSocialLogin("google")}
          disabled={!!redirecting}
          style={{ ...btnBase, opacity: redirecting ? 0.6 : 1, cursor: redirecting ? "not-allowed" : "pointer" }}
          onMouseEnter={(e) => { if (!redirecting) { e.currentTarget.style.borderColor = "#4285F4"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(66,133,244,0.1)"; }}}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E4E7EB"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <GoogleIcon />
          Sign in with Google
        </button>
        <button
          onClick={() => handleSocialLogin("apple")}
          disabled={!!redirecting}
          style={{ ...btnBase, opacity: redirecting ? 0.6 : 1, cursor: redirecting ? "not-allowed" : "pointer" }}
          onMouseEnter={(e) => { if (!redirecting) { e.currentTarget.style.borderColor = "#22272B"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,39,43,0.08)"; }}}
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
          onClick={onEmailCreate}
          disabled={!!redirecting}
          style={{ ...btnBase, opacity: redirecting ? 0.6 : 1, cursor: redirecting ? "not-allowed" : "pointer" }}
          onMouseEnter={(e) => { if (!redirecting) { e.currentTarget.style.borderColor = "#002664"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,38,100,0.1)"; }}}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E4E7EB"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <Mail size={18} color="#22272B" strokeWidth={1.8} style={{ flexShrink: 0 }} />
          Create with Email Address
        </button>
      </div>

      <div style={{ borderTop: "1px solid #E4E7EB", paddingTop: 16, display: "flex", justifyContent: "flex-start" }}>
        <button
          onClick={onBack}
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

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// -- US-SR-10: Mock CAPTCHA

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
    <div
      style={{
        position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.50)",
        zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, fontFamily: "'Public Sans', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff", borderRadius: 12, padding: "28px 32px",
          maxWidth: 380, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, backgroundColor: "#FFF3E0",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ShieldCheck size={22} color="#C95000" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#22272B", marginBottom: 1 }}>
              Security Verification
            </p>
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
            <span style={{
              fontSize: 14, color: "#22272B",
              fontWeight: state === "done" ? 600 : 400,
            }}>
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

// -- US-SR-09: Email Verification Screen

function EmailVerificationScreen({
  email,
  firstName,
  onSuccess,
  onBack,
}: {
  email: string;
  firstName: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
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

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, paddingTop: 8, paddingBottom: 8 }}>
      {verifState === "pending" ? (
        <>
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
              Hi <strong style={{ color: "#22272B" }}>{firstName}</strong> — we've sent a
              verification link to{" "}
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
              Registration submitted. Pending record created — status will update to{" "}
              <strong>"Ready for Identity Proofing"</strong> once your email is verified.
            </p>
          </div>

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
                onClick={onSuccess}
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
                padding: "10px 0", width: "100%",
                backgroundColor: resendCooldown > 0 ? "#F2F4F8" : "#002664",
                color: resendCooldown > 0 ? "#9BA1A6" : "#ffffff",
                border: "none", borderRadius: 6,
                cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                fontSize: 14, fontWeight: 600, fontFamily: "'Public Sans', sans-serif",
              }}
            >
              {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : "Resend verification email"}
            </button>
            <button
              onClick={onBack}
              style={{
                background: "none", border: "none", color: "#002664",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Public Sans', sans-serif", padding: 0,
              }}
            >
              Return to sign in
            </button>
          </div>
        </>
      ) : (
        <>
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
                padding: "10px 0", width: "100%",
                backgroundColor: resendCooldown > 0 ? "#F2F4F8" : "#002664",
                color: resendCooldown > 0 ? "#9BA1A6" : "#ffffff",
                border: "none", borderRadius: 6,
                cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                fontSize: 14, fontWeight: 600, fontFamily: "'Public Sans', sans-serif",
              }}
            >
              {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : "Request new verification email"}
            </button>
            <button
              onClick={onBack}
              style={{
                background: "none", border: "none", color: "#002664",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Public Sans', sans-serif", padding: 0,
              }}
            >
              Return to sign in
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// -- US-SR-12: Forgot Password Screen

function ForgotPasswordScreen({
  onBack,
  onSignIn,
}: {
  onBack: () => void;
  onSignIn: () => void;
}) {
  type FpState = "enter_email" | "email_sent" | "new_password" | "expired" | "complete";
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 4, paddingBottom: 4 }}>
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
            style={{
              padding: "11px 0", backgroundColor: "#002664", color: "#ffffff",
              border: "none", borderRadius: 6, cursor: "pointer",
              fontSize: 14, fontWeight: 600, fontFamily: "'Public Sans', sans-serif", width: "100%",
            }}
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

          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", color: "#002664",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "'Public Sans', sans-serif", padding: 0, alignSelf: "center",
            }}
          >
            Back to sign in options
          </button>
        </>
      )}

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
              If <strong style={{ color: "#22272B" }}>{email}</strong> matches a registered
              account, you'll receive a password reset link within a few minutes.
            </p>
          </div>

          <div style={{
            backgroundColor: "#F2F4F8", borderRadius: 8, padding: "14px 18px",
          }}>
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
                padding: "10px 0", width: "100%",
                backgroundColor: resendCooldown > 0 ? "#F2F4F8" : "#ffffff",
                color: resendCooldown > 0 ? "#9BA1A6" : "#002664",
                border: `1px solid ${resendCooldown > 0 ? "#E4E7EB" : "#002664"}`,
                borderRadius: 6, cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                fontSize: 13, fontWeight: 600, fontFamily: "'Public Sans', sans-serif",
              }}
            >
              {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : "Resend reset email"}
            </button>
            <button
              onClick={onBack}
              style={{
                background: "none", border: "none", color: "#6D7579",
                fontSize: 13, cursor: "pointer",
                fontFamily: "'Public Sans', sans-serif", padding: 0, alignSelf: "center",
              }}
            >
              Back to sign in
            </button>
          </div>
        </>
      )}

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

          <div style={{
            backgroundColor: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 8, padding: "12px 16px",
          }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <AlertTriangle size={15} color="#D7153A" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5, margin: 0 }}>
                Request a new reset email. Any previous links are now invalidated.
              </p>
            </div>
          </div>

          <button
            onClick={() => { setFpState("email_sent"); handleResend(); }}
            style={{
              padding: "11px 0", backgroundColor: "#002664", color: "#ffffff",
              border: "none", borderRadius: 6, cursor: "pointer",
              fontSize: 14, fontWeight: 600, fontFamily: "'Public Sans', sans-serif", width: "100%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
          >
            Request new reset email
          </button>
          <button
            onClick={onBack}
            style={{
              background: "none", border: "none", color: "#6D7579",
              fontSize: 13, cursor: "pointer",
              fontFamily: "'Public Sans', sans-serif", padding: 0, alignSelf: "center",
            }}
          >
            Back to sign in
          </button>
        </>
      )}

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
            style={{
              padding: "11px 0", backgroundColor: "#002664", color: "#ffffff",
              border: "none", borderRadius: 6, cursor: "pointer",
              fontSize: 14, fontWeight: 600, fontFamily: "'Public Sans', sans-serif", width: "100%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
          >
            Set new password
          </button>
        </>
      )}

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
            onClick={onSignIn}
            style={{
              padding: "11px 0", backgroundColor: "#002664", color: "#ffffff",
              border: "none", borderRadius: 6, cursor: "pointer",
              fontSize: 14, fontWeight: 600, fontFamily: "'Public Sans', sans-serif", width: "100%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
          >
            Sign in with new password
          </button>
        </>
      )}
    </div>
  );
}

// -- Main RegisterPage

type Screen = "intro" | "idp" | "wizard" | "success" | "email_verification" | "forgot_password";

const IDP_TOKEN_CLAIMS: Record<string, { email: string; firstName?: string; lastName?: string }> = {
  google: { email: "jane.smith@gmail.com", firstName: "Jane", lastName: "Smith" },
  apple:  { email: "j.smith@icloud.com",   firstName: "Jane", lastName: "Smith" },
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("intro");
  const [step, setStep] = useState(1);
  const [selectedIdp, setSelectedIdp] = useState<"email" | "google" | "apple" | null>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [submitTimes, setSubmitTimes] = useState<number[]>([]);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [sanitisedWarning, setSanitisedWarning] = useState(false);
  const [step1Attempted, setStep1Attempted] = useState(false);
  const [step2Attempted, setStep2Attempted] = useState(false);
  const [step3Attempted, setStep3Attempted] = useState(false);
  const [step4Attempted, setStep4Attempted] = useState(false);

  const [step1, setStep1] = useState({
    firstName: "Jane",
    lastName: "Smith",
    dob: "1985-03-22",
    email: "jane.smith@health.nsw.gov.au",
    mobile: "0412 345 678",
  });
  const [step2, setStep2] = useState({
    role: "Medical Officer",
    facility: "Royal Prince Alfred Hospital (RPAH)",
    department: "Oncology",
    staffId: "NSW123456",
    ahpra: "MED0001234567",
    mpn: "2123456A",
  });
  const [step3, setStep3] = useState({
    practiceName: "NSW Health Pathology – Camperdown",
    suburb: "Camperdown",
    postcode: "2050",
  });
  const [step4, setStep4] = useState({
    password: "Pathworks2025!",
    confirmPassword: "Pathworks2025!",
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [matchTrust, setMatchTrust] = useState<MatchTrust | null>(null);

  const updateStep1 = (k: string, v: string) => setStep1((p) => ({ ...p, [k]: v }));
  const updateStep2 = (k: string, v: string) => setStep2((p) => ({ ...p, [k]: v }));
  const updateStep3 = (k: string, v: string) => setStep3((p) => ({ ...p, [k]: v }));
  const updateStep4 = (k: string, v: string | boolean) => setStep4((p) => ({ ...p, [k]: v }));

  const canProceedStep1 =
    step1.firstName.trim().length >= 2 &&
    step1.lastName.trim().length >= 2 &&
    !!step1.dob &&
    validateEmailFormat(step1.email) &&
    validateAuMobile(step1.mobile);
  const canProceedStep2 =
    !!step2.role &&
    !!step2.facility &&
    validateAhpra(step2.ahpra) &&
    (SENIOR_NURSING_ROLES.has(step2.role) || !step2.mpn.trim() || validateMpn(step2.mpn));
  const canProceedStep3 =
    step3.practiceName.trim().length > 0 &&
    step3.practiceName.trim().length <= MAX_PRACTICE_NAME &&
    step3.suburb.trim().length > 0 &&
    validatePostcode(step3.postcode) &&
    matchTrust !== null;
  const canProceedStep4 =
    passwordValid(step4.password) &&
    step4.password === step4.confirmPassword &&
    step4.agreeTerms &&
    step4.agreePrivacy;

  const canProceed =
    step === 1 ? canProceedStep1 :
    step === 2 ? canProceedStep2 :
    step === 3 ? canProceedStep3 :
    canProceedStep4;

  const handleNext = () => {
    if (step === 1 && !canProceedStep1) { setStep1Attempted(true); return; }
    if (step === 2 && !canProceedStep2) { setStep2Attempted(true); return; }
    if (step === 3 && !canProceedStep3) { setStep3Attempted(true); return; }
    if (step === 4 && !canProceedStep4) { setStep4Attempted(true); return; }

    if (step < 4) {
      setStep1Attempted(false);
      setStep2Attempted(false);
      setStep3Attempted(false);
      setStep4Attempted(false);
      setStep((s) => s + 1);
    } else {
      const fieldsToCheck = [
        step1.firstName, step1.lastName, step1.email, step1.mobile,
        step2.role, step2.facility, step2.department, step2.staffId, step2.ahpra, step2.mpn,
        step3.practiceName, step3.suburb, step3.postcode,
      ];
      let anySanitised = false;
      fieldsToCheck.forEach((f) => {
        const { wasDirty } = sanitiseInput(f);
        if (wasDirty) anySanitised = true;
      });
      if (anySanitised) setSanitisedWarning(true);

      const now = Date.now();
      const recent = submitTimes.filter((t) => now - t < 15_000);
      const updated = [...recent, now];
      setSubmitTimes(updated);
      if (updated.length >= 3 && !captchaVerified) {
        setShowCaptcha(true);
        return;
      }
      setScreen("email_verification");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
    else { setStep1Attempted(false); setScreen("idp"); }
  };

  const handleIdpEmailCreate = () => {
    setSelectedIdp("email");
    setStep(1);
    setStep1Attempted(false);
    setStep2Attempted(false);
    setScreen("wizard");
  };

  const handleSocialSuccess = (provider: "google" | "apple") => {
    setSelectedIdp(provider);
    const claims = IDP_TOKEN_CLAIMS[provider];
    setStep1((p) => ({
      ...p,
      email:     claims?.email     ?? p.email,
      firstName: claims?.firstName ?? p.firstName,
      lastName:  claims?.lastName  ?? p.lastName,
    }));
    setStep(1);
    setStep1Attempted(false);
    setScreen("wizard");
  };

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
              {screen === "intro" ? (
                <IntroScreen onStart={() => setScreen("idp")} />
              ) : screen === "idp" ? (
                <IdpSelectScreen
                  onEmailCreate={handleIdpEmailCreate}
                  onBack={() => setScreen("intro")}
                  onSocialSuccess={handleSocialSuccess}
                  onForgotPassword={() => setScreen("forgot_password")}
                />
              ) : screen === "email_verification" ? (
                <EmailVerificationScreen
                  email={step1.email}
                  firstName={step1.firstName}
                  onSuccess={() => setScreen("success")}
                  onBack={() => navigate("/login")}
                />
              ) : screen === "forgot_password" ? (
                <ForgotPasswordScreen
                  onBack={() => setScreen("intro")}
                  onSignIn={() => navigate("/login")}
                />
              ) : screen === "success" ? (
                <div className="flex flex-col items-center text-center gap-4 py-4">
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      backgroundColor: "#E5F6E6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BadgeCheck size={36} color="#008A07" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 style={{ color: "#22272B", marginBottom: 8, fontSize: 18, fontWeight: 700 }}>
                      Email verified — Registration complete
                    </h3>
                    <p style={{ fontSize: 14, color: "#22272B", lineHeight: 1.6, maxWidth: 340 }}>
                      Thank you, <strong>{step1.firstName}</strong>. Your email has been confirmed
                      and your registration is pending administrator approval.
                      {matchTrust === "no_match" && (
                        <> Your account has been flagged for{" "}
                          <strong>manual practitioner verification</strong>.</>
                      )}
                    </p>
                  </div>

                  <div style={{
                    width: "100%", backgroundColor: "#F2F4F8",
                    borderRadius: 8, padding: "14px 18px", textAlign: "left",
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#6D7579", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                      Account status
                    </p>
                    {[
                      { label: "Registration submitted", done: true },
                      { label: "Email verified", done: true },
                      { label: "Ready for Identity Proofing", done: true },
                      { label: "Administrator approval", done: false },
                      { label: "Account active", done: false },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                          backgroundColor: item.done ? "#008A07" : "#E4E7EB",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {item.done
                            ? <Check size={11} color="#ffffff" strokeWidth={3} />
                            : <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#9BA1A6" }} />
                          }
                        </div>
                        <span style={{ fontSize: 12, color: item.done ? "#22272B" : "#9BA1A6", fontWeight: item.done ? 600 : 400 }}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid #E4E7EB", width: "100%", paddingTop: 16 }}>
                    <p style={{ fontSize: 13, color: "#6D7579", marginBottom: 12 }}>
                      Approval typically takes 1–2 business days. A confirmation has been sent to{" "}
                      <strong>{step1.email}</strong>.
                    </p>
                    <a
                      href="https://nap-mono-25794994.figma.site/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        padding: "11px 28px",
                        backgroundColor: "#002664",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "'Public Sans', sans-serif",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
                    >
                      Return to sign in
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h3
                    style={{
                      color: "#22272B",
                      marginBottom: 4,
                      fontSize: 18,
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    Create your account
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6D7579",
                      textAlign: "center",
                      marginBottom: 20,
                    }}
                  >
                    Step {step} of {STEPS.length} —{" "}
                    {step === 3 ? "Practice Details & Matching" : STEPS[step - 1].label}
                  </p>

                  <StepIndicator current={step} />

                  {step === 1 && (
                    <StepOne
                      data={step1}
                      onChange={updateStep1}
                      idp={selectedIdp}
                      submitAttempted={step1Attempted}
                    />
                  )}
                  {step === 2 && (
                    <StepTwo
                      data={step2}
                      onChange={updateStep2}
                      submitAttempted={step2Attempted}
                    />
                  )}
                  {step === 3 && (
                    <StepPractice
                      data={step3}
                      onChange={updateStep3}
                      submitAttempted={step3Attempted}
                      ahpra={step2.ahpra}
                      mpn={step2.mpn}
                      role={step2.role}
                      firstName={step1.firstName}
                      lastName={step1.lastName}
                      onMatchResult={(trust) => setMatchTrust(trust)}
                    />
                  )}
                  {step === 4 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {matchTrust && (
                        <div style={{
                          border: `1.5px solid ${matchTrust === "no_match" ? "#C95000" : "#008A07"}`,
                          borderRadius: 8,
                          padding: "10px 14px",
                          backgroundColor: matchTrust === "no_match" ? "#FFF3E0" : "#E5F6E6",
                          display: "flex", alignItems: "center", gap: 10,
                        }}>
                          {matchTrust === "no_match"
                            ? <AlertTriangle size={16} color="#C95000" strokeWidth={2} style={{ flexShrink: 0 }} />
                            : <ShieldCheck size={16} color="#008A07" strokeWidth={2} style={{ flexShrink: 0 }} />
                          }
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontSize: 12, fontWeight: 700,
                              color: matchTrust === "no_match" ? "#7D3700" : "#005C05",
                              marginBottom: 1,
                            }}>
                              {matchTrust === "no_match"
                                ? "No Match — Manual Review Required"
                                : `Practitioner verified — ${matchTrust === "mpn_full" ? "MPN + AHPRA" : matchTrust === "senior_nursing" ? "Senior Nursing" : "AHPRA only"}`}
                            </p>
                            <p style={{
                              fontSize: 11,
                              color: matchTrust === "no_match" ? "#7D3700" : "#005C05",
                              margin: 0,
                            }}>
                              {step1.firstName} {step1.lastName} · {step2.ahpra} · {step3.practiceName}
                            </p>
                          </div>
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: "#ffffff",
                            backgroundColor: matchTrust === "no_match" ? "#C95000" : "#008A07",
                            padding: "1px 7px", borderRadius: 4,
                          }}>
                            {matchTrust === "no_match" ? "MANUAL REVIEW" : "MATCHED"}
                          </span>
                        </div>
                      )}
                      <StepThree data={step4} onChange={updateStep4} submitAttempted={step4Attempted} />
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={handleBack}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#ffffff",
                        color: "#002664",
                        border: "1.5px solid #002664",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "'Public Sans', sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#002664";
                        e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.color = "#002664";
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      style={{
                        padding: "10px 24px",
                        backgroundColor: canProceed ? "#002664" : "#E4E7EB",
                        color: canProceed ? "#ffffff" : "#9BA1A6",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "'Public Sans', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (canProceed)
                          e.currentTarget.style.backgroundColor = "#00173D";
                      }}
                      onMouseLeave={(e) => {
                        if (canProceed)
                          e.currentTarget.style.backgroundColor = "#002664";
                      }}
                    >
                      {step === 4 ? "Submit registration" : "Continue"}
                      {step < 4 && <ChevronRight size={16} strokeWidth={2.5} />}
                    </button>
                  </div>

                  <div
                    className="flex justify-center mt-5 pt-4"
                    style={{ borderTop: "1px solid #E4E7EB" }}
                  >
                    <span style={{ fontSize: 13, color: "#6D7579" }}>
                      Already have an account?{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/login");
                        }}
                        style={{ color: "#002664", textDecoration: "none", fontWeight: 600 }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.textDecoration = "underline")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.textDecoration = "none")
                        }
                      >
                        Sign in
                      </a>
                    </span>
                  </div>
                </>
              )}
            </div>

            {screen === "wizard" && (
              <div className="flex justify-center gap-4 mt-3 text-xs">
                <a
                  href="#"
                  style={{ color: "#002664", textDecoration: "none", fontWeight: 600 }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  Getting started
                </a>
                <span style={{ color: "#CDD3D6" }}>•</span>
                <a
                  href="#"
                  style={{ color: "#002664", textDecoration: "none", fontWeight: 600 }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  Terms and conditions
                </a>
              </div>
            )}
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

        {/* US-SR-10: Rate-limit CAPTCHA overlay */}
        {showCaptcha && (
          <MockCaptcha
            onVerified={() => {
              setShowCaptcha(false);
              setCaptchaVerified(true);
              setScreen("email_verification");
            }}
            onDismiss={() => setShowCaptcha(false)}
          />
        )}

        {/* US-SR-10: Sanitisation toast */}
        {sanitisedWarning && (
          <div
            style={{
              position: "fixed", bottom: 96, left: "50%", transform: "translateX(-50%)",
              backgroundColor: "#22272B", color: "#ffffff",
              borderRadius: 8, padding: "10px 18px",
              fontSize: 12, fontWeight: 500, zIndex: 1500,
              display: "flex", alignItems: "center", gap: 8,
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)", maxWidth: 420, textAlign: "center",
            }}
          >
            <ShieldCheck size={15} color="#4ADE80" strokeWidth={2} style={{ flexShrink: 0 }} />
            <span>US-SR-10: Potentially harmful characters were detected and sanitised before submission. Event logged.</span>
            <button
              onClick={() => setSanitisedWarning(false)}
              style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", padding: 0, marginLeft: 4 }}
            >✕</button>
          </div>
        )}

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
