import React, { useRef, useCallback } from "react";

const Magnetic = ({ children, className = "", onClick, href, as: Tag = "div", ...rest }) => {
  const ref = useRef(null);

  const handleMouse = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const reset = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <Tag
      ref={ref}
      onClick={onClick}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      style={{ transition: "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)" }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Magnetic;
