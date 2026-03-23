export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export const CURRENT_YEAR = new Date().getFullYear();
export const DOB_MIN_YEAR = CURRENT_YEAR - 100;
export const DOB_MAX_YEAR = CURRENT_YEAR - 18;

export const MAX_PRACTICE_NAME = 100;

export const SENIOR_NURSING_ROLES = new Set([
  "Registered Nurse (RN)",
  "Enrolled Nurse (EN)",
  "Clinical Nurse Specialist (CNS)",
  "Nurse Unit Manager (NUM)",
]);

export const ROLES_LIST = [
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

export const AHPRA_PREFIXES: Record<string, string> = {
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

export const FACILITIES = [
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

export const IDP_TOKEN_CLAIMS: Record<string, { email: string; firstName?: string; lastName?: string }> = {
  nsw:    { email: "sarah.smith123@health.nsw.gov.au", firstName: "Sarah", lastName: "Smith" },
  google: { email: "jane.smith@gmail.com", firstName: "Jane", lastName: "Smith" },
  apple:  { email: "j.smith@icloud.com",   firstName: "Jane", lastName: "Smith" },
};
