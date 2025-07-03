import { useState, useEffect, useRef } from "react";

export function useHoldDownAnimation() {
  const dragHandleRef = useRef(null);
  const holdStart = useRef(0);
  const animationFrameId = useRef(null);
  const [boxShadow, setBoxShadow] = useState("none");

  function updateShadow() {
    const duration = Math.min(Date.now() - holdStart.current, 300);
    const spread = Math.min(duration / 60, 100);
    setBoxShadow(`0 0 ${spread}px ${spread / 5}px rgba(0, 0, 0, 0.3)`);
    animationFrameId.current = requestAnimationFrame(updateShadow);
  }

  function handlePointerDown() {
    holdStart.current = Date.now();
    animationFrameId.current = requestAnimationFrame(updateShadow);
  }

  function stopHolding() {
    cancelAnimationFrame(animationFrameId.current);
    setBoxShadow("none");
  }

  useEffect(() => {
    const dragHandle = dragHandleRef.current;
    if (!dragHandle) return;

    dragHandle.addEventListener("pointerdown", handlePointerDown);
    dragHandle.addEventListener("pointerup", stopHolding);
    dragHandle.addEventListener("pointerleave", stopHolding);
    dragHandle.addEventListener("pointercancel", stopHolding);
    return () => {
      dragHandle.removeEventListener("pointerdown", handlePointerDown);
      dragHandle.removeEventListener("pointerup", stopHolding);
      dragHandle.removeEventListener("pointerleave", stopHolding);
      dragHandle.removeEventListener("pointercancel", stopHolding);
    };
  }, [dragHandleRef.current]);

  return { boxShadow, dragHandleRef };
}
