import { useEffect } from "react";
import { X } from "lucide-react";
import { daysLeft } from "../utils";

export default function ReminderPanel({ open, onClose, due }) {
  // Browser notification for documents due today (if user allows)
  useEffect(() => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    due.filter((d) => daysLeft(d.expiry) === 0).forEach((d) =>
      new Notification("Document due today", { body: d.name })
    );
  }, [due]);

  const enable = () => "Notification" in window && Notification.requestPermission();

  if (!open) return null;
  return (
    <div className="fixed top-16 right-4 z-50 w-80 bg-card border border-white/10 rounded-2xl p-4 shadow-2xl">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">Reminders</h4>
        <button onClick={onClose}><X size={16} /></button>
      </div>
      {due.length === 0 && <p className="text-sm text-white/50">Nothing due soon 🎉</p>}
      {due.map((d) => {
        const n = daysLeft(d.expiry);
        return (
          <div key={d.id} className={`text-sm p-3 rounded-lg mb-2 ${n === 0 ? "bg-red-500/20 text-red-200" : "bg-orange-500/15 text-orange-200"}`}>
            <b>{d.name}</b>
            <div>{n === 0 ? "Due TODAY" : `Due in ${n} day${n > 1 ? "s" : ""} (${d.expiry})`}</div>
          </div>
        );
      })}
      <button onClick={enable} className="text-xs text-accent mt-2">Enable browser alerts</button>
    </div>
  );
}
