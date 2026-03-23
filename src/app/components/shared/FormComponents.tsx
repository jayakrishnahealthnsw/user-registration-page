import React, { useState } from "react";
import { Eye, EyeOff, Lock, AlertTriangle } from "lucide-react";

export const inputStyle: React.CSSProperties = {
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

export function FieldLabel({
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

export function TextInput({
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

export function SelectInput({
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

export function PasswordInput({
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

export function InlineError({ message }: { message: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
      <AlertTriangle size={12} color="#D7153A" strokeWidth={2.5} style={{ flexShrink: 0 }} />
      <p style={{ fontSize: 12, color: "#D7153A", margin: 0, lineHeight: 1.4 }}>{message}</p>
    </div>
  );
}

export function ReadOnlyField({
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
      {label && <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>}
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
