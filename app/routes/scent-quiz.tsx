import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { STATIC_PRODUCTS } from "~/lib/products";

export const meta: MetaFunction = () => [
  { title: "Find Your Scent — La'maan London" },
  { name: "description", content: "A short ritual to find the candle that belongs in your space." },
];

type Handle = "white-musk" | "lavender" | "rose" | "black-oud-vanilla";

const QUESTIONS: Array<{
  question: string;
  options: Array<{ text: string; sub: string; handle: Handle }>;
}> = [
  {
    question: "Describe your ideal moment of stillness.",
    options: [
      { text: "Crisp white linen, morning light.", sub: "Nothing out of place.", handle: "white-musk" },
      { text: "A garden just after rain.", sub: "Barefoot, unhurried.", handle: "lavender" },
      { text: "The hour before guests arrive.", sub: "Anticipation, warmth.", handle: "rose" },
      { text: "A fire burning low, past midnight.", sub: "Just you and the dark.", handle: "black-oud-vanilla" },
    ],
  },
  {
    question: "What do you wear on a night that matters?",
    options: [
      { text: "Something effortless.", sub: "Barely there. Intentional.", handle: "white-musk" },
      { text: "Natural fabric, clean lines.", sub: "Quiet confidence.", handle: "lavender" },
      { text: "Deep colour. Something with weight.", sub: "You are the room.", handle: "rose" },
      { text: "All black. Nothing else.", sub: "The statement is the absence.", handle: "black-oud-vanilla" },
    ],
  },
  {
    question: "Your space, at its best, smells of…",
    options: [
      { text: "Nothing. It is clean air.", sub: "Presence without announcement.", handle: "white-musk" },
      { text: "Something botanical, faintly herbal.", sub: "A living thing nearby.", handle: "lavender" },
      { text: "Flowers cut this morning.", sub: "Full. Unapologetic.", handle: "rose" },
      { text: "Incense. Wood. Old books.", sub: "Time and intention.", handle: "black-oud-vanilla" },
    ],
  },
];

const TOTAL = QUESTIONS.length;

function computeResult(ans: Handle[]): Handle {
  const tally: Record<Handle, number> = {
    "white-musk": 0,
    "lavender": 0,
    "rose": 0,
    "black-oud-vanilla": 0,
  };
  ans.forEach((h) => tally[h]++);
  return Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0] as Handle;
}

function Result({ handle, onRetake }: { handle: Handle; onRetake: () => void }) {
  const product = STATIC_PRODUCTS.find((p) => p.handle === handle) ?? STATIC_PRODUCTS[0];

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="flex flex-col items-center text-center max-w-lg mx-auto"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-[11px] tracking-[0.35em] uppercase text-[#B59410] mb-8"
      >
        Your Scent
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="w-56 aspect-[3/4] overflow-hidden mb-10 mx-auto"
      >
        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-serif text-5xl text-white mb-4"
      >
        {product.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="font-serif text-[#B09070] text-lg leading-relaxed mb-3"
      >
        {product.shortDescription}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.7 }}
        className="text-white/40 text-sm mb-10"
      >
        {product.fragranceNotes.top} · {product.fragranceNotes.heart} · {product.fragranceNotes.base}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.7 }}
        className="flex flex-col sm:flex-row gap-3 w-full"
      >
        <Link
          to={`/products/${product.handle}`}
          className="flex-1 bg-white text-[#0A0A0A] text-[11px] tracking-[0.25em] uppercase py-4 px-6 hover:bg-[#B59410] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
        >
          Shop This Scent <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={onRetake}
          className="flex-1 border border-white/20 text-white/50 text-[11px] tracking-[0.25em] uppercase py-4 px-6 hover:border-white/40 hover:text-white/80 transition-all duration-300"
        >
          Retake Quiz
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function ScentQuiz() {
  const [step, setStep] = useState<"intro" | number | "result">("intro");
  const [answers, setAnswers] = useState<Handle[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [resultHandle, setResultHandle] = useState<Handle>("white-musk");

  const currentQ = typeof step === "number" ? QUESTIONS[step] : null;
  const progress = step === "intro" ? 0 : step === "result" ? 1 : (step as number) / TOTAL;

  function handleAnswer(handle: Handle, idx: number) {
    setChosen(idx);
    setTimeout(() => {
      // Use functional update so we always have fresh state
      setAnswers((prev) => {
        const next = [...prev, handle];
        if (next.length >= TOTAL) {
          setResultHandle(computeResult(next));
          setStep("result");
        } else {
          setStep(next.length);
        }
        return next;
      });
      setChosen(null);
    }, 420);
  }

  function handleRetake() {
    setAnswers([]);
    setChosen(null);
    setResultHandle("white-musk");
    setStep("intro");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Gold progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[1px] bg-white/8">
        <motion.div
          className="h-full bg-[#B59410]"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-32">
        <AnimatePresence mode="wait">

          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-md mx-auto"
            >
              <p className="text-[11px] tracking-[0.35em] uppercase text-[#B59410] mb-6">
                A Scent Ritual
              </p>
              <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
                Find your scent.
              </h1>
              <p className="text-white/40 text-sm leading-relaxed mb-12 max-w-xs mx-auto">
                Three questions. No wrong answers. Just the candle that belongs in your space.
              </p>
              <button
                onClick={() => setStep(0)}
                className="group inline-flex items-center gap-3 border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:border-[#B59410] hover:text-[#B59410] transition-all duration-300"
              >
                Begin
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <div className="mt-10">
                <Link
                  to="/collections"
                  className="text-[10px] tracking-[0.2em] uppercase text-white/20 hover:text-white/50 transition-colors"
                >
                  Skip — Browse all scents
                </Link>
              </div>
            </motion.div>
          )}

          {currentQ && typeof step === "number" && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="text-center mb-14">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 mb-5">
                  {step + 1} of {TOTAL}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-white leading-snug">
                  {currentQ.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, i) => (
                  <motion.button
                    key={`${step}-${i}`}
                    onClick={() => chosen === null && handleAnswer(opt.handle, i)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                    className={`text-left p-6 border transition-all duration-300 group ${
                      chosen === i
                        ? "border-[#B59410] bg-[#B59410]/8"
                        : "border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
                    }`}
                  >
                    <p className={`font-serif text-lg mb-1.5 transition-colors duration-300 ${
                      chosen === i ? "text-[#B59410]" : "text-white"
                    }`}>
                      {opt.text}
                    </p>
                    <p className="text-white/35 text-xs leading-relaxed">{opt.sub}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <Result key="result" handle={resultHandle} onRetake={handleRetake} />
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
