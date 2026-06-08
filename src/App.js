import { useEffect, useRef, useState } from "react";

const COLORS = {
  bg: "#020408",
  surface: "#060d14",
  accent1: "#00ffe0",
  accent2: "#ff2d6b",
  accent3: "#7b61ff",
  gold: "#ffd166",
  text: "#e8f4ff",
  muted: "#4a6070",
};

const SKILLS = [
  { name: "Javascript", level: 90, cat: "Programming_language" },

  { name: "Java", level: 90, cat: "Programming_language" },
  { name: "React", level: 85, cat: "Frontend" },
  { name: "Tailwind CSS", level: 93, cat: "Frontend" },
  { name: "Node.js", level: 88, cat: "Backend" },
  { name: "MongoDB", level: 82, cat: "Database" },
  // { name: "Postgeres SQl", level: 80, cat: "Backend" },
  { name: "PostgreSQL", level: 85, cat: "Database" },
  { name: "Manual Testing", level: 87, cat: "Testing" },
  { name: "API Testing", level: 85, cat: "Testing" },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Plintron Mobility Solutions",
    period: "2024 - Present",
    color: "#00ffe0",
    desc: "Working on telecom-based applications handling SIM operations and backend workflows. Responsible for analyzing issues, performing API and manual testing, and ensuring smooth data flow between systems. Involved in debugging production issues, validating requests/responses, and supporting real-time operations.",
    stack: [
      "React",
      "JavaScript",
      "Java",
      "SQL",
      "Manual Testing",
      "PostgreSQL",
      "API Testing",
    ],
  },
];
const PROJECTS = [
  {
    title: "ORBIT",
    tag: "Expense SaaS",
    desc: "Full-stack expense management app with group splitting, real-time tracking, and secure payment integration using MongoDB.",
    color: "#00ffe0",
    year: "2026",
    metrics: ["MongoDB", "Email Service", "SMS Gateway"],
  },
  {
    title: "PAYFLOW",
    tag: "Payment Integration",
    desc: "Integrated Razorpay for seamless transactions with order creation, verification, and secure backend validation.",
    color: "#ff2d6b",
    year: "2025",
    metrics: ["Razorpay", "Order API", "Payment Verify"],
  },
  {
    title: "HEART PREDICT",
    tag: "ML Project",
    desc: "Heart disease prediction system using patient data with 14 attributes for early risk detection.",
    color: "#7b61ff",
    year: "2024",
    metrics: ["ML Model", "14 Features", "Prediction"],
  },
  {
    title: "NEWS FEED",
    tag: "Frontend App",
    desc: "Dynamic news feed application built with React, featuring real-time updates and responsive UI.",
    color: "#ffd166",
    year: "2024",
    metrics: ["React UI", "API Data", "Responsive"],
  },
];

// ─── Liquid Blob Canvas ───────────────────────────────────────────────────────
function LiquidBlob({ color = "#00ffe0", size = 400, style = {} }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.32;
    const points = 8;

    function drawBlob(t) {
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      for (let i = 0; i <= points * 2; i++) {
        const angle = (i / (points * 2)) * Math.PI * 2;
        const noise =
          Math.sin(angle * 3 + t * 0.8) * 18 +
          Math.sin(angle * 5 - t * 0.5) * 12 +
          Math.cos(angle * 2 + t * 1.2) * 10;
        const rad = r + noise;
        const x = cx + Math.cos(angle) * rad;
        const y = cy + Math.sin(angle) * rad;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(
        cx - 40,
        cy - 40,
        0,
        cx,
        cy,
        r + 40,
      );
      grad.addColorStop(0, color + "55");
      grad.addColorStop(0.5, color + "22");
      grad.addColorStop(1, color + "00");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = color + "88";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    function loop() {
      tRef.current += 0.012;
      drawBlob(tRef.current);
      animRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(animRef.current);
  }, [color, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        pointerEvents: "none",
        opacity: 0.7,
        ...style,
      }}
    />
  );
}

