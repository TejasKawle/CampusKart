import React, { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const circleRef = useRef(null);
  const requestRef = useRef(null);

  // positions
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // smoothing factor (0 - no movement, 1 - instant)
  const ease = 0.18; // smaller -> more trailing

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    // update mouse position on move
    function handleMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      circle.classList.remove("cursor-hidden");
    }

    function handleLeave() {
      // hide circle when leaving window
      circle.classList.add("cursor-hidden");
    }

    function handleDown() {
      circle.classList.add("cursor-pressed");
    }

    function handleUp() {
      circle.classList.remove("cursor-pressed");
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseenter", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    // animate with requestAnimationFrame and linear interpolation
    const animate = () => {
      // lerp position
      pos.current.x += (mouse.current.x - pos.current.x) * ease;
      pos.current.y += (mouse.current.y - pos.current.y) * ease;

      // apply transform using translate3d for GPU accel
      const x = Math.round(pos.current.x);
      const y = Math.round(pos.current.y);
      circle.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`; // -12 to center (half size)

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseenter", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div>
      {/* The circle element sits on top of everything and ignores pointer events */}
      <div className="cursor-circle" ref={circleRef} aria-hidden="true" />
    </div>
  );
}
