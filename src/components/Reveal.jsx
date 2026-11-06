import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShow(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: show ? 1 : 0,
        transform: show
          ? "perspective(1000px) translateY(0) rotateX(0) scale(1)"
          : "perspective(1000px) translateY(90px) rotateX(28deg) scale(.88)",
      }}
    >
      {children}
    </div>
  );
}
