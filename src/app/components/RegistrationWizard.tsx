import { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { PasswordStrengthMeter, getPasswordStrength } from "./PasswordStrengthMeter";
import { Eye, EyeOff, CheckCircle2, ChevronDown } from "lucide-react";

const STEPS = ["Your Details", "Professional Info", "Security"];

const ROLES = [
  "Pathologist",
  "Scientist",
  "Technician",
  "Registrar",
  "Nurse",
  "Administration",
  "IT Support",
  "Other",
];

const FACILITIES = [
  "Royal Prince Alfred Hospital",
  "Westmead Hospital",
  "Concord Repatriation General Hospital",
  "Liverpool Hospital",
  "Nepean Hospital",
  "John Hunter Hospital",
  "Prince of Wales Hospital",
  "St George Hospital",
  "Other",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  facility: string;
  department: string;
  staffId: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  facility: "",
  department: "",
  staffId: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
  agreePrivacy: false,
};

export function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-+()]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.facility) newErrors.facility = "Please select a facility";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.staffId.trim()) newErrors.staffId = "Staff ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (getPasswordStrength(formData.password).score < 3) {
      newErrors.password = "Password is not strong enough";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Conditions";
    }
    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = "You must agree to the Privacy Policy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    let valid = false;
    if (currentStep === 1) valid = validateStep1();
    if (currentStep === 2) valid = validateStep2();
    if (currentStep === 3) {
      valid = validateStep3();
      if (valid) {
        setIsSubmitted(true);
        return;
      }
    }
    if (valid && currentStep < 3) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((s) => s - 1);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-[#002664] mb-3" style={{ fontSize: "1.5rem" }}>
          Registration Submitted
        </h2>
        <p className="text-gray-600 max-w-md mb-2" style={{ fontSize: "0.95rem" }}>
          Thank you, <strong>{formData.firstName}</strong>. Your registration request has been received.
        </p>
        <p className="text-gray-500 max-w-md mb-8" style={{ fontSize: "0.875rem" }}>
          A verification email has been sent to <strong>{formData.email}</strong>. 
          Please check your inbox and follow the instructions to activate your PathWorks account.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md w-full mb-6">
          <p className="text-[#002664]" style={{ fontSize: "0.875rem" }}>
            Your account will be reviewed and approved by an administrator within 1-2 business days.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
            setFormData(initialFormData);
            setErrors({});
          }}
          className="text-[#002664] underline cursor-pointer hover:text-[#001a4d]"
          style={{ fontSize: "0.875rem" }}
        >
          Return to login
        </button>
      </div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-3 py-2.5 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#002664]/30 focus:border-[#002664] ${
      errors[field] ? "border-[#D7153A] bg-red-50/50" : "border-gray-300 bg-white"
    }`;

  const selectClass = (field: keyof FormData) =>
    `w-full px-3 py-2.5 border rounded-md appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-[#002664]/30 focus:border-[#002664] bg-white ${
      errors[field] ? "border-[#D7153A] bg-red-50/50" : "border-gray-300"
    }`;

  return (
    <div className="w-full max-w-lg mx-auto">
      <StepIndicator currentStep={currentStep} steps={STEPS} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h2 className="text-[#002664] mb-1" style={{ fontSize: "1.25rem" }}>
          {STEPS[currentStep - 1]}
        </h2>
        <p className="text-gray-500 mb-6" style={{ fontSize: "0.875rem" }}>
          {currentStep === 1 && "Enter your personal contact details."}
          {currentStep === 2 && "Tell us about your role and workplace."}
          {currentStep === 3 && "Set up your password and review policies."}
        </p>

        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                  First name <span className="text-[#D7153A]">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className={inputClass("firstName")}
                  placeholder="e.g. Jane"
                />
                {errors.firstName && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                  Last name <span className="text-[#D7153A]">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className={inputClass("lastName")}
                  placeholder="e.g. Smith"
                />
                {errors.lastName && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                Work email <span className="text-[#D7153A]">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass("email")}
                placeholder="jane.smith@health.nsw.gov.au"
              />
              {errors.email && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                Phone number <span className="text-[#D7153A]">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClass("phone")}
                placeholder="e.g. 0412 345 678"
              />
              {errors.phone && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="role" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                Role <span className="text-[#D7153A]">*</span>
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  className={selectClass("role")}
                >
                  <option value="" disabled>Select your role</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.role && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.role}</p>}
            </div>

            <div>
              <label htmlFor="facility" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                Facility <span className="text-[#D7153A]">*</span>
              </label>
              <div className="relative">
                <select
                  id="facility"
                  value={formData.facility}
                  onChange={(e) => updateField("facility", e.target.value)}
                  className={selectClass("facility")}
                >
                  <option value="" disabled>Select your facility</option>
                  {FACILITIES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.facility && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.facility}</p>}
            </div>

            <div>
              <label htmlFor="department" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                Department <span className="text-[#D7153A]">*</span>
              </label>
              <input
                id="department"
                type="text"
                value={formData.department}
                onChange={(e) => updateField("department", e.target.value)}
                className={inputClass("department")}
                placeholder="e.g. Haematology"
              />
              {errors.department && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.department}</p>}
            </div>

            <div>
              <label htmlFor="staffId" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                Staff ID <span className="text-[#D7153A]">*</span>
              </label>
              <input
                id="staffId"
                type="text"
                value={formData.staffId}
                onChange={(e) => updateField("staffId", e.target.value)}
                className={inputClass("staffId")}
                placeholder="e.g. NSW12345"
              />
              {errors.staffId && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.staffId}</p>}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                Password <span className="text-[#D7153A]">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={`${inputClass("password")} pr-10`}
                  placeholder="Min 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrengthMeter password={formData.password} />
              {errors.password && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.password}</p>}
              <p className="text-gray-400 mt-1" style={{ fontSize: "0.7rem" }}>
                Use 8+ characters with uppercase, lowercase, numbers and symbols.
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-gray-700" style={{ fontSize: "0.875rem" }}>
                Confirm password <span className="text-[#D7153A]">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  className={`${inputClass("confirmPassword")} pr-10`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[#D7153A] mt-1" style={{ fontSize: "0.75rem" }}>{errors.confirmPassword}</p>}
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateField("agreeTerms", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#002664] accent-[#002664]"
                />
                <span className="text-gray-600" style={{ fontSize: "0.8125rem", fontWeight: 400 }}>
                  I agree to the <a href="#" className="text-[#002664] underline hover:text-[#001a4d]">Terms &amp; Conditions</a> <span className="text-[#D7153A]">*</span>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-[#D7153A] ml-7" style={{ fontSize: "0.75rem" }}>{errors.agreeTerms}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreePrivacy}
                  onChange={(e) => updateField("agreePrivacy", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#002664] accent-[#002664]"
                />
                <span className="text-gray-600" style={{ fontSize: "0.8125rem", fontWeight: 400 }}>
                  I have read and agree to the <a href="#" className="text-[#002664] underline hover:text-[#001a4d]">Privacy Policy</a> <span className="text-[#D7153A]">*</span>
                </span>
              </label>
              {errors.agreePrivacy && <p className="text-[#D7153A] ml-7" style={{ fontSize: "0.75rem" }}>{errors.agreePrivacy}</p>}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
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
          ) : (
            <div />
          )}
          <button
            onClick={handleContinue}
            className="px-6 py-2.5 bg-[#002664] text-white rounded-md hover:bg-[#001a4d] transition-colors cursor-pointer"
            style={{ fontSize: "0.875rem" }}
          >
            {currentStep === 3 ? "Create Account" : "Continue"}
          </button>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-6" style={{ fontSize: "0.8125rem" }}>
        Already have an account?{" "}
        <a href="#" className="text-[#002664] underline hover:text-[#001a4d]">
          Sign in
        </a>
      </p>
    </div>
  );
}
