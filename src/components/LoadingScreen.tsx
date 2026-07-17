import { useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timeout = window.setTimeout(onComplete, 900);
    return () => window.clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-5">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary"
        aria-label="Loading"
      />
      <p className="font-display text-2xl font-bold tracking-tight">
        <span className="text-gradient">internetify</span>
        <span className="text-foreground">.io</span>
      </p>
    </div>
  );
};

export default LoadingScreen;
