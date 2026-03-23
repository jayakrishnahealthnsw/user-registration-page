// Clean password rule labels (no special/corrupted characters)
export const CLEAN_PW_RULES = [
  { label: "At least 8 characters",  test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Lowercase letter (a-z)", test: (p: string) => /[a-z]/.test(p) },
  { label: "Number (0-9)",           test: (p: string) => /[0-9]/.test(p) },
  { label: "Special character",      test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function passwordIsValid(pw: string) {
  return CLEAN_PW_RULES.every((r) => r.test(pw));
}
