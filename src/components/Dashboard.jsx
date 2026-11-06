import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { CATEGORIES, daysLeft, statusOf } from "../utils";

const PIE = ["#c8f169", "#38bdf8", "#f59e0b", "#a78bfa", "#ef4444", "#34d399", "#94a3b8"];

export default function Dashboard({ docs }) {
  const count = (s) => docs.filter((d) => statusOf(d) === s).length;
  const stats = [
    { label: "Total", value: docs.length, color: "text-white" },
    { label: "Due today", value: count("today"), color: "text-red-300" },
    { label: "Due soon", value: count("soon"), color: "text-orange-300" },
    { label: "Expired", value: count("expired"), color: "text-white/50" },
  ];
  const byCat = CATEGORIES.map((c) => ({ name: c.name, value: docs.filter((d) => d.category === c.name).length })).filter((x) => x.value);
  const byStatus = [
    { name: "Expired", n: count("expired") }, { name: "Today", n: count("today") },
    { name: "Soon", n: count("soon") }, { name: "Valid", n: count("valid") },
  ];
  const upcoming = docs.filter((d) => daysLeft(d.expiry) >= 0).sort((a, b) => a.expiry.localeCompare(b.expiry)).slice(0, 5);
  const box = "bg-card border border-white/10 rounded-2xl p-5 h-72";

  return (
    <section id="dash" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal><h2 className="text-3xl font-bold mb-8">Expiry dashboard</h2></Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <Tilt className="bg-card border border-white/10 rounded-2xl p-5">
              <p className="text-sm text-white/50">{s.label}</p>
              <p className={`text-4xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Reveal><Tilt className={box}>
          <h3 className="text-sm text-white/60 mb-2">By category</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={byCat} dataKey="value" innerRadius={45} outerRadius={80} paddingAngle={3}>
                {byCat.map((_, i) => <Cell key={i} fill={PIE[i % PIE.length]} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </Tilt></Reveal>

        <Reveal delay={120}><Tilt className={box}>
          <h3 className="text-sm text-white/60 mb-2">By expiry status</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={byStatus}>
              <XAxis dataKey="name" stroke="#888" /><YAxis allowDecimals={false} stroke="#888" /><Tooltip />
              <Bar dataKey="n" fill="#c8f169" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Tilt></Reveal>

        <Reveal delay={240}><Tilt className={`${box} overflow-auto`}>
          <h3 className="text-sm text-white/60 mb-3">Next to expire</h3>
          {upcoming.map((d) => (
            <div key={d.id} className="flex justify-between text-sm py-2 border-b border-white/5">
              <span>{d.name}</span>
              <span className="text-white/50">{daysLeft(d.expiry) === 0 ? "today" : `${daysLeft(d.expiry)}d`}</span>
            </div>
          ))}
          {upcoming.length === 0 && <p className="text-sm text-white/40">Nothing upcoming.</p>}
        </Tilt></Reveal>
      </div>
    </section>
  );
}
