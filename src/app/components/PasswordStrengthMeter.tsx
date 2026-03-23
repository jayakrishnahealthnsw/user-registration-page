interface PasswordStrengthMeterProps {
  password: string;
}

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "#D7153A" };
  if (score <= 2) return { score, label: "Fair", color: "#F39C12" };
  if (score <= 3) return { score, label: "Good", color: "#F5A623" };
  if (score <= 4) return { score, label: "Strong", color: "#27AE60" };
  return { score, label: "Very Strong", color: "#27AE60" };
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null;
  const { score, label, color } = getPasswordStrength(password);
  const percentage = (score / 5) * 100;

  return (
    <div className="mt-2">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <p className="text-xs mt-1" style={{ color }}>
        {label}
      </p>
    </div>
  );
}
