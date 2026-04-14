import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Preload critical images in the background
const criticalImages = Object.values(
  import.meta.glob("@/assets/home/hero-chair.webp", { eager: true, query: "?url", import: "default" })
) as string[];

interface PreloadScreenProps {
  onFinished: () => void;
}

const PreloadScreen = ({ onFinished }: PreloadScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Preload all home images in background
    const imageModules = import.meta.glob("@/assets/home/*.webp", { eager: true, query: "?url", import: "default" });
    const urls = Object.values(imageModules) as string[];

    let loaded = 0;
    const total = urls.length || 1;

    const updateProgress = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
    };

    urls.forEach((url) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = url;
    });

    // Minimum 1.5s display, then fade out
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setTimeout(onFinished, 500);
      }, 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="font-display text-[2.5rem] md:text-[3.5rem] font-black tracking-tighter text-foreground leading-none">
              Generación<br />
              <span className="font-normal italic">Modular.</span>
            </h1>

            {/* Progress bar */}
            <div className="w-48 md:w-64 h-[3px] bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <p className="text-muted-foreground text-xs tracking-widest uppercase">
              Cargando
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreloadScreen;
