# PathWorks Registration - Page-Based Implementation Guide

## Overview
This document guides developers through the page-based registration flow structure. Each step has its own URL and component file for better code organization.

## File Structure

```
/src/app/
├── App.tsx                          # Main router configuration
├── pages/
│   ├── Home.tsx                     # /  (Intro/landing)
│   ├── SelectProvider.tsx           # /select-provider (IDP selection)
│   ├── register/
│   │   ├── YourDetails.tsx          # /register/your-details (Step 1)
│   │   ├── Professional.tsx         # /register/professional (Step 2)
│   │   ├── Practice.tsx             # /register/practice (Step 3)
│   │   ├── Security.tsx             # /register/security (Step 4)
│   │   ├── VerifyEmail.tsx          # /register/verify-email
│   │   └── Success.tsx              # /register/success
│   └── ForgotPassword.tsx           # /forgot-password
├── components/
│   ├── shared/
│   │   ├── Layout.tsx               # Common page layout with header/footer/chatbot
│   │   ├── FormComponents.tsx       # TextInput, PasswordInput, SelectInput, etc.
│   │   ├── StepIndicator.tsx        # Progress indicator for steps 1-4
│   │   ├── PasswordStrength.tsx     # Password strength meter component
│   │   ├── validation.ts            # Validation functions
│   │   └── constants.ts             # Shared constants
│   ├── ChatbotBubble.tsx            # Existing chatbot component
│   └── PwRules.ts                   # Password rules (existing)
```

## URL Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Intro/landing screen explaining registration |
| `/select-provider` | `SelectProviderPage` | Choose Google/Apple/Email |
| `/register/your-details` | `YourDetailsPage` | Step 1: Personal information |
| `/register/professional` | `ProfessionalPage` | Step 2: Role, AHPRA, MPN, facility |
| `/register/practice` | `PracticeDetailsPage` | Step 3: Practice name, location + matching |
| `/register/security` | `SecurityPage` | Step 4: Password + agreements |
| `/register/verify-email` | `VerifyEmailPage` | Email verification flow |
| `/register/success` | `SuccessPage` | Registration complete |
| `/forgot-password` | `ForgotPasswordPage` | Password reset flow |

## State Management

### Using React Router's Location State

Data is passed between pages using `useNavigate(path, { state: {...} })` and retrieved with `useLocation()`.

Example flow:
1. User selects "Google" on `/select-provider`
2. Page navigates to `/register/your-details` with state: `{ idp: "google", email: "...", firstName: "...", lastName: "..." }`
3. YourDetailsPage reads this state and pre-fills fields
4. User submits Step 1, navigates to `/register/professional` with all accumulated state
5. This continues through all steps

### State Shape (passed through navigation)

```typescript
interface RegistrationState {
  // IDP
  idp?: "email" | "google" | "apple";
  
  // Step 1
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  mobile?: string;
  
  // Step 2
  role?: string;
  facility?: string;
  department?: string;
  staffId?: string;
  ahpra?: string;
  mpn?: string;
  
  // Step 3
  practiceName?: string;
  suburb?: string;
  postcode?: string;
  matchTrust?: "mpn_full" | "ahpra_only" | "senior_nursing" | "no_match";
  
  // Step 4
  password?: string;
  confirmPassword?: string;
  agreeTerms?: boolean;
  agreePrivacy?: boolean;
}
```

## Implementation Steps for Each Page

### 1. Create Page Component Files

Each page needs:
- Layout wrapper
- Form state management
- Validation logic
- Navigation handlers (Back / Continue)

#### YourDetailsPage.tsx Structure
```typescript
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Layout } from "../components/shared/Layout";
import { StepIndicator } from "../components/shared/StepIndicator";
import { TextInput, SelectInput, FieldLabel, InlineError } from "../components/shared/FormComponents";
import { validateEmailFormat, validateAuMobile } from "../components/shared/validation";
import { MONTHS, getDaysInMonth, DOB_MIN_YEAR, DOB_MAX_YEAR } from "../components/shared/constants";

export function YourDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  
  // Local form state
  const [formData, setFormData] = useState({
    firstName: state.firstName || "Jane", // Pre-seed for dev
    lastName: state.lastName || "Smith",
    dob: state.dob || "1985-03-22",
    email: state.email || "jane.smith@health.nsw.gov.au",
    mobile: state.mobile || "0412 345 678",
  });
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  
  // Validation
  const errors = validateStep1(formData);
  const canProceed = Object.keys(errors).length === 0;
  
  // Handlers
  const handleNext = () => {
    if (!canProceed) {
      setSubmitAttempted(true);
      return;
    }
    navigate("/register/professional", {
      state: { ...state, ...formData },
    });
  };
  
  const handleBack = () => {
    navigate("/select-provider");
  };
  
  return (
    <Layout>
      <h3 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
        Create your account
      </h3>
      <p style={{ textAlign: "center", fontSize: 13, color: "#6D7579", marginBottom: 20 }}>
        Step 1 of 4 — Your details
      </p>
      
      <StepIndicator current={1} />
      
      {/* Form fields go here */}
      
      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={handleBack} {...backButtonStyles}>Back</button>
        <button onClick={handleNext} disabled={!canProceed} {...nextButtonStyles}>Continue</button>
      </div>
      
      {/* Sign in link */}
      <div className="flex justify-center mt-5 pt-4" style={{ borderTop: "1px solid #E4E7EB" }}>
        <span style={{ fontSize: 13, color: "#6D7579" }}>
          Already have an account?{" "}
          <a href="https://nap-mono-25794994.figma.site/login" target="_blank" rel="noopener noreferrer">
            Sign in
          </a>
        </span>
      </div>
    </Layout>
  );
}
```

