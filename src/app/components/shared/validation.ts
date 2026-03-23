import { CLEAN_PW_RULES } from "../PwRules";

export function validateEmailFormat(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateAuMobile(mobile: string) {
  const cleaned = mobile.replace(/[\s\-()]/g, "");
  return /^(04\d{8}|\+614\d{8}|614\d{8})$/.test(cleaned);
}

// AHPRA: 3 uppercase letters + 10 digits (e.g. MED0001234567)
export function validateAhpra(value: string) {
  return /^[A-Za-z]{3}\d{10}$/.test(value.trim());
}

// Medicare Provider Number: 6 digits + 1 letter + 1 check digit (e.g. 2123456A)
export function validateMpn(value: string) {
  return /^\d{4,8}[A-Za-z]\d?$/.test(value.trim());
}

export function validatePostcode(p: string) {
  return /^\d{4}$/.test(p.trim());
}

export function passwordValid(pw: string) {
  return CLEAN_PW_RULES.every((r) => r.test(pw));
}

// US-SR-10: Input sanitisation helper
const DANGEROUS_PATTERN = /(<script[\s\S]*?<\/script>|<[^>]+>|javascript:|SELECT\s|INSERT\s|DROP\s|DELETE\s|UPDATE\s)/gi;

export function sanitiseInput(raw: string): { clean: string; wasDirty: boolean } {
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
