import * as React from "react";

export function useCursorBackground() {
  const rafRef = React.useRef<number | null>(null);
  const lastMoveRef = React.useRef<number>(0);
  const targetRef = React.useRef<{ x: number; y: number }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const posRef = React.useRef<{ x: number; y: number }>({ x: targetRef.current.x, y: targetRef.current.y });
  const blockedRef = React.useRef(false);

  React.useEffect(() => {
    const root = document.documentElement;

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (['a', 'button', 'input', 'select', 'textarea', 'summary', 'label'].includes(tag)) return true;
      const cls = (el as HTMLElement).classList;
      return (
        cls.contains('card-neo') ||
        cls.contains('project-card') ||
        [...cls].some(c => c.startsWith('btn-')) ||
        (el as HTMLElement).dataset.block === 'true'
      );
    };

    const handleMove = (e: PointerEvent) => {
      lastMoveRef.current = performance.now();
      targetRef.current = { x: e.clientX, y: e.clientY };
      const path = e.composedPath?.() || [];
      blockedRef.current = path.some(n => n instanceof Element && isInteractive(n));
      root.setAttribute('data-cursor-blocked', blockedRef.current ? 'true' : 'false');
    };

    const handleLeave = () => {
      // keep last position; drift animation will take over
      root.setAttribute('data-cursor-blocked', 'false');
      blockedRef.current = false;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerleave', handleLeave);

    const tick = (t: number) => {
      // ease/spring
      const ease = 0.3;
      // gentle drift when idle and not blocked
      const idleMs = performance.now() - lastMoveRef.current;
      const idle = idleMs > 1000 && !blockedRef.current;
      const driftAmp = idle ? 35 : 12;
      const dx = Math.sin(t / 1600) * driftAmp;
      const dy = Math.cos(t / 1900) * driftAmp;

      const target = idle
        ? { x: targetRef.current.x + dx, y: targetRef.current.y + dy }
        : targetRef.current;

      posRef.current.x += (target.x - posRef.current.x) * ease;
      posRef.current.y += (target.y - posRef.current.y) * ease;

      // clamp
      const x = Math.max(0, Math.min(window.innerWidth, posRef.current.x));
      const y = Math.max(0, Math.min(window.innerHeight, posRef.current.y));

      root.style.setProperty('--cx', `${x}px`);
      root.style.setProperty('--cy', `${y}px`);

      // intensity reacts to distance from center for subtle parallax
      const nx = x / window.innerWidth - 0.5;
      const ny = y / window.innerHeight - 0.5;
      const intensity = Math.min(1, Math.sqrt(nx * nx + ny * ny) * 1.2 + (idle ? 0.1 : 0));
      root.style.setProperty('--bgIntensity', blockedRef.current ? '0.18' : (0.4 + intensity * 0.4).toFixed(3));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      // reset to center on resize to avoid jump
      targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      posRef.current = { ...targetRef.current };
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('resize', handleResize);
      document.documentElement.removeAttribute('data-cursor-blocked');
    };
  }, []);
}
