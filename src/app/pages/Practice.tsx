import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronRight, AlertTriangle, Check, Lock, Loader2, ShieldCheck, Info } from "lucide-react";
import { Layout } from "../components/shared/Layout";
import { StepIndicator } from "../components/shared/StepIndicator";
import {
  FieldLabel, TextInput, InlineError,
} from "../components/shared/FormComponents";
import {
  MAX_PRACTICE_NAME, SENIOR_NURSING_ROLES, AHPRA_PREFIXES,
} from "../components/shared/constants";
import { validateAhpra, validateMpn, validatePostcode } from "../components/shared/validation";

type MatchTrust = "mpn_full" | "ahpra_only" | "senior_nursing" | "no_match";
type MatchStatus = "idle" | "matching" | "matched" | "no_match";

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

function MatchResultPanel({
  status, trust, firstName, lastName, ahpra, mpn,
  practiceName, suburb, isSeniorNursing, onProceedNoMatch,
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
        <div style={{ backgroundColor: "#FFF3E0", padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", backgroundColor: "#C95000",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
          }}>
            <AlertTriangle size={14} color="#ffffff" strokeWidth={2.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#7D3700" }}>No Match Found</span>
              <span style={{
                fontSize: 10, fontWeight: 700, color: "#ffffff",
                backgroundColor: "#C95000", padding: "1px 7px",
                borderRadius: 4, letterSpacing: "0.04em",
              }}>MANUAL REVIEW REQUIRED</span>
            </div>
            <p style={{ fontSize: 11, color: "#7D3700", margin: 0, lineHeight: 1.5 }}>
              {isSeniorNursing
                ? "No AHPRA record found for this Senior Nursing role without MPN. Registration can continue — NSWHP will verify manually."
                : "No record matched AHPRA, name and practice details in the NHPO register. Registration can continue — NSWHP will verify your entitlement manually."}
            </p>
          </div>
        </div>

        <div style={{ padding: "12px 16px", borderTop: "1px solid #FFD4A3", backgroundColor: "#FFFBF5" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7D3700", marginBottom: 8 }}>
            What happens next
          </p>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: "#22272B", lineHeight: 1.75 }}>
            <li>Your registration will be submitted with status <strong>"No Match – Manual Review Required"</strong></li>
            <li>This event will be logged in the audit trail with your authenticated session ID</li>
            <li>An NSWHP administrator will manually verify your practitioner entitlement</li>
            <li>You will be notified by email once your account is approved or if further information is needed</li>
          </ul>
        </div>

        <div style={{ padding: "10px 16px", borderTop: "1px solid #FFD4A3", backgroundColor: "#FFF8EC", display: "flex", alignItems: "flex-start", gap: 8 }}>
          <Info size={13} color="#C95000" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 11, color: "#7D3700", margin: 0, lineHeight: 1.5 }}>
            Compensating controls active: rate limiting · session attempt limits · full audit logging · Gov. IdP gating (future state).
          </p>
        </div>

        {trust !== "no_match" && (
          <div style={{ padding: "12px 16px", borderTop: "1px solid #FFD4A3" }}>
            <p style={{ fontSize: 12, color: "#6D7579", marginBottom: 10, lineHeight: 1.5 }}>
              You can still complete registration. NSWHP will verify your entitlement before your account is activated.
            </p>
            <button
              onClick={onProceedNoMatch}
              style={{
                width: "100%", padding: "10px 16px",
                backgroundColor: proceedHover ? "#7D3700" : "#C95000",
                color: "#ffffff", border: "none", borderRadius: 6, cursor: "pointer",
                fontSize: 13, fontWeight: 700, fontFamily: "'Public Sans', sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
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
            backgroundColor: "#FFF3E0", display: "flex", alignItems: "center", gap: 8,
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
      <div style={{ backgroundColor: "#E5F6E6", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", backgroundColor: "#008A07",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Check size={14} color="#ffffff" strokeWidth={3} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#005C05" }}>Matched — Exact</span>
            <span style={{
              fontSize: 10, fontWeight: 700, color: "#ffffff",
              backgroundColor: "#008A07", padding: "1px 7px",
              borderRadius: 4, letterSpacing: "0.04em",
            }}>{trustLabel}</span>
          </div>
          <p style={{ fontSize: 11, color: "#005C05", marginTop: 2, marginBottom: 0 }}>
            Status → "Matched - Exact" · Match event logged in audit trail.
          </p>
        </div>
        <ShieldCheck size={18} color="#008A07" strokeWidth={2} style={{ flexShrink: 0 }} />
      </div>

      <div style={{ padding: "12px 16px", borderTop: "1px solid #C3EDBA" }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6D7579", marginBottom: 10 }}>
          Verified &amp; Locked Fields
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {verifiedRows.map((row) => (
            <div key={row.label} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 10px", backgroundColor: "#F2F4F8", borderRadius: 6,
            }}>
              <Lock size={12} color="#6D7579" strokeWidth={2} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: "#6D7579", minWidth: 150, flexShrink: 0 }}>{row.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#22272B" }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {trust === "ahpra_only" && (
        <div style={{ padding: "10px 16px", borderTop: "1px solid #C3EDBA", backgroundColor: "#FFF8EC" }}>
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
              Senior Nursing role matched without MPN. Pre-fill and lock applied using AHPRA + practice details.
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

export function PracticePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = (location.state as Record<string, string | null> | null) ?? {};

  const [practiceName, setPracticeName] = useState(
    (incoming.practiceName as string | undefined) ?? "NSW Health Pathology – Camperdown",
  );
  const [suburb, setSuburb] = useState((incoming.suburb as string | undefined) ?? "Camperdown");
  const [postcode, setPostcode] = useState((incoming.postcode as string | undefined) ?? "2050");

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [matchStatus, setMatchStatus] = useState<MatchStatus>("idle");
  const [matchTrust, setMatchTrust] = useState<MatchTrust | null>(
    (incoming.matchTrust as MatchTrust | null | undefined) ?? null,
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const touch = (f: string) => setTouched((p) => ({ ...p, [f]: true }));
  const show = (f: string) => touched[f] || submitAttempted;

  const firstName = (incoming.firstName as string | undefined) ?? "Jane";
  const lastName = (incoming.lastName as string | undefined) ?? "Smith";
  const ahpra = (incoming.ahpra as string | undefined) ?? "MED0001234567";
  const mpn = (incoming.mpn as string | undefined) ?? "2123456A";
  const role = (incoming.role as string | undefined) ?? "Medical Officer";

  const isSeniorNursing = SENIOR_NURSING_ROLES.has(role);
  const hasMpn = !isSeniorNursing && validateMpn(mpn);
  const ahpraPrefix = ahpra.trim().slice(0, 3).toUpperCase();
  const ahpraRecognised = ahpraPrefix.length === 3 && ahpraPrefix in AHPRA_PREFIXES;

  const errors: Record<string, string> = {};
  if (!practiceName.trim()) errors.practiceName = "Practice name is required.";
  else if (practiceName.trim().length > MAX_PRACTICE_NAME)
    errors.practiceName = `Must not exceed ${MAX_PRACTICE_NAME} characters.`;
  if (!suburb.trim()) errors.suburb = "Suburb is required.";
  if (!postcode.trim()) errors.postcode = "Postcode is required.";
  else if (!validatePostcode(postcode)) errors.postcode = "Enter a valid 4-digit Australian postcode (e.g. 2000).";

  const allReady =
    practiceName.trim().length > 0 &&
    practiceName.trim().length <= MAX_PRACTICE_NAME &&
    suburb.trim().length > 0 &&
    validatePostcode(postcode) &&
    validateAhpra(ahpra) &&
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2;

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!allReady) {
      setMatchStatus("idle");
      setMatchTrust(null);
      return;
    }
    setMatchStatus("matching");
    setMatchTrust(null);
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
    }, 1400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceName, suburb, postcode, ahpra, firstName, lastName, role, mpn]);

  const handleProceedNoMatch = () => {
    setMatchTrust("no_match");
  };

  const canProceed =
    practiceName.trim().length > 0 &&
    practiceName.trim().length <= MAX_PRACTICE_NAME &&
    suburb.trim().length > 0 &&
    validatePostcode(postcode) &&
    (matchStatus === "matched" || matchTrust === "no_match");

  const handleNext = () => {
    if (!canProceed) { setSubmitAttempted(true); return; }
    navigate("/register/security", {
      state: {
        ...incoming,
        practiceName,
        suburb,
        postcode,
        matchTrust,
      },
    });
  };

  const handleBack = () =>
    navigate("/register/professional", { state: incoming });

  return (
    <Layout>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <StepIndicator current={3} />

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h3 style={{ color: "#22272B", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
            Practice Details
          </h3>
          <p style={{ fontSize: 13, color: "#6D7579" }}>Step 3 of 4 — Primary practice location</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <div>
            <FieldLabel htmlFor="practiceName" required>Practice name</FieldLabel>
            <TextInput
              id="practiceName"
              placeholder="e.g. NSW Health Pathology – Camperdown"
              value={practiceName}
              onChange={(v) => setPracticeName(v.slice(0, MAX_PRACTICE_NAME))}
              onBlur={() => touch("practiceName")}
              hasError={!!(show("practiceName") && errors.practiceName)}
              autoComplete="organization"
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: 4 }}>
              <div style={{ flex: 1 }}>
                {show("practiceName") && errors.practiceName
                  ? <InlineError message={errors.practiceName} />
                  : <p style={{ fontSize: 12, color: "#6D7579", margin: 0 }}>Name of your primary work location or pathology practice.</p>
                }
              </div>
              <span style={{
                fontSize: 11, flexShrink: 0, marginLeft: 8, marginTop: 1,
                color: practiceName.length > MAX_PRACTICE_NAME * 0.85 ? "#C95000" : "#9BA1A6",
              }}>
                {practiceName.length}/{MAX_PRACTICE_NAME}
              </span>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="suburb" required>Suburb</FieldLabel>
            <TextInput
              id="suburb"
              placeholder="e.g. Camperdown"
              value={suburb}
              onChange={setSuburb}
              onBlur={() => touch("suburb")}
              hasError={!!(show("suburb") && errors.suburb)}
              autoComplete="address-level2"
            />
            {show("suburb") && errors.suburb
              ? <InlineError message={errors.suburb} />
              : <p style={{ fontSize: 12, color: "#6D7579", marginTop: 4 }}>Used for practitioner matching.</p>
            }
          </div>

          <div>
            <FieldLabel htmlFor="postcode" required>Postcode</FieldLabel>
            <TextInput
              id="postcode"
              placeholder="e.g. 2050"
              value={postcode}
              onChange={(v) => setPostcode(v.replace(/\D/g, "").slice(0, 4))}
              onBlur={() => touch("postcode")}
              hasError={!!(show("postcode") && errors.postcode)}
              autoComplete="postal-code"
            />
            {show("postcode") && errors.postcode
              ? <InlineError message={errors.postcode} />
              : <p style={{ fontSize: 12, color: "#6D7579", marginTop: 4 }}>Valid Australian postcode — 4 digits (e.g. 2000).</p>
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
              practiceName={practiceName}
              suburb={suburb}
              isSeniorNursing={isSeniorNursing}
              onProceedNoMatch={handleProceedNoMatch}
            />
          )}

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
            disabled={matchStatus === "matching" || (matchStatus === "no_match" && matchTrust === null)}
            style={{
              ...NEXT_BTN,
              opacity: (matchStatus === "matching" || (matchStatus === "no_match" && matchTrust === null)) ? 0.6 : 1,
              cursor: (matchStatus === "matching" || (matchStatus === "no_match" && matchTrust === null)) ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => { if (matchStatus === "matched" || matchTrust === "no_match") e.currentTarget.style.backgroundColor = "#00173D"; }}
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