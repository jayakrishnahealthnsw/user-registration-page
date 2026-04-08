import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronRight, Check } from "lucide-react";
import { Layout } from "../components/shared/Layout";
import { StepIndicator } from "../components/shared/StepIndicator";
import {
  FieldLabel, TextInput, SelectInput,
  InlineError, ReadOnlyField,
} from "../components/shared/FormComponents";
import {
  MONTHS, getDaysInMonth,
  CURRENT_YEAR, DOB_MIN_YEAR, DOB_MAX_YEAR,
} from "../components/shared/constants";
import { validateEmailFormat, validateAuMobile } from "../components/shared/validation";

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

export function YourDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = (location.state as Record<string, string | null> | null) ?? {};

  const idp = (incoming.idp as "email" | "nsw" | "google" | "apple" | null) ?? null;
  const isEmailLocked = idp === "google" || idp === "apple" || idp === "nsw";
  const isNswLocked = idp === "nsw";
  const hideDob = isEmailLocked || idp === "email";
  const providerName = idp === "google" ? "Google" : idp === "apple" ? "Apple" : idp === "nsw" ? "@health.nsw.gov.au" : undefined;

  // Seed with test data (IDP values override if present)
  const [firstName, setFirstName] = useState(
    incoming.firstName ?? "Jane",
  );
  const [lastName, setLastName] = useState(
    incoming.lastName ?? "Smith",
  );
  const [email, setEmail] = useState(
    incoming.email ?? "jane.smith@health.nsw.gov.au",
  );
  const [mobile, setMobile] = useState(
    (incoming.mobile as string | undefined) ?? "0412 345 678",
  );

  // DOB initialised from state if back-navigated
  const savedDob = (incoming.dob as string | undefined) ?? "1985-03-22";
  const parsedDob = savedDob ? savedDob.split("-") : ["", "", ""];
  const [dobYear, setDobYear] = useState(parsedDob[0] ?? "");
  const [dobMonth, setDobMonth] = useState(parsedDob[1] ?? "");
  const [dobDay, setDobDay] = useState(parsedDob[2] ?? "");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const getDob = (d: string, m: string, y: string) =>
    d && m && y ? `${y}-${m}-${d}` : "";
  const dob = getDob(dobDay, dobMonth, dobYear);

  const touch = (f: string) => setTouched((p) => ({ ...p, [f]: true }));
  const show = (f: string) => touched[f] || submitAttempted;

  const errors: Record<string, string> = {};
  if (!firstName.trim()) errors.firstName = "First name is required.";
  else if (firstName.trim().length < 2) errors.firstName = "Must be at least 2 characters.";
  if (!lastName.trim()) errors.lastName = "Last name is required.";
  else if (lastName.trim().length < 2) errors.lastName = "Must be at least 2 characters.";
  if (!hideDob) {
    if (!dob) {
      errors.dob = "Date of birth is required.";
    } else {
      const d = new Date(dob);
      if (isNaN(d.getTime())) errors.dob = "Enter a valid date.";
      else {
        const age = CURRENT_YEAR - d.getFullYear();
        if (age < 18) errors.dob = "You must be at least 18 years old.";
        else if (age > 100) errors.dob = "Please enter a valid date of birth.";
      }
    }
  }
  if (!email.trim()) errors.email = "Work email address is required.";
  else if (!validateEmailFormat(email)) errors.email = "Enter a valid email address (e.g. name@health.nsw.gov.au).";
  if (!mobile.trim()) errors.mobile = "Mobile number is required.";
  else if (!validateAuMobile(mobile)) errors.mobile = "Enter a valid Australian mobile (e.g. 0412 345 678).";

  const canProceed =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    (hideDob || !!dob) &&
    validateEmailFormat(email) &&
    validateAuMobile(mobile);

  const daysInMonth = dobMonth && dobYear
    ? getDaysInMonth(parseInt(dobMonth), parseInt(dobYear))
    : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const years = Array.from(
    { length: DOB_MAX_YEAR - DOB_MIN_YEAR + 1 },
    (_, i) => DOB_MAX_YEAR - i,
  );

  const handleNext = () => {
    if (!canProceed) { setSubmitAttempted(true); return; }
    navigate("/register/professional", {
      state: {
        ...incoming,
        idp,
        firstName,
        lastName,
        dob,
        email,
        mobile,
      },
    });
  };

  const handleBack = () => navigate("/select-provider");

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <StepIndicator current={1} />

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
            Your Details
          </h3>
          <p style={{ fontSize: 13, color: "#6D7579" }}>Step 1 of 4 — Personal &amp; contact information</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

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
              {isNswLocked ? (
                <ReadOnlyField id="firstName" label="" value={firstName} required={false} />
              ) : (
                <>
                  <TextInput
                    id="firstName"
                    placeholder="e.g. Jane"
                    value={firstName}
                    onChange={setFirstName}
                    autoComplete="given-name"
                    onBlur={() => touch("firstName")}
                    hasError={!!(show("firstName") && errors.firstName)}
                  />
                  {show("firstName") && errors.firstName && <InlineError message={errors.firstName} />}
                </>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <FieldLabel htmlFor="lastName" required>Last name</FieldLabel>
              {isNswLocked ? (
                <ReadOnlyField id="lastName" label="" value={lastName} required={false} />
              ) : (
                <>
                  <TextInput
                    id="lastName"
                    placeholder="e.g. Smith"
                    value={lastName}
                    onChange={setLastName}
                    autoComplete="family-name"
                    onBlur={() => touch("lastName")}
                    hasError={!!(show("lastName") && errors.lastName)}
                  />
                  {show("lastName") && errors.lastName && <InlineError message={errors.lastName} />}
                </>
              )}
            </div>
          </div>

          {!hideDob && <div>
            <FieldLabel htmlFor="dobDay" required>Date of birth</FieldLabel>
            <div style={{ display: "flex", gap: 8 }}>
              <SelectInput
                id="dobDay"
                value={dobDay}
                hasError={!!(show("dob") && errors.dob)}
                style={{ flex: "0 0 80px", minWidth: 0 }}
                onChange={(v) => { setDobDay(v); touch("dob"); }}
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
                  const newMax = getDaysInMonth(parseInt(v), parseInt(dobYear) || 2000);
                  const adj = dobDay && parseInt(dobDay) > newMax
                    ? String(newMax).padStart(2, "0")
                    : dobDay;
                  if (adj !== dobDay) setDobDay(adj);
                  setDobMonth(v);
                  touch("dob");
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
                onChange={(v) => { setDobYear(v); touch("dob"); }}
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
          </div>}

          <div>
            <FieldLabel htmlFor="email" required>Work email address</FieldLabel>
            {isEmailLocked ? (
              <ReadOnlyField
                id="email"
                label=""
                value={email}
                providerBadge={providerName}
                required={false}
              />
            ) : (
              <div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="e.g. jane.smith@health.nsw.gov.au"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  onBlur={() => touch("email")}
                  hasError={!!(show("email") && errors.email)}
                />
                {show("email") && errors.email
                  ? <InlineError message={errors.email} />
                  : <p style={{ fontSize: 12, color: "#6D7579", marginTop: 5 }}>Use your @health.nsw.gov.au address for faster approval.</p>
                }
              </div>
            )}
          </div>

          <div>
            <FieldLabel htmlFor="mobile" required>Mobile number</FieldLabel>
            <TextInput
              id="mobile"
              type="tel"
              placeholder="e.g. 0412 345 678"
              value={mobile}
              onChange={setMobile}
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
            onClick={handleNext}
            style={NEXT_BTN}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00173D")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#002664")}
          >
            Continue
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </Layout>
  );
}