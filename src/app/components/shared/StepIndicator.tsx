import { Check, User, Stethoscope, MapPin, ShieldCheck } from "lucide-react";

const STEPS = [
  { id: 1, label: "Your details", icon: User },
  { id: 2, label: "Professional", icon: Stethoscope },
  { id: 3, label: "Practice",     icon: MapPin },
  { id: 4, label: "Security",     icon: ShieldCheck },
];

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {STEPS.map((step, idx) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <div key={step.id} style={{ display: "contents" }}>
            <div className="flex flex-col items-center" style={{ minWidth: 72 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: done ? "#002664" : active ? "#002664" : "#ffffff",
                  border: done || active ? "2px solid #002664" : "2px solid #CDD3D6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                }}
              >
                {done ? (
                  <Check size={16} color="#ffffff" strokeWidth={2.5} />
                ) : (
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: active ? "#ffffff" : "#6D7579",
                    }}
                  >
                    {step.id}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 11,
                  marginTop: 4,
                  fontWeight: active || done ? 600 : 400,
                  color: active || done ? "#002664" : "#6D7579",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: done ? "#002664" : "#E4E7EB",
                  marginBottom: 18,
                  transition: "background-color 0.25s ease",
                  minWidth: 24,
                  maxWidth: 48,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { STEPS };
