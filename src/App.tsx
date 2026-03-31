import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const heroLine = "Hey Farah... I know today wasn't easy.";
const surpriseLine = "I made this... just so you know you're not alone today.\n- Marouane";

function Typewriter({ text, speed = 55, start = 0 }: { text: string; speed?: number; start?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let timer = 0;

    const timeout = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setCount((value) => {
          if (value >= text.length) {
            window.clearInterval(timer);
            return value;
          }
          return value + 1;
        });
      }, speed);
    }, start);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(timer);
    };
  }, [text, speed, start]);

  return (
    <span>
      {text.slice(0, count)}
      <span className="typing-cursor">|</span>
    </span>
  );
}

export default function App() {
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const stars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        top: `${(index * 13) % 100}%`,
        delay: `${(index % 7) * 0.6}s`,
        duration: `${3 + (index % 5)}s`,
      })),
    []
  );

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative overflow-x-clip bg-[#0a0820] text-rose-50">
      <div
        className="pointer-events-none fixed z-40 hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300/25 blur-3xl md:block"
        style={{ left: mouse.x, top: mouse.y }}
      />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 md:px-10">
        <div className="hero-gradient absolute inset-0" />
        <div className="absolute inset-0 opacity-80">
          {stars.map((star) => (
            <span
              key={star.id}
              className="star"
              style={{ left: star.left, top: star.top, animationDelay: star.delay, animationDuration: star.duration }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <p className="mb-4 text-sm tracking-[0.35em] text-rose-100/80">FOR FARAH</p>
          <h1 className="text-balance text-3xl leading-tight font-semibold md:text-5xl">
            <Typewriter text={heroLine} />
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base text-rose-100/85 md:text-lg">
            From Marouane, with calm, warmth, and a little corner of the night just for you.
          </p>
          <a
            href="#message"
            className="mt-10 rounded-full border border-rose-100/35 bg-white/10 px-7 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-xl transition hover:bg-white/20"
          >
            Click me if you need a smile
          </a>
        </motion.div>
      </section>

      <section id="message" className="relative px-6 py-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl rounded-3xl border border-white/25 bg-white/10 p-8 shadow-[0_0_80px_rgba(249,168,212,0.2)] backdrop-blur-xl md:p-10"
        >
          <h2 className="text-2xl font-semibold md:text-3xl">A little reminder</h2>
          <p className="mt-4 text-lg leading-relaxed text-rose-50/90">
            You&apos;re stronger than you think. Even on your worst days, you&apos;re still someone who brings light to others.
          </p>
          <div className="mt-6 flex gap-3" aria-hidden>
            <span className="spark float-soft" />
            <span className="spark float-soft" style={{ animationDelay: "0.7s" }} />
            <span className="spark float-soft" style={{ animationDelay: "1.2s" }} />
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">Why you matter</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "You make conversations feel like home",
              "Your smile = illegal weapon",
              "You bring calm into chaos",
              "You make people feel understood",
              "Your presence softens heavy moments",
              "You remind the world to be gentle",
            ].map((reason) => (
              <motion.div
                key={reason}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl"
              >
                <p className="text-base text-rose-50/95">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">Take a breath... this moment is yours</h2>
          <div className="w-full overflow-hidden rounded-3xl border border-white/20 bg-black/30 p-3 shadow-[0_0_50px_rgba(45,212,191,0.22)] backdrop-blur-xl">
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/jfKfPfyJRdk"
                title="Calm lofi music"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div className="equalizer" aria-hidden>
            {Array.from({ length: 16 }).map((_, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.12}s` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center md:px-10">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSurpriseOpen(true)}
          className="rounded-full border border-fuchsia-200/40 bg-fuchsia-100/10 px-8 py-3 text-base font-medium backdrop-blur-xl transition hover:bg-fuchsia-100/20"
        >
          One more thing...
        </motion.button>
      </section>

      <section className="relative overflow-hidden px-6 pb-28 text-center md:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,114,182,0.25),transparent_60%),radial-gradient(circle_at_20%_80%,rgba(125,211,252,0.2),transparent_45%)]" />
        <span className="float-orb left-[14%] top-16 h-16 w-16" />
        <span className="float-orb right-[16%] top-28 h-12 w-12" style={{ animationDelay: "1.2s" }} />
        <span className="float-orb bottom-6 left-[50%] h-14 w-14" style={{ animationDelay: "0.6s" }} />
        <p className="mx-auto max-w-3xl text-balance text-4xl leading-tight font-semibold text-rose-50/95 md:text-6xl">
          Tomorrow will be kinder. And I&apos;ll still be here.
        </p>
      </section>

      <AnimatePresence>
        {surpriseOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#05030f]/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-xl rounded-3xl border border-violet-200/40 bg-violet-200/10 p-8 text-center shadow-[0_0_90px_rgba(236,72,153,0.3)]"
            >
              <p className="surprise-glow whitespace-pre-line text-xl leading-relaxed text-rose-50 md:text-2xl">
                <Typewriter text={surpriseLine} speed={45} start={150} />
              </p>
              <button
                onClick={() => setSurpriseOpen(false)}
                className="mt-8 rounded-full border border-white/40 px-5 py-2 text-sm text-white/90 transition hover:bg-white/15"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
