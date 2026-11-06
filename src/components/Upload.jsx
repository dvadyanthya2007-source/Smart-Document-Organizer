import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { CATEGORIES } from "../utils";

export default function Upload({ docs, setDocs }) {
  const fileRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Identity", expiry: "", remindBefore: 7 });
  const [msg, setMsg] = useState("");

  const pick = (f) => {
    if (!f) return;
    setFile(f);
    if (!form.name) setForm((p) => ({ ...p, name: f.name.replace(/\.[^.]+$/, "") }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.expiry) { setMsg("Please add a name and expiry date."); return; }
    setDocs([
      { id: Date.now(), ...form, remindBefore: Number(form.remindBefore), file: file ? file.name : "—" },
      ...docs,
    ]);
    setForm({ name: "", category: "Identity", expiry: "", remindBefore: 7 });
    setFile(null);
    setMsg("Document saved ✓");
    setTimeout(() => setMsg(""), 2500);
  };

  const input = "bg-card border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent w-full";

  return (
    <section id="upload" className="max-w-4xl mx-auto px-6 py-24">
      <Reveal><h2 className="text-3xl font-bold mb-8">Upload document</h2></Reveal>
      <Reveal>
        <form onSubmit={submit} className="bg-card border border-white/10 rounded-2xl p-6 grid md:grid-cols-2 gap-5">
          <div
            onClick={() => fileRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
            className={`md:row-span-3 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-8 cursor-pointer transition ${drag ? "border-accent bg-accent/10" : "border-white/20"}`}
          >
            <span className="text-4xl mb-2">📤</span>
            <p className="text-sm text-white/70">{file ? file.name : "Drag & drop a file or click to browse"}</p>
            <p className="text-xs text-white/40 mt-1">PDF, JPG, PNG</p>
            <input ref={fileRef} type="file" accept=".pdf,image/*" hidden onChange={(e) => pick(e.target.files[0])} />
          </div>

          <input className={input} placeholder="Document name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-white/50">Expiry / due date
              <input type="date" className={`${input} mt-1`} value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
            </label>
            <label className="text-xs text-white/50">Remind me before
              <select className={`${input} mt-1`} value={form.remindBefore} onChange={(e) => setForm({ ...form, remindBefore: e.target.value })}>
                {[1, 3, 7, 14, 30].map((n) => <option key={n} value={n}>{n} day{n > 1 ? "s" : ""}</option>)}
              </select>
            </label>
          </div>

          <div className="md:col-span-2 flex items-center gap-4">
            <button className="bg-accent text-black font-semibold px-6 py-2 rounded-lg">Save document</button>
            <span className="text-sm text-accent">{msg}</span>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
