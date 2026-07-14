import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={(definition) => {
          if (
            typeof definition === "object" &&
            !Array.isArray(definition) &&
            definition.opacity === 0
          ) {
            onComplete();
          }
        }}
      >
        {/* Morphing shapes */}
        <div className="relative w-40 h-40 mb-10">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ scale: [1, 1.2, 1], borderRadius: ["50%", "30%", "50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-accent/20"
            animate={{ scale: [1.1, 0.9, 1.1], borderRadius: ["30%", "50%", "30%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border-2 border-primary/15"
            animate={{ rotate: [0, 180, 360], borderRadius: ["50%", "40%", "50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Pulsing center */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-gradient">internetify</span>
            <span className="text-foreground">.io</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-muted-foreground text-sm font-body mt-3 tracking-[0.2em] uppercase"
          >
            Loading internetify
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div className="mt-10 w-48 h-[3px] bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
