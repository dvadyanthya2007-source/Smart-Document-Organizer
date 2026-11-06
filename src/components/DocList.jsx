import { useState } from "react";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { CATEGORIES, daysLeft, statusOf, STATUS_UI } from "../utils";

export default function DocList({ docs, setDocs, cat, setCat }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("expiry");

  const list = docs
    .filter((d) => cat === "All" || d.category === cat)
    .filter((d) => status === "all" || statusOf(d) === status)
    .filter((d) => (d.name + d.file).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort === "expiry" ? a.expiry.localeCompare(b.expiry) : a.name.localeCompare(b.name)));

  const input = "bg-card border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent";
  const chip = (on) => `px-3 py-2 rounded-lg text-sm border ${on ? "bg-accent text-black border-accent" : "border-white/10"}`;

  return (
    <section id="documents" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal><h2 className="text-3xl font-bold mb-8">My documents</h2></Reveal>

      <Reveal>
        <div className="flex flex-wrap gap-3 mb-3">
          <input className={`${input} flex-1 min-w-[220px]`} placeholder="Search by name or file..." value={q} onChange={(e) => setQ(e.target.value)} />
          <select className={input} value={cat} onChange={(e) => setCat(e.target.value)}>
            <option>All</option>
            {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <select className={input} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="expiry">Sort: expiry date</option>
            <option value="name">Sort: name</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {[["all", "All"], ["today", "Due today"], ["soon", "Due soon"], ["valid", "Valid"], ["expired", "Expired"]].map(([k, l]) => (
            <button key={k} onClick={() => setStatus(k)} className={chip(status === k)}>{l}</button>
          ))}
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((d, i) => {
          const [label, cls] = STATUS_UI[statusOf(d)];
          const n = daysLeft(d.expiry);
          return (
            <Reveal key={d.id} delay={(i % 3) * 80}>
              <Tilt className="bg-card border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-white/50">{d.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${cls}`}>{label}</span>
                </div>
                <h3 className="font-semibold text-lg mt-3">{d.name}</h3>
                <p className="text-xs text-white/40">📎 {d.file}</p>
                <p className="text-sm text-white/60 mt-3">
                  {d.expiry} · {n < 0 ? `${-n} day(s) ago` : n === 0 ? "today" : `in ${n} day(s)`}
                </p>
                <button onClick={() => setDocs(docs.filter((x) => x.id !== d.id))} className="text-xs text-red-300/80 mt-3 hover:text-red-300">Delete</button>
              </Tilt>
            </Reveal>
          );
        })}
        {list.length === 0 && <p className="text-white/50">No documents match your filters.</p>}
      </div>
    </section>
  );
}
