import { useEffect, useRef, useState } from "react";

function Eye({ mouse }) {
  const ref = useRef(null);
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const a = Math.atan2(mouse.y - cy, mouse.x - cx);
    const d = Math.min(22, Math.hypot(mouse.x - cx, mouse.y - cy) / 8);
    setP({ x: Math.cos(a) * d, y: Math.sin(a) * d });
  }, [mouse]);

  return (
    <div ref={ref} className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(200,241,105,.25)]">
      <div className="w-10 h-10 rounded-full bg-bg" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
        <div className="w-3 h-3 rounded-full bg-white ml-2 mt-2" />
      </div>
    </div>
  );
}

export default function EyeTracker() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div className="flex gap-4">
      <Eye mouse={mouse} /><Eye mouse={mouse} />
    </div>
  );
}
