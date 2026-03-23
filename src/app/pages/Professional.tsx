import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronRight, BadgeCheck, Ban, Info } from "lucide-react";
import { Layout } from "../components/shared/Layout";
import { StepIndicator } from "../components/shared/StepIndicator";
import {
  FieldLabel, TextInput, SelectInput, InlineError,
} from "../components/shared/FormComponents";
import {
  ROLES_LIST, AHPRA_PREFIXES, FACILITIES, SENIOR_NURSING_ROLES,
} from "../components/shared/constants";
import { validateAhpra, validateMpn } from "../components/shared/validation";

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

export function ProfessionalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = (location.state as Record<string, string | null> | null) ?? {};

  const [role, setRole] = useState((incoming.role as string | undefined) ?? "Medical Officer");
  const [facility, setFacility] = useState((incoming.facility as string | undefined) ?? "Royal Prince Alfred Hospital (RPAH)");
  const [department, setDepartment] = useState((incoming.department as string | undefined) ?? "Oncology");
  const [staffId, setStaffId] = useState((incoming.staffId as string | undefined) ?? "NSW123456");
  const [ahpra, setAhpra] = useState((incoming.ahpra as string | undefined) ?? "MED0001234567");
  const [mpn, setMpn] = useState((incoming.mpn as string | undefined) ?? "2123456A");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const touch = (f: string) => setTouched((p) => ({ ...p, [f]: true }));
  const show = (f: string) => touched[f] || submitAttempted;

  const isSeniorNursing = SENIOR_NURSING_ROLES.has(role);

  const errors: Record<string, string> = {};
  if (!role) errors.role = "Please select your role.";
  if (!facility) errors.facility = "Please select your primary facility.";
  if (!ahpra.trim()) {
    errors.ahpra = "AHPRA Registration Number is required.";
  } else if (!validateAhpra(ahpra)) {
    errors.ahpra = "Invalid format — must be 3 letters + 10 digits (e.g. MED0001234567).";
  }
  if (mpn.trim() && !isSeniorNursing && !validateMpn(mpn)) {
    errors.mpn = "Invalid Medicare Provider Number — expected format: digits + letter (e.g. 2123456A).";
  }

  const canProceed =
    !!role &&
    !!facility &&
    validateAhpra(ahpra) &&
    (isSeniorNursing || !mpn.trim() || validateMpn(mpn));

  const handleRoleChange = (v: string) => {
    setRole(v);
    if (SENIOR_NURSING_ROLES.has(v)) setMpn("N/A");
    else if (mpn === "N/A") setMpn("");
  };

  const handleNext = () => {
    if (!canProceed) { setSubmitAttempted(true); return; }
    navigate("/register/practice", {
      state: {
        ...incoming,
        role,
        facility,
        department,
        staffId,
        ahpra,
        mpn,
      },
    });
  };

  const handleBack = () =>
    navigate("/register/your-details", { state: incoming });

  const inputStyleBase: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    fontSize: 14,
    color: "#9BA1A6",
    backgroundColor: "#F2F4F8",
    border: "1px solid #CDD3D6",
    borderRadius: 6,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'Public Sans', sans-serif",
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "default",
    userSelect: "none" as const,
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <StepIndicator current={2} />

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
            Professional Information
          </h3>
          <p style={{ fontSize: 13, color: "#6D7579" }}>Step 2 of 4 — Role, facility &amp; credentials</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <div>
            <FieldLabel htmlFor="role" required>Role / Position</FieldLabel>
            <SelectInput
              id="role"
              value={role}
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
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, fontSize: 12, color: "#6D7579" }}>
                <Info size={12} color="#6D7579" strokeWidth={2} />
                Senior Nursing role — Medicare Provider Number not required.
              </div>
            )}
          </div>

          <div>
            <FieldLabel htmlFor="facility" required>Primary facility</FieldLabel>
            <SelectInput
              id="facility"
              value={facility}
              onChange={setFacility}
              onBlur={() => touch("facility")}
              hasError={!!(show("facility") && errors.facility)}
            >
              <option value="">Select a facility…</option>
              {FACILITIES.map((f) => (
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
              value={ahpra}
              onChange={(v) => setAhpra(v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 13))}
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
                {validateAhpra(ahpra) && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 11, fontWeight: 700, color: "#008A07", marginTop: 5,
                  }}>
                    <BadgeCheck size={12} color="#008A07" strokeWidth={2.5} /> Valid
                  </span>
                )}
              </div>
            )}
            <AhpraPrefixBadge value={ahpra} />
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
              <div style={inputStyleBase}>
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
                value={mpn}
                onChange={(v) => setMpn(v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 9))}
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
                Provide your MPN if you have one. Format validated on entry.
              </p>
            )}

            {!isSeniorNursing && mpn.trim() && validateMpn(mpn) && (
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
                value={department}
                onChange={setDepartment}
              />
            </div>

            <div>
              <FieldLabel htmlFor="staffId">Staff / Employee ID</FieldLabel>
              <TextInput
                id="staffId"
                placeholder="e.g. NSW123456"
                value={staffId}
                onChange={setStaffId}
              />
              <p style={{ fontSize: 12, color: "#6D7579", marginTop: 5 }}>
                Providing your staff ID speeds up account verification.
              </p>
            </div>
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