// ─── Particle Field ───────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      color: [COLORS.accent1, COLORS.accent2, COLORS.accent3][
        Math.floor(Math.random() * 3)
      ],
    }));

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "99";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,224,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.5,
      }}
    />
  );
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);

    let animId;
    const lerp = (a, b, t) => a + (b - a) * t;
    function animate() {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px)`;
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: COLORS.accent1,
          zIndex: 9999,
          pointerEvents: "none",
          boxShadow: `0 0 10px ${COLORS.accent1}`,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1.5px solid ${COLORS.accent1}66`,
          zIndex: 9998,
          pointerEvents: "none",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}

// ─── Scanline Overlay ─────────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
      }}
    />
  );
}

// ─── Section Reveal Hook ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Glitch Text ──────────────────────────────────────────────────────────────
function GlitchText({
  text,
  size = "clamp(56px,10vw,140px)",
  color = COLORS.accent1,
}) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <style>{`
        @keyframes glitch1 {
          0%,95%,100%{clip-path:inset(0 0 100% 0);transform:translate(-3px,0)}
          96%{clip-path:inset(30% 0 50% 0);transform:translate(3px,0)}
          97%{clip-path:inset(60% 0 10% 0);transform:translate(-2px,0)}
          98%{clip-path:inset(5% 0 80% 0);transform:translate(2px,0)}
        }
        @keyframes glitch2 {
          0%,93%,100%{clip-path:inset(0 0 100% 0);transform:translate(3px,0)}
          94%{clip-path:inset(20% 0 60% 0);transform:translate(-3px,0)}
          95%{clip-path:inset(70% 0 5% 0);transform:translate(2px,0)}
          96%{clip-path:inset(10% 0 75% 0);transform:translate(-2px,0)}
        }
        @keyframes flicker {
          0%,100%{opacity:1}50%{opacity:0.95}
        }
      `}</style>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: size,
          color,
          letterSpacing: "0.04em",
          lineHeight: 1,
          display: "block",
          animation: "flicker 4s infinite",
          textShadow: `0 0 30px ${color}66, 0 0 60px ${color}33`,
        }}
      >
        {text}
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: size,
          color: COLORS.accent2,
          letterSpacing: "0.04em",
          lineHeight: 1,
          display: "block",
          animation: "glitch1 6s infinite",
          opacity: 0.7,
        }}
      >
        {text}
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: size,
          color: COLORS.accent3,
          letterSpacing: "0.04em",
          lineHeight: 1,
          display: "block",
          animation: "glitch2 6s infinite",
          opacity: 0.7,
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts]);

  return (
    <span>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: 3,
          height: "1em",
          background: COLORS.accent1,
          marginLeft: 4,
          verticalAlign: "middle",
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, level, color, delay = 0, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: `all 0.7s ease ${delay}s`,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          color: COLORS.muted,
          letterSpacing: "0.1em",
        }}
      >
        <span style={{ color: COLORS.text }}>{name}</span>
        <span style={{ color }}>{level}%</span>
      </div>
      <div
        style={{
          height: 3,
          background: COLORS.surface,
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${COLORS.muted}33`,
        }}
      >
        <div
          style={{
            height: "100%",
            width: visible ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: 2,
            transition: `width 1.2s ease ${delay + 0.2}s`,
            boxShadow: `0 0 10px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ proj, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? -8 : 0}px)`
          : "translateY(40px)",
        transition: visible
          ? `opacity 0.7s ease ${index * 0.15}s, transform 0.15s ease`
          : `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
        background: `linear-gradient(135deg, ${COLORS.surface}, ${proj.color}08)`,
        border: `1px solid ${hovered ? proj.color : COLORS.muted + "33"}`,
        borderRadius: 2,
        padding: "36px 32px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 20px 60px ${proj.color}22, 0 0 0 1px ${proj.color}44`
          : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: `radial-gradient(circle, ${proj.color}15, transparent 70%)`,
          borderRadius: "0 0 0 120px",
          transition: "all 0.4s",
          transform: hovered ? "scale(1.5)" : "scale(1)",
        }}
      />
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: proj.color,
          letterSpacing: "0.2em",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        {proj.tag} &nbsp; // &nbsp; {proj.year}
      </div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 40,
          color: COLORS.text,
          letterSpacing: "0.08em",
          lineHeight: 1,
          marginBottom: 16,
          textShadow: hovered ? `0 0 20px ${proj.color}44` : "none",
          transition: "text-shadow 0.3s",
        }}
      >
        {proj.title}
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 16,
          color: COLORS.muted,
          lineHeight: 1.7,
          marginBottom: 24,
        }}
      >
        {proj.desc}
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {proj.metrics.map((m) => (
          <span
            key={m}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: proj.color,
              background: proj.color + "15",
              border: `1px solid ${proj.color}33`,
              padding: "4px 12px",
              letterSpacing: "0.08em",
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const links = [
    "hero",
    "about",
    "skills",
    "experience",
    "projects",
    "contact",
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 48px",
        background:
          "linear-gradient(to bottom, rgba(2,4,8,0.98) 0%, transparent 100%)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22,
          letterSpacing: "0.2em",
          color: COLORS.accent1,
          textShadow: `0 0 20px ${COLORS.accent1}66`,
        }}
      >
        SRIKANTH.DEV
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l}`}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: activeSection === l ? COLORS.accent1 : COLORS.muted,
              textDecoration: "none",
              transition: "color 0.3s",
              position: "relative",
            }}
          >
            {l}
            {activeSection === l && (
              <span
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: COLORS.accent1,
                  boxShadow: `0 0 8px ${COLORS.accent1}`,
                }}
              />
            )}
          </a>
        ))}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: COLORS.accent2,
          letterSpacing: "0.1em",
          border: `1px solid ${COLORS.accent2}44`,
          padding: "6px 16px",
        }}
      >
        AVAILABLE
      </div>
    </nav>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [expOpen, setExpOpen] = useState(0);
  const [copied, setCopied] = useState(false);

  const [aboutRef, aboutVisible] = useReveal();
  const [skillsRef, skillsVisible] = useReveal();
  const [expRef, expVisible] = useReveal();
  const [projRef, projVisible] = useReveal();
  const [contactRef, contactVisible] = useReveal();

  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "experience",
      "projects",
      "contact",
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("srikanth.bc@plintron.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const catColors = {
    Frontend: COLORS.accent1,
    Backend: COLORS.accent2,
    Database: COLORS.accent3,
    Testing: COLORS.gold,
    Programming_language: COLORS.gold,
  };

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        color: COLORS.text,
        cursor: "none",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#020408;}
        ::-webkit-scrollbar-thumb{background:#00ffe066;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse-ring{0%{transform:scale(0.8);opacity:0.8}100%{transform:scale(2);opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes slide-in-left{from{transform:translateX(-60px);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes dash{to{stroke-dashoffset:0}}
        @keyframes noise{
          0%{transform:translate(0,0)}10%{transform:translate(-2%,-3%)}20%{transform:translate(3%,2%)}
          30%{transform:translate(-1%,4%)}40%{transform:translate(4%,-1%)}50%{transform:translate(-3%,3%)}
          60%{transform:translate(2%,-4%)}70%{transform:translate(-4%,1%)}80%{transform:translate(3%,3%)}
          90%{transform:translate(-1%,-2%)}100%{transform:translate(0,0)}
        }
        a{color:inherit;}
        section{position:relative;}
      `}</style>

      <Cursor />
      <Scanlines />
      <ParticleField />

      {/* Noise Texture Overlay */}
      <div
        style={{
          position: "fixed",
          inset: "-50%",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.025,
          animation: "noise 0.5s steps(1) infinite",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <Nav activeSection={activeSection} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 8vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LiquidBlob
          color={COLORS.accent1}
          size={600}
          style={{ top: -100, right: -100 }}
        />
        <LiquidBlob
          color={COLORS.accent3}
          size={400}
          style={{ bottom: 50, right: "20%" }}
        />

        {/* HUD grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${COLORS.accent1}08 1px, transparent 1px), linear-gradient(90deg, ${COLORS.accent1}08 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />

        {/* HUD corner brackets */}
        {[
          { top: 80, left: 40 },
          { top: 80, right: 40 },
          { bottom: 40, left: 40 },
          { bottom: 40, right: 40 },
        ].map((pos, i) => (
          <svg
            key={i}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            style={{ position: "absolute", ...pos, opacity: 0.4 }}
          >
            {i === 0 && (
              <>
                <polyline
                  points="0,15 0,0 15,0"
                  fill="none"
                  stroke={COLORS.accent1}
                  strokeWidth="1.5"
                />
              </>
            )}
            {i === 1 && (
              <polyline
                points="15,0 30,0 30,15"
                fill="none"
                stroke={COLORS.accent1}
                strokeWidth="1.5"
              />
            )}
            {i === 2 && (
              <polyline
                points="0,15 0,30 15,30"
                fill="none"
                stroke={COLORS.accent1}
                strokeWidth="1.5"
              />
            )}
            {i === 3 && (
              <polyline
                points="15,30 30,30 30,15"
                fill="none"
                stroke={COLORS.accent1}
                strokeWidth="1.5"
              />
            )}
          </svg>
        ))}

        <div style={{ position: "relative", zIndex: 5, maxWidth: 900 }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: COLORS.accent2,
              letterSpacing: "0.3em",
              marginBottom: 24,
              opacity: 0.9,
              animation: "slide-in-left 0.8s ease 0.2s both",
            }}
          >
            // SOFTWARE ENGINEER &nbsp;&mdash;&nbsp; TELECOM DOMAIN
          </div>

          <div style={{ animation: "slide-in-left 0.8s ease 0.4s both" }}>
            <GlitchText text="SRI" />
            <GlitchText text="KANTH" color={COLORS.text} />
          </div>
          <div
            style={{
              animation: "slide-in-left 0.8s ease 0.5s both",
              marginBottom: 8,
            }}
          ></div>

          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px,2.5vw,28px)",
              color: COLORS.muted,
              fontStyle: "italic",
              letterSpacing: "0.05em",
              marginBottom: 40,
              animation: "slide-in-left 0.8s ease 0.7s both",
            }}
          >
            <Typewriter
              texts={[
                "Building scalable web apps with React",
                "Solving real-world problems in production systems",
                "From debugging APIs to crafting UI",
                "Transitioning into a focused React Developer",
              ]}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              animation: "slide-in-left 0.8s ease 0.9s both",
            }}
          >
            <a
              href="#projects"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: COLORS.bg,
                background: COLORS.accent1,
                padding: "14px 36px",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "all 0.3s",
                boxShadow: `0 0 30px ${COLORS.accent1}55`,
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = COLORS.accent1;
                e.target.style.boxShadow = `0 0 30px ${COLORS.accent1}33, inset 0 0 0 1px ${COLORS.accent1}`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = COLORS.accent1;
                e.target.style.color = COLORS.bg;
                e.target.style.boxShadow = `0 0 30px ${COLORS.accent1}55`;
              }}
            >
              View Work
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: COLORS.accent2,
                border: `1px solid ${COLORS.accent2}66`,
                padding: "14px 36px",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "all 0.3s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = COLORS.accent2 + "15";
                e.target.style.boxShadow = `0 0 20px ${COLORS.accent2}33`;
                e.target.style.borderColor = COLORS.accent2;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.boxShadow = "none";
                e.target.style.borderColor = COLORS.accent2 + "66";
              }}
            >
              Hire Me
            </a>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 60,
              paddingTop: 40,
              borderTop: `1px solid ${COLORS.muted}22`,
              animation: "slide-in-left 0.8s ease 1.1s both",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "1.5+", label: "Years Experience" },
              { num: "4+", label: "Projects Built" },
              { num: "MERN", label: "Tech Stack" },
              { num: "API", label: "Testing & Debugging" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 42,
                    color: COLORS.accent1,
                    lineHeight: 1,
                    textShadow: `0 0 20px ${COLORS.accent1}44`,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    color: COLORS.muted,
                    letterSpacing: "0.1em",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: COLORS.muted,
              letterSpacing: "0.3em",
              writingMode: "vertical-rl",
              textTransform: "uppercase",
            }}
          >
            Scroll Down
          </div>
          <div
            style={{
              width: 1,
              height: 60,
              background: `linear-gradient(${COLORS.accent1}, transparent)`,
            }}
          />
        </div>
      </section>

      {/* Marquee */}
      <div
        style={{
          background: COLORS.accent1,
          overflow: "hidden",
          padding: "12px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 0,
            animation: "marquee 20s linear infinite",
            width: "max-content",
          }}
        >
          {[...Array(3)].map((_, ri) =>
            [
              "React",
              "SQL",
              "Node.js",
              "MongoDB",
              "Java",
              "Manual Testing",
              "Postgers SQL",
              "Figma",
            ].map((t, i) => (
              <span
                key={`${ri}-${i}`}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 15,
                  letterSpacing: "0.2em",
                  color: COLORS.bg,
                  padding: "0 32px",
                  borderRight: `1px solid ${COLORS.bg}33`,
                }}
              >
                {t}
              </span>
            )),
          )}
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}`}</style>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section
        id="about"
        ref={aboutRef}
        style={{ padding: "120px 8vw", position: "relative", zIndex: 5 }}
      >
        <LiquidBlob
          color={COLORS.accent2}
          size={500}
          style={{ bottom: -100, left: -100, opacity: 0.5 }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div
            style={{
              opacity: aboutVisible ? 1 : 0,
              transform: aboutVisible ? "translateX(0)" : "translateX(-50px)",
              transition: "all 0.9s ease",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                color: COLORS.accent2,
                letterSpacing: "0.3em",
                marginBottom: 16,
              }}
            >
              // 001 &nbsp; ABOUT
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px,6vw,72px)",
                color: COLORS.text,
                lineHeight: 1,
                marginBottom: 32,
                letterSpacing: "0.04em",
              }}
            >
              BUILDING
              <br />
              <span style={{ color: COLORS.accent2 }}>TOMORROW'S</span>
              WEB TODAY
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
                color: COLORS.muted,
                lineHeight: 1.9,
                marginBottom: 24,
              }}
            >
              I'm a Full Stack Developer focused on building scalable web
              applications using React, JavaScript, and backend technologies. I
              work on real-world systems where performance, reliability, and
              clean architecture matter.
            </p>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
                color: COLORS.muted,
                lineHeight: 1.9,
              }}
            >
              Currently working in a telecom domain, I handle API testing,
              debugging, and backend workflows. I'm actively transitioning into
              a React Developer role, combining frontend skills with backend
              knowledge to build complete and efficient applications.
            </p>
          </div>

          <div
            style={{
              opacity: aboutVisible ? 1 : 0,
              transform: aboutVisible ? "translateX(0)" : "translateX(50px)",
              transition: "all 0.9s ease 0.3s",
            }}
          >
            {/* Info card */}
            <div
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.muted}22`,
                padding: 40,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${COLORS.accent1}, ${COLORS.accent3}, ${COLORS.accent2})`,
                }}
              />
              {[
                { label: "Location", value: "Tamil Nadu, India" },
                { label: "Timezone", value: "IST (UTC+5:30)" },
                {
                  label: "Availability",
                  value: "Open to work",
                  highlight: true,
                },
                { label: "Focus", value: "Full Stack & React Developer" },
                { label: "Languages", value: "English, Tamil" },
                {
                  label: "Education",
                  value: "BE Computer Science Engineering",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom:
                      i < 5 ? `1px solid ${COLORS.muted}15` : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 11,
                      color: COLORS.muted,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 12,
                      color: item.highlight ? COLORS.accent2 : COLORS.text,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────── */}
      <section
        id="skills"
        ref={skillsRef}
        style={{ padding: "120px 8vw", position: "relative", zIndex: 5 }}
      >
        <div
          style={{
            opacity: skillsVisible ? 1 : 0,
            transform: skillsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            marginBottom: 64,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: COLORS.accent1,
              letterSpacing: "0.3em",
              marginBottom: 16,
            }}
          >
            // 002 &nbsp; ARSENAL
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px,6vw,72px)",
              color: COLORS.text,
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            SKILLS &amp;{" "}
            <span style={{ color: COLORS.accent1 }}>EXPERTISE</span>
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}
        >
          {Object.entries(
            SKILLS.reduce((acc, s) => {
              if (!acc[s.cat]) acc[s.cat] = [];
              acc[s.cat].push(s);
              return acc;
            }, {}),
          ).map(([cat, skills], ci) => (
            <div key={cat}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 20,
                  color: catColors[cat] || COLORS.accent1,
                  letterSpacing: "0.2em",
                  marginBottom: 28,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    background: catColors[cat] || COLORS.accent1,
                    boxShadow: `0 0 10px ${catColors[cat] || COLORS.accent1}`,
                  }}
                />
                {cat}
              </div>
              {skills.map((s, i) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  color={catColors[s.cat] || COLORS.accent1}
                  delay={ci * 0.1 + i * 0.08}
                  visible={skillsVisible}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────── */}
      <section
        id="experience"
        ref={expRef}
        style={{ padding: "120px 8vw", position: "relative", zIndex: 5 }}
      >
        <LiquidBlob
          color={COLORS.accent3}
          size={400}
          style={{ top: 0, right: 0 }}
        />
        <div
          style={{
            opacity: expVisible ? 1 : 0,
            transform: expVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            marginBottom: 64,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: COLORS.accent3,
              letterSpacing: "0.3em",
              marginBottom: 16,
            }}
          >
            // 003 &nbsp; EXPERIENCE
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px,6vw,72px)",
              color: COLORS.text,
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            CAREER <span style={{ color: COLORS.accent3 }}>TIMELINE</span>
          </div>
        </div>

        <div style={{ position: "relative", paddingLeft: 32 }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(to bottom, ${COLORS.accent3}, ${COLORS.accent1}, ${COLORS.accent2})`,
              opacity: expVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.5s",
            }}
          />

          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              style={{
                marginBottom: 4,
                opacity: expVisible ? 1 : 0,
                transform: expVisible ? "translateX(0)" : "translateX(30px)",
                transition: `all 0.7s ease ${i * 0.2}s`,
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: -4,
                  marginTop: 28,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: exp.color,
                  boxShadow: `0 0 15px ${exp.color}`,
                }}
              />

              <div
                onClick={() => setExpOpen(expOpen === i ? -1 : i)}
                style={{
                  background:
                    expOpen === i
                      ? `linear-gradient(135deg, ${COLORS.surface}, ${exp.color}08)`
                      : COLORS.surface,
                  border: `1px solid ${expOpen === i ? exp.color + "44" : COLORS.muted + "22"}`,
                  padding: "28px 36px",
                  marginBottom: 4,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {expOpen === i && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: exp.color,
                      boxShadow: `0 0 10px ${exp.color}`,
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 26,
                        color: COLORS.text,
                        letterSpacing: "0.06em",
                        lineHeight: 1.1,
                      }}
                    >
                      {exp.role}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 12,
                        color: exp.color,
                        marginTop: 4,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {exp.company}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 11,
                        color: COLORS.muted,
                        letterSpacing: "0.1em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.period}
                    </span>
                    <span
                      style={{
                        color: exp.color,
                        fontSize: 20,
                        transform:
                          expOpen === i ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                        fontFamily: "'Space Mono', monospace",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>

                {expOpen === i && (
                  <div
                    style={{
                      marginTop: 24,
                      paddingTop: 24,
                      borderTop: `1px solid ${COLORS.muted}22`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 17,
                        color: COLORS.muted,
                        lineHeight: 1.9,
                        marginBottom: 20,
                      }}
                    >
                      {exp.desc}
                    </p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {exp.stack.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 11,
                            color: exp.color,
                            background: exp.color + "12",
                            border: `1px solid ${exp.color}33`,
                            padding: "4px 14px",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────── */}
      <section
        id="projects"
        ref={projRef}
        style={{ padding: "120px 8vw", position: "relative", zIndex: 5 }}
      >
        <div
          style={{
            opacity: projVisible ? 1 : 0,
            transform: projVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            marginBottom: 64,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: COLORS.gold,
              letterSpacing: "0.3em",
              marginBottom: 16,
            }}
          >
            // 004 &nbsp; SELECTED WORK
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px,6vw,72px)",
              color: COLORS.text,
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            PROJECTS THAT <span style={{ color: COLORS.gold }}>DEFINE ME</span>
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
        >
          {PROJECTS.map((proj, i) => (
            <ProjectCard
              key={proj.title}
              proj={proj}
              index={i}
              visible={projVisible}
            />
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section
        id="contact"
        ref={contactRef}
        style={{ padding: "120px 8vw 80px", position: "relative", zIndex: 5 }}
      >
        <LiquidBlob
          color={COLORS.accent1}
          size={500}
          style={{ top: -50, right: -80 }}
        />
        <LiquidBlob
          color={COLORS.accent2}
          size={300}
          style={{ bottom: 0, left: "30%" }}
        />

        <div
          style={{
            textAlign: "center",
            maxWidth: 800,
            margin: "0 auto",
            opacity: contactVisible ? 1 : 0,
            transform: contactVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: COLORS.accent1,
              letterSpacing: "0.3em",
              marginBottom: 16,
            }}
          >
            // 005 &nbsp; CONTACT
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px,8vw,100px)",
              color: COLORS.text,
              letterSpacing: "0.04em",
              lineHeight: 1,
              marginBottom: 24,
            }}
          >
            LET'S BUILD
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: `1px ${COLORS.accent1}`,
                textShadow: `0 0 40px ${COLORS.accent1}33`,
              }}
            >
              SOMETHING
            </span>
            <br />
            LEGENDARY
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              color: COLORS.muted,
              fontStyle: "italic",
              lineHeight: 1.7,
              marginBottom: 52,
            }}
          >
            Open to React Developer roles,Software engineer ,Frontened
            develoepes,Testing related roles.
          </p>

          <button
            onClick={copyEmail}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 24,
              letterSpacing: "0.15em",
              color: copied ? COLORS.bg : COLORS.accent1,
              background: copied ? COLORS.accent1 : "transparent",
              border: `1px solid ${COLORS.accent1}66`,
              padding: "20px 52px",
              cursor: "pointer",
              transition: "all 0.3s",
              marginBottom: 52,
              boxShadow: copied ? `0 0 40px ${COLORS.accent1}55` : "none",
              display: "block",
              width: "100%",
              maxWidth: 400,
              margin: "0 auto 52px",
            }}
          >
            {copied ? "COPIED!" : "srikanthbala24@gmail.com"}
          </button>

          {/* Social links */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            {[
              { label: "GitHub", url: "https://github.com/Sri2413/" },
              {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/srikanth-b-8654a8237/",
              },
              {
                label: "Leetcode",
                url: "https://leetcode.com/u/srikanthbala24/",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: COLORS.muted,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                  paddingBottom: 4,
                  borderBottom: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = COLORS.accent1;
                  e.target.style.borderBottomColor = COLORS.accent1;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = COLORS.muted;
                  e.target.style.borderBottomColor = "transparent";
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "40px 8vw",
          borderTop: `1px solid ${COLORS.muted}15`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: COLORS.muted,
            letterSpacing: "0.1em",
          }}
        >
          2026 &nbsp; SRIKANTH &nbsp; // &nbsp; ALL SYSTEMS OPERATIONAL
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: COLORS.accent1,
            letterSpacing: "0.1em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: COLORS.accent1,
              boxShadow: `0 0 8px ${COLORS.accent1}`,
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          ONLINE
        </span>
      </footer>
    </div>
  );
}
