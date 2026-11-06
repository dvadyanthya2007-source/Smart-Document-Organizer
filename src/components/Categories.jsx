import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { CATEGORIES } from "../utils";

export default function Categories({ docs, cat, setCat }) {
  return (
    <section id="categories" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal><h2 className="text-3xl font-bold mb-8">Document categories</h2></Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {CATEGORIES.map((c, i) => {
          const n = docs.filter((d) => d.category === c.name).length;
          return (
            <Reveal key={c.name} delay={i * 70}>
              <Tilt className={`rounded-2xl p-5 border cursor-pointer bg-card ${cat === c.name ? "border-accent" : "border-white/10"}`}>
                <div onClick={() => { setCat(c.name); document.getElementById("documents").scrollIntoView(); }}>
                  <span className="text-3xl">{c.icon}</span>
                  <h3 className="font-semibold mt-3">{c.name}</h3>
                  <p className="text-sm text-white/50">{n} document{n !== 1 && "s"}</p>
                </div>
              </Tilt>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
