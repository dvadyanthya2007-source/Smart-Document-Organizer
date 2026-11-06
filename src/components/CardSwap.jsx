import { useEffect, useState } from "react";

export default function CardSwap({ cards }) {
  const [order, setOrder] = useState(cards.map((_, i) => i));

  useEffect(() => {
    const t = setInterval(() => setOrder((o) => [...o.slice(1), o[0]]), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-72 w-full max-w-sm mx-auto" style={{ perspective: 1000 }}>
      {cards.map((c, i) => {
        const pos = order.indexOf(i);
        return (
          <div
            key={c.title}
            className="absolute inset-0 rounded-2xl border border-white/10 bg-card p-6 flex flex-col justify-between"
            style={{
              transform: `translate3d(${pos * 30}px, ${-pos * 26}px, ${-pos * 70}px)`,
              zIndex: cards.length - pos,
              opacity: 1 - pos * 0.18,
              transition: "all .8s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <span className="text-3xl">{c.icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-accent">{c.title}</h3>
              <p className="text-sm text-white/60 mt-1">{c.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
