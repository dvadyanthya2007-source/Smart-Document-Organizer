const fmt = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return fmt(d); };

export const daysLeft = (iso) =>
  Math.round((new Date(iso + "T00:00:00") - new Date(new Date().toDateString())) / 86400000);

// returns: expired | today | soon | valid
export const statusOf = (doc) => {
  const d = daysLeft(doc.expiry);
  if (d < 0) return "expired";
  if (d === 0) return "today";
  if (d <= doc.remindBefore) return "soon";
  return "valid";
};

export const STATUS_UI = {
  expired: ["Expired", "bg-white/10 text-white/50"],
  today: ["Due today", "bg-red-500/25 text-red-300"],
  soon: ["Due soon", "bg-orange-500/25 text-orange-300"],
  valid: ["Valid", "bg-accent/20 text-accent"],
};

export const CATEGORIES = [
  { name: "Identity", icon: "🪪" },
  { name: "Finance", icon: "💳" },
  { name: "Education", icon: "🎓" },
  { name: "Health", icon: "🩺" },
  { name: "Insurance", icon: "🛡️" },
  { name: "Transport", icon: "🚌" },
  { name: "Other", icon: "📁" },
];
