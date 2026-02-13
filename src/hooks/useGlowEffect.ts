import { useCallback, useState } from "react";

export function useGlowEffect() {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setGlowPos((p) => ({ ...p, active: false }));
  }, []);

  const glowStyle: React.CSSProperties = glowPos.active
    ? {
        background: `radial-gradient(300px circle at ${glowPos.x}px ${glowPos.y}px, hsl(var(--accent) / 0.15), transparent 60%)`,
      }
    : {};

  return { glowStyle, handleMouseMove, handleMouseLeave };
}
