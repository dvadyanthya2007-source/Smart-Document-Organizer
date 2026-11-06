import { useRef } from "react";

export default function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04)`;
  };
  const leave = () => (ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)");
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`transition-transform duration-150 ${className}`}>
      {children}
    </div>
  );
}
