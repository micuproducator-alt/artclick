import { useEffect, useRef } from "react";

type ProjectType = "trading" | "firma" | "locallio" | "pretcinstit";

export function useProjectCanvas(type: ProjectType) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    if (type === "trading") {
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += 0.008;
        const W = canvas.width,
          H = canvas.height;
        for (let l = 0; l < 6; l++) {
          ctx.beginPath();
          const off = l * (H / 6);
          ctx.moveTo(0, off + H / 2);
          for (let x = 0; x <= W; x += 4) {
            const y =
              off +
              Math.sin((x / W) * Math.PI * 3 + t + l) * (30 + l * 8) +
              Math.sin((x / W) * 7 + t * 1.3) * 10;
            ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(13,217,197,${0.03 + l * 0.018})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        const barW = 14,
          cols = Math.floor(W / barW);
        for (let i = 0; i < cols; i++) {
          const h = 20 + Math.abs(Math.sin(i * 0.4 + t) * 60);
          const x = i * barW + 2;
          const y = H / 2 - h / 2 + Math.sin(i * 0.2 + t * 0.5) * 20;
          ctx.fillStyle =
            Math.sin(i + t) > 0
              ? "rgba(13,217,197,0.55)"
              : "rgba(56,189,248,0.14)";
          ctx.fillRect(x, y, barW - 3, h);
        }
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    if (type === "firma") {
      const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
      const init = () => {
        nodes.length = 0;
        for (let i = 0; i < 22; i++) {
          nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
          });
        }
      };
      init();
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        });
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x,
              dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 160) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(13,217,197,${(1 - d / 160) * 0.3})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
          ctx.beginPath();
          ctx.arc(nodes[i].x, nodes[i].y, 2, 0, 7);
          ctx.fillStyle = "rgba(56,189,248,0.5)";
          ctx.fill();
        }
        animId = requestAnimationFrame(draw);
      };
      draw();
    }

    if (type === "locallio") {
      const pings: { x: number; y: number; r: number; life: number }[] = [];
      const addPing = () => {
        pings.push({
          x: 80 + Math.random() * (canvas.width - 160),
          y: 60 + Math.random() * (canvas.height - 120),
          r: 0,
          life: 1,
        });
      };
      for (let i = 0; i < 5; i++) addPing();
      const pingInterval = setInterval(addPing, 900);
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x += 28 * devicePixelRatio)
          for (let y = 0; y < canvas.height; y += 28 * devicePixelRatio) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 7);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.fill();
          }
        for (let i = 0; i < pings.length; i++) {
          for (let j = i + 1; j < pings.length; j++) {
            const dx = pings[i].x - pings[j].x,
              dy = pings[i].y - pings[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 200) {
              ctx.beginPath();
              ctx.moveTo(pings[i].x, pings[i].y);
              ctx.lineTo(pings[j].x, pings[j].y);
              ctx.strokeStyle = `rgba(13,217,197,${(1 - d / 200) * 0.15 * Math.min(pings[i].life, pings[j].life)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
          pings[i].r += 0.9;
          pings[i].life = Math.max(0, 1 - pings[i].r / 90);
          ctx.beginPath();
          ctx.arc(pings[i].x, pings[i].y, pings[i].r, 0, 7);
          ctx.strokeStyle = `rgba(13,217,197,${pings[i].life * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(pings[i].x, pings[i].y, 3, 0, 7);
          ctx.fillStyle = `rgba(13,217,197,${pings[i].life * 0.8})`;
          ctx.fill();
          if (pings[i].r > 90) pings.splice(i, 1);
        }
        animId = requestAnimationFrame(draw);
      };
      draw();
      return () => {
        clearInterval(pingInterval);
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
      };
    }

    if (type === "pretcinstit") {
      const bars = Array.from({ length: 12 }, () => ({
        h: 0.2 + Math.random() * 0.6,
        target: 0.2 + Math.random() * 0.6,
        x: 0,
      }));
      const particles: {
        x: number;
        y: number;
        vy: number;
        life: number;
        symbol: string;
      }[] = [];
      const symbols = ["€", "lei", "%", "★", "↑"];

      const addParticle = () => {
        particles.push({
          x: 40 + Math.random() * (canvas.width - 80),
          y: canvas.height * 0.7,
          vy: -(0.8 + Math.random() * 1.2),
          life: 1,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      };
      const pInterval = setInterval(addParticle, 600);

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const W = canvas.width,
          H = canvas.height;
        const bw = Math.floor(W / (bars.length * 1.8));
        const gap = Math.floor(W / bars.length);

        bars.forEach((bar, idx) => {
          bar.h += (bar.target - bar.h) * 0.04;
          if (Math.random() < 0.008) bar.target = 0.2 + Math.random() * 0.65;

          bar.x = gap * idx + gap / 2 - bw / 2;
          const bh = bar.h * H * 0.65;
          const by = H * 0.82 - bh;

          const g = ctx.createLinearGradient(0, by, 0, by + bh);
          g.addColorStop(0, "rgba(13,217,197,0.7)");
          g.addColorStop(1, "rgba(13,217,197,0.15)");
          ctx.fillStyle = g;
          ctx.fillRect(bar.x, by, bw, bh);

          ctx.beginPath();
          ctx.arc(bar.x + bw / 2, by, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#0DD9C5";
          ctx.fill();
        });

        ctx.beginPath();
        bars.forEach((bar, idx) => {
          const bh = bar.h * H * 0.65;
          const x = bar.x + bw / 2;
          const y = H * 0.82 - bh;
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.strokeStyle = "rgba(13,217,197,0.35)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        for (let pi = particles.length - 1; pi >= 0; pi--) {
          const p = particles[pi];
          p.y += p.vy;
          p.life -= 0.012;
          ctx.globalAlpha = p.life * 0.7;
          ctx.fillStyle = "#0DD9C5";
          ctx.font = `bold ${11 * devicePixelRatio}px monospace`;
          ctx.fillText(p.symbol, p.x, p.y);
          ctx.globalAlpha = 1;
          if (p.life <= 0) particles.splice(pi, 1);
        }

        ctx.beginPath();
        ctx.moveTo(0, H * 0.82);
        ctx.lineTo(W, H * 0.82);
        ctx.strokeStyle = "rgba(13,217,197,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        animId = requestAnimationFrame(draw);
      };
      draw();
      return () => {
        clearInterval(pInterval);
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
      };
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [type]);

  return canvasRef;
}
