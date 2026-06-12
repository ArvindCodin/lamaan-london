import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

export const meta: MetaFunction = () => [
  { title: "The Film — La'maan London" },
  { name: "description", content: "Four scents. One ritual. Watch the La'maan London film." },
];

interface Scene {
  id: string;
  duration: number;
  bgImage?: string;
  bgGradient?: string;
  bgPos?: string;
  candle?: string;
  headline: string | null;
  subline: string;
  tag: string | null;
  accent: string;
  cta?: boolean;
}

const SCENES: Scene[] = [
  {
    id: "open",
    duration: 4000,
    bgImage: "/images/film-open.webp",
    bgPos: "center 40%",
    headline: null,
    subline: "Some spaces speak\nbefore anyone does.",
    tag: null,
    accent: "#B59410",
  },
  {
    id: "intro",
    duration: 5000,
    bgImage: "/images/film-open.webp",
    bgPos: "center 30%",
    candle: "/images/candle-tumbler-nobg.webp",
    headline: "La\u2019maan London",
    subline: "Four scents. One ritual.",
    tag: null,
    accent: "#B59410",
  },
  {
    id: "oud",
    duration: 6500,
    bgImage: "/images/film-oud.webp",
    bgPos: "center center",
    candle: "/images/candle-tumbler-nobg.webp",
    headline: "Black Oud & Vanilla",
    subline: "For the night you\nnever want to end.",
    tag: "Scent I",
    accent: "#C8860A",
  },
  {
    id: "lavender",
    duration: 6500,
    bgImage: "/images/film-lavender.webp",
    bgPos: "center center",
    candle: "/images/candle-33mm-nobg.webp",
    headline: "Lavender",
    subline: "The quiet before\neverything makes sense.",
    tag: "Scent II",
    accent: "#9B7FC4",
  },
  {
    id: "rose",
    duration: 6500,
    bgImage: "/images/film-rose.webp",
    bgPos: "center center",
    candle: "/images/candle-36mm-nobg.webp",
    headline: "Rose",
    subline: "Intimacy without\nexplanation.",
    tag: "Scent III",
    accent: "#C4607F",
  },
  {
    id: "musk",
    duration: 6500,
    bgImage: "/images/film-musk.webp",
    bgPos: "center center",
    candle: "/images/candle-39mm-nobg.webp",
    headline: "White Musk",
    subline: "Clean enough to be felt,\nnot just smelled.",
    tag: "Scent IV",
    accent: "#C8C0B0",
  },
  {
    id: "outro",
    duration: 8000,
    bgImage: "/images/film-open.webp",
    bgPos: "center 30%",
    headline: "La\u2019maan London",
    subline: "Crafted in London · Matte Black Ceramic · £35",
    tag: null,
    accent: "#B59410",
    cta: true,
  },
];

function FlameGlow({ color, size = "md" }: { color: string; size?: "sm" | "md" | "lg" }) {
  const dims = { sm: { w: 14, h: 26, core: 5, coreH: 11 }, md: { w: 18, h: 34, core: 6, coreH: 14 }, lg: { w: 22, h: 42, core: 8, coreH: 18 } }[size];

  return (
    <motion.div
      className="pointer-events-none"
      style={{ width: dims.w, height: dims.h, position: "relative" }}
      animate={{
        scaleX: [1, 1.07, 0.93, 1.05, 0.97, 1],
        scaleY: [1, 0.97, 1.06, 0.94, 1.03, 1],
        y: [0, -1.5, 0.5, -1, 0.8, 0],
        opacity: [0.92, 1, 0.88, 1, 0.9, 0.92],
      }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
    >
      {/* Outer warm bloom */}
      <div style={{
        position: "absolute",
        inset: `-${dims.w * 0.7}px`,
        background: `radial-gradient(ellipse at 50% 60%, ${color}40 0%, ${color}18 50%, transparent 75%)`,
        borderRadius: "50%",
        filter: "blur(8px)",
      }} />
      {/* Flame body */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at 50% 72%, #fffbea 0%, #ffe484 20%, ${color}dd 55%, ${color}66 80%, transparent 100%)`,
        clipPath: "polygon(50% 0%, 70% 28%, 85% 58%, 72% 80%, 50% 100%, 28% 80%, 15% 58%, 30% 28%)",
        filter: "blur(0.8px)",
      }} />
      {/* Inner bright core */}
      <div style={{
        position: "absolute",
        left: "50%",
        bottom: "18%",
        transform: "translateX(-50%)",
        width: dims.core,
        height: dims.coreH,
        background: "radial-gradient(ellipse at 50% 60%, #ffffff 0%, #fffde4 55%, transparent 100%)",
        borderRadius: "50% 50% 35% 35%",
      }} />
    </motion.div>
  );
}

