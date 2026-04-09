import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const AnimatedBackground = ({ variant = "grid" }: { variant?: "grid" | "particles" | "mesh" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    if (variant === "particles" || variant === "mesh") {
      const count = variant === "mesh" ? 60 : 40;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    }

    let gridOffset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      if (variant === "grid") {
        gridOffset = (gridOffset + 0.2) % 60;
        ctx.strokeStyle = "rgba(59, 130, 246, 0.04)";
        ctx.lineWidth = 1;
        for (let x = -60 + gridOffset; x < w + 60; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = -60 + gridOffset; y < h + 60; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        // Glow spots
        const time = Date.now() * 0.001;
        for (let i = 0; i < 3; i++) {
          const gx = (Math.sin(time * 0.3 + i * 2) * 0.3 + 0.5) * w;
          const gy = (Math.cos(time * 0.2 + i * 3) * 0.3 + 0.5) * h;
          const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 150);
          grad.addColorStop(0, "rgba(59, 130, 246, 0.06)");
          grad.addColorStop(1, "rgba(59, 130, 246, 0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
        }
      }

      if (variant === "particles" || variant === "mesh") {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
          ctx.fill();
        });

        if (variant === "mesh") {
          particles.forEach((p, i) => {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = p.x - particles[j].x;
              const dy = p.y - particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          });
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
};

export default AnimatedBackground;
