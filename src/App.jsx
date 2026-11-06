import { useState } from "react";
import data from "./data.json";
import { addDays, statusOf } from "./utils";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Upload from "./components/Upload";
import Categories from "./components/Categories";
import DocList from "./components/DocList";
import Dashboard from "./components/Dashboard";
import ReminderPanel from "./components/ReminderPanel";

export default function App() {
  const [docs, setDocs] = useState(() =>
    data.documents.map((d) => ({ ...d, expiry: addDays(d.daysFromNow) }))
  );
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(true); // reminders show on load

  const due = docs
    .filter((d) => ["today", "soon"].includes(statusOf(d)))
    .sort((a, b) => a.expiry.localeCompare(b.expiry));

  return (
    <div className="bg-bg min-h-screen">
      <Navbar count={due.length} onBell={() => setOpen(!open)} />
      <ReminderPanel open={open} onClose={() => setOpen(false)} due={due} />
      <Hero />
      <Upload docs={docs} setDocs={setDocs} />
      <Categories docs={docs} cat={cat} setCat={setCat} />
      <DocList docs={docs} setDocs={setDocs} cat={cat} setCat={setCat} />
      <Dashboard docs={docs} />
      <footer className="text-center text-white/30 text-sm py-10">© 2026 DocKeeper</footer>
    </div>
  );
}
