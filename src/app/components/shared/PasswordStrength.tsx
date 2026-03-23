import { CLEAN_PW_RULES } from "../PwRules";

export function PasswordStrength({ password }: { password: string }) {
  const checks = CLEAN_PW_RULES.map((r) => ({ label: r.label, ok: r.test(password) }));
  const score = checks.filter((c) => c.ok).length; // 0-5
  const barColors: Record<number, string> = {
    0: "#E4E7EB", 1: "#D7153A", 2: "#C95000", 3: "#E07800", 4: "#008A07", 5: "#002664",
  };
  const strengthLabels: Record<number, string> = {
    0: "", 1: "Very Weak", 2: "Weak", 3: "Fair", 4: "Good", 5: "Strong",
  };
  const colour = barColors[score];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8 }}>
      {/* 5-segment bar */}
      <div style={{ display: "flex", gap: 3, marginBottom: 5 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i <= score ? colour : "#E4E7EB",
              transition: "background-color 0.2s",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: colour, fontWeight: 600 }}>{strengthLabels[score]}</span>
        <span style={{ fontSize: 10, color: "#9BA1A6" }}>{score}/5 requirements met</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 12px" }}>
        {checks.map((c) => (
          <span
            key={c.label}
            style={{
              fontSize: 11,
              color: c.ok ? "#008A07" : "#6D7579",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <span style={{ fontSize: 13 }}>{c.ok ? "✓" : "○"}</span>
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