### 2. Update App.tsx Router

```typescript
import { RouterProvider, createBrowserRouter } from "react-router";
import { HomePage } from "./pages/Home";
import { SelectProviderPage } from "./pages/SelectProvider";
import { YourDetailsPage } from "./pages/register/YourDetails";
import { ProfessionalPage } from "./pages/register/Professional";
import { PracticeDetailsPage } from "./pages/register/Practice";
import { SecurityPage } from "./pages/register/Security";
import { VerifyEmailPage } from "./pages/register/VerifyEmail";
import { SuccessPage } from "./pages/register/Success";
import { ForgotPasswordPage } from "./pages/ForgotPassword";

const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/select-provider", Component: SelectProviderPage },
  { path: "/register/your-details", Component: YourDetailsPage },
  { path: "/register/professional", Component: ProfessionalPage },
  { path: "/register/practice", Component: PracticeDetailsPage },
  { path: "/register/security", Component: SecurityPage },
  { path: "/register/verify-email", Component: VerifyEmailPage },
  { path: "/register/success", Component: SuccessPage },
  { path: "/forgot-password", Component: ForgotPasswordPage },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

## Shared Components Already Created

✅ **Layout.tsx** - Wraps all pages with header, footer, and chatbot
✅ **FormComponents.tsx** - TextInput, PasswordInput, SelectInput, FieldLabel, InlineError, ReadOnlyField
✅ **StepIndicator.tsx** - Progress indicator for 4-step wizard
✅ **PasswordStrength.tsx** - Password strength visualization
✅ **validation.ts** - All validation functions
✅ **constants.ts** - ROLES_LIST, FACILITIES, AHPRA_PREFIXES, etc.
✅ **PwRules.ts** - Password rules (no corrupted characters)
✅ **ChatbotBubble.tsx** - Existing chatbot component

## Pages Already Created

✅ **HomePage.tsx** (`/`)
✅ **SelectProviderPage.tsx** (`/select-provider`)

## Remaining Pages to Create

### /register/your-details (YourDetailsPage.tsx)
- Fields: firstName, lastName, DOB (3 dropdowns), email, mobile
- Validation: Required, email format, mobile format, age 18+
- IDP pre-fill: If from Google/Apple, lock email and pre-fill name

### /register/professional (ProfessionalPage.tsx)
- Fields: role, facility, ahpra, mpn (optional), department (optional), staffId (optional)
- Validation: AHPRA format (3 letters + 10 digits), MPN format if provided
- Logic: If senior nursing role selected, disable MPN field

### /register/practice (PracticeDetailsPage.tsx)
- Fields: practiceName, suburb, postcode
- Real-time matching: As fields are filled, show "Matching..." spinner then "Matched" or "No Match"
- Pass matchTrust result to next page

### /register/security (SecurityPage.tsx)
- Fields: password, confirmPassword, agreeTerms, agreePrivacy
- Show match result banner at top
- Password strength meter
- Final submit triggers sanitization check, rate limiting, then navigates to verify-email

### /register/verify-email (VerifyEmailPage.tsx)
- Shows email sent confirmation
- Resend button with 60s cooldown
- DEV buttons to simulate link clicked / link expired
- "Link expired" state with request new link

### /register/success (SuccessPage.tsx)
- Confirmation message with user's name
- Account status checklist
- "Return to sign in" button

### /forgot-password (ForgotPasswordPage.tsx)
- Multi-state flow: enter_email → email_sent → new_password → complete
- Same neutral confirmation pattern as registration

## Development Tips

1. **Start with one page at a time** - Copy structure from HomePage or SelectProviderPage
2. **Test navigation flow** - Ensure state is passed correctly between pages
3. **Use browser devtools** - Check React Router state in Components tab
4. **Pre-seed form data** - Keep test data for faster development iteration
5. **Reuse shared components** - Don't duplicate form input logic

## Testing Checklist

- [ ] All routes load without errors
- [ ] State persists across page navigation
- [ ] Back button returns to previous page with data intact
- [ ] Form validation works on each page
- [ ] Step indicator shows correct step
- [ ] Chatbot opens/closes correctly on all pages
- [ ] IDP flow pre-fills data correctly
- [ ] Sanitization warning appears only on final submit
- [ ] Email verification flow works
- [ ] Success page displays correctly

## Next Steps

To complete the implementation:

1. Create the 6 remaining page components listed above
2. Copy form logic from the original `RegisterPage.tsx`
3. Replace screen state with navigation
4. Test the complete flow end-to-end
5. Remove the old `RegisterPage.tsx` file once migration is complete
