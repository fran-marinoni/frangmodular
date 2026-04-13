import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import claimLeft from "@/assets/home/claim-left.webp";
import claimRight from "@/assets/home/claim-right.webp";

const WORDS = ["MODULARIDAD", "FUNCIONALIDAD", "VIDA", "COMODIDAD"];
const TRANSITION_COOLDOWN = 800;
const SCROLL_THRESHOLD = 40;
const LAST_WORD_HOLD = 1200;

const ModularitySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [direction, setDirection] = useState(1);
  const accumulatedDelta = useRef(0);
  const lastTransition = useRef(0);
  const hasEnteredView = useRef(false);
  const lastWordReachedAt = useRef(0);

  const checkIfInLockZone = useCallback(() => {
    if (!sectionRef.current) return false;
    const rect = sectionRef.current.getBoundingClientRect();
    const viewportH = window.innerHeight;
    return rect.top <= viewportH * 0.15 && rect.bottom >= viewportH * 0.7;
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const inZone = checkIfInLockZone();
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (!inZone) {
        if (isLocked) setIsLocked(false);
        hasEnteredView.current = false;
        lastWordReachedAt.current = 0;
        accumulatedDelta.current = 0;
        return;
      }

      let currentIndex = wordIndex;

      if (!hasEnteredView.current) {
        hasEnteredView.current = true;
        currentIndex = scrollingDown ? 0 : WORDS.length - 1;
        if (currentIndex !== wordIndex) setWordIndex(currentIndex);
        accumulatedDelta.current = 0;
        lastTransition.current = 0;
      }

      const atFirst = currentIndex === 0;
      const atLast = currentIndex === WORDS.length - 1;

      if (atFirst && scrollingUp) {
        setIsLocked(false);
        return;
      }

      if (atLast && scrollingDown) {
        const now = Date.now();
        if (lastWordReachedAt.current === 0) lastWordReachedAt.current = now;
        if (now - lastWordReachedAt.current < LAST_WORD_HOLD) {
          e.preventDefault();
          setIsLocked(true);
          return;
        }
        setIsLocked(false);
        return;
      }

      if (!atLast) lastWordReachedAt.current = 0;

      e.preventDefault();
      setIsLocked(true);
      hasEnteredView.current = true;

      const now = Date.now();
      if (now - lastTransition.current < TRANSITION_COOLDOWN) return;

      accumulatedDelta.current += e.deltaY;

      if (Math.abs(accumulatedDelta.current) >= SCROLL_THRESHOLD) {
        const dir = accumulatedDelta.current > 0 ? 1 : -1;
        setDirection(dir);
        setWordIndex((prev) => {
          const next = prev + dir;
          if (next < 0) return 0;
          if (next >= WORDS.length) return WORDS.length - 1;
          return next;
        });
        accumulatedDelta.current = 0;
        lastTransition.current = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [wordIndex, isLocked, checkIfInLockZone]);

  const variants = {
    enter: (dir: number) => ({ y: dir > 0 ? 40 : -40, opacity: 0, filter: "blur(6px)" }),
    center: { y: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({ y: dir > 0 ? -40 : 40, opacity: 0, filter: "blur(6px)" }),
  };

  return (
    <section ref={sectionRef} className="border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4 relative min-h-[300px] md:min-h-[480px] lg:min-h-[560px] overflow-hidden">
          <img src={claimRight} alt="Espacio modular" loading="lazy" width={600} height={800} className="w-full h-full object-cover object-center absolute inset-0" />
        </div>

        <div className="md:col-span-8 flex flex-col">
          <div className="flex-[8] flex items-center px-8 md:px-12 lg:px-16 py-10 md:py-0 border-b border-border">
            <h2 className="font-display text-[2.5rem] md:text-[3.2rem] lg:text-[4rem] xl:text-[4.8rem] font-black leading-[1.02] tracking-tight text-foreground">
              Damos<br />
              <span className="relative inline-block overflow-hidden" style={{ minWidth: "4ch" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.span
                    key={WORDS[wordIndex]}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              a tus proyectos.
            </h2>
          </div>

          <div className="flex-[3] grid grid-cols-7">
            <div className="col-span-5 flex items-center justify-center px-8 md:px-12 lg:px-16 py-6 md:py-8">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[480px]">
                En Generación Modular damos vida a tus proyectos a través de un asesoramiento integral en cuanto a planificación, diseño y fabricación de mobiliario.
              </p>
            </div>
            <div className="col-span-2 relative overflow-hidden border-l border-border">
              <img src={claimLeft} alt="Sala de conferencias" loading="lazy" width={400} height={300} className="w-full h-full object-cover object-[center_30%] absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModularitySection;