function CandleWithFlame({
  src,
  alt,
  accent,
  className,
  animDelay = 0,
  phase,
  minPhase = 1,
  flameSize = "md",
}: {
  src: string;
  alt: string;
  accent: string;
  className?: string;
  animDelay?: number;
  phase: number;
  minPhase?: number;
  flameSize?: "sm" | "md" | "lg";
}) {
  return (
    <motion.div
      className="relative flex-shrink-0 flex flex-col items-center"
      initial={{ opacity: 0, y: 36, scale: 0.92 }}
      animate={
        phase >= minPhase
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 36, scale: 0.92 }
      }
      transition={{ duration: 1.8, delay: animDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Flame sits here — aligned to top of candle image */}
      <div className="flex justify-center" style={{ marginBottom: "-4px", zIndex: 2, position: "relative" }}>
        <FlameGlow color={accent} size={flameSize} />
      </div>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          filter: `drop-shadow(0 0 35px ${accent}50) drop-shadow(0 10px 28px rgba(0,0,0,0.75))`,
          position: "relative",
          zIndex: 1,
        }}
      />
    </motion.div>
  );
}

export default function ProductVideo() {
  const [mounted, setMounted] = useState(false);
  const [scene, setScene] = useState(0);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const goTo = useCallback((idx: number) => { setScene(idx); setPhase(0); }, []);
  const advance = useCallback(() => { setScene((s) => (s + 1) % SCENES.length); setPhase(0); }, []);

  useEffect(() => {
    setPhase(0);
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [scene]);

  useEffect(() => {
    if (paused) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(advance, SCENES[scene].duration);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scene, paused, advance]);

  const cur = SCENES[scene];

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#0A0A0A]" style={{ zIndex: 40 }} />;
  }

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] overflow-hidden" style={{ zIndex: 40 }}>

      {/* ── Film grain texture ── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
          zIndex: 50,
        }}
      />

      {/* ── Photo background ── */}
      <AnimatePresence mode="sync">
        {cur.bgImage && (
          <motion.div
            key={`bg-${cur.id}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={cur.bgImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: cur.bgPos ?? "center" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Gradient background ── */}
      <AnimatePresence mode="sync">
        {cur.bgGradient && (
          <motion.div
            key={`grad-${cur.id}`}
            className="absolute inset-0"
            style={{ background: cur.bgGradient }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ── Cinematic overlays ── */}
      <div className="absolute inset-0 bg-[#050505]/50 pointer-events-none" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/25 pointer-events-none" style={{ zIndex: 2 }} />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" style={{ zIndex: 2 }} />
      {/* Vignette sides */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(5,5,5,0.6) 100%)", zIndex: 2 }} />

      {/* ── Scenes ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 px-6" style={{ zIndex: 10 }}>
        <AnimatePresence mode="popLayout">

          {/* Open — "Some spaces speak before anyone does" */}
          {cur.id === "open" && (
            <motion.div key="open" className="text-center max-w-2xl"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}>
              {/* Thin gold rule */}
              <motion.div
                className="mx-auto mb-8"
                style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #B59410, transparent)" }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={phase >= 1 ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.p
                className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={phase >= 1 ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(8px)" }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                {cur.subline.split("\n").map((l, i) => (
                  <span key={i} className={`block ${i === 1 ? "text-[#B59410] italic" : ""}`}>{l}</span>
                ))}
              </motion.p>
              <motion.p
                className="mt-6 text-[10px] tracking-[0.35em] uppercase text-white/35 font-sans"
                initial={{ opacity: 0 }}
                animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                La'maan London
              </motion.p>
            </motion.div>
          )}

          {/* Intro */}
          {cur.id === "intro" && (
            <motion.div key="intro" className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}>
              <CandleWithFlame
                src={cur.candle!}
                alt="La'maan London candle"
                accent={cur.accent}
                className="w-36 md:w-52 object-contain"
                phase={phase}
                flameSize="md"
              />
              <motion.p
                className="text-[10px] tracking-[0.4em] uppercase mt-6 mb-2 font-sans"
                style={{ color: cur.accent }}
                initial={{ opacity: 0, y: 10 }}
                animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.9 }}
              >
                {cur.subline}
              </motion.p>
              <motion.h1
                className="font-serif text-5xl md:text-7xl text-white leading-none"
                initial={{ opacity: 0, y: 14 }}
                animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {cur.headline}
              </motion.h1>
            </motion.div>
          )}

          {/* Scent scenes — each fragrance */}
          {["oud", "lavender", "rose", "musk"].includes(cur.id) && (
            <motion.div
              key={cur.id}
              className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.85 }}
            >
              <CandleWithFlame
                src={cur.candle!}
                alt={cur.headline!}
                accent={cur.accent}
                className="w-[32vw] max-w-[200px] min-w-[120px] object-contain"
                phase={phase}
                flameSize="lg"
              />

              <div className="text-left max-w-xs md:max-w-sm">
                <motion.p
                  className="text-[10px] tracking-[0.45em] uppercase mb-3 font-sans"
                  style={{ color: cur.accent }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {cur.tag}
                </motion.p>
                <motion.h2
                  className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-none mb-5"
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={phase >= 2 ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 22, filter: "blur(6px)" }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {cur.headline}
                </motion.h2>
                {/* Gold divider */}
                <motion.div
                  className="mb-5"
                  style={{ width: 32, height: 1, background: cur.accent, opacity: 0.6 }}
                  initial={{ scaleX: 0 }}
                  animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.p
                  className="font-serif italic text-white/55 text-lg md:text-xl leading-relaxed"
                  initial={{ opacity: 0, y: 12 }}
                  animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {cur.subline.split("\n").map((l, i) => <span key={i} className="block">{l}</span>)}
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* Outro — all four fragrances together */}
          {cur.id === "outro" && (
            <motion.div key="outro" className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}>

              {/* Four candles — consistent sizing, staggered entry */}
              <motion.div
                className="flex items-end justify-center gap-6 md:gap-10 mb-10"
                initial={{ opacity: 0 }}
                animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {[
                  { src: "/images/candle-tumbler-nobg.webp", name: "Black Oud", accent: "#C8860A" },
                  { src: "/images/candle-33mm-nobg.webp",    name: "Lavender",  accent: "#9B7FC4" },
                  { src: "/images/candle-36mm-nobg.webp",    name: "Rose",      accent: "#C4607F" },
                  { src: "/images/candle-39mm-nobg.webp",    name: "White Musk",accent: "#C8C0B0" },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1.6, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <FlameGlow color={c.accent} size="sm" />
                    <img
                      src={c.src}
                      alt={`La'maan London — ${c.name}`}
                      className="h-28 md:h-36 w-auto object-contain"
                      style={{ filter: `drop-shadow(0 0 22px ${c.accent}40) drop-shadow(0 8px 20px rgba(0,0,0,0.7))`, marginTop: "-2px" }}
                    />
                    <motion.p
                      className="mt-3 text-[8px] tracking-[0.3em] uppercase font-sans"
                      style={{ color: c.accent, opacity: 0.75 }}
                      initial={{ opacity: 0 }}
                      animate={phase >= 2 ? { opacity: 0.75 } : { opacity: 0 }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                    >
                      {c.name}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.h1
                className="font-serif text-4xl md:text-6xl text-white mb-2"
                initial={{ opacity: 0, y: 16 }}
                animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {cur.headline}
              </motion.h1>

              <motion.p
                className="text-white/35 font-sans tracking-[0.22em] uppercase text-[9px] mb-8"
                initial={{ opacity: 0 }}
                animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {cur.subline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.9 }}
              >
                <Link
                  to="/collections"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block bg-[#B59410] text-[#0A0A0A] px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
                >
                  Shop the Collection
                </Link>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8" style={{ zIndex: 20 }}>
        <motion.div
          className="h-full"
          key={`p-${scene}`}
          style={{ backgroundColor: cur.accent, transformOrigin: "left", width: "100%" }}
          initial={{ scaleX: 0 }}
          animate={paused ? {} : { scaleX: 1 }}
          transition={{ duration: SCENES[scene].duration / 1000, ease: "linear" }}
        />
      </div>

      {/* ── Scene dots ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 items-center" style={{ zIndex: 21 }}>
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === scene ? "20px" : "4px",
              height: "4px",
              backgroundColor: i === scene ? cur.accent : "rgba(255,255,255,0.2)",
            }}
            aria-label={`Scene ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Pause on click ── */}
      <button
        className="absolute inset-0 cursor-pointer"
        style={{ background: "transparent", zIndex: 9 }}
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play" : "Pause"}
      />

      <AnimatePresence>
        {paused && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ zIndex: 50 }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/15">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back ── */}
      <div className="absolute top-6 right-6" style={{ zIndex: 60 }}>
        <Link
          to="/"
          onClick={(e) => e.stopPropagation()}
          className="text-white/25 hover:text-white/70 text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 font-sans"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
