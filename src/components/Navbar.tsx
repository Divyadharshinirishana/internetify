import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => handleClick("#home")}
          className="font-display text-xl font-bold tracking-tight"
        >
          <span className="text-gradient">internetify</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handleClick("#why-us")}
            className="px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
          >
            Why Us
          </button>
          <button
            onClick={() => handleClick("#contact")}
            className="px-4 py-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
