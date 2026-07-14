import { motion } from "framer-motion";

const items = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "E-Commerce",
  "SEO & Growth",
  "Brand Identity",
  "Cloud Solutions",
  "API Development",
];

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
    <motion.div
      className="flex gap-6 shrink-0"
      animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((item, i) => (
        <div
          key={`${item}-${i}`}
          className="glass-card px-6 py-3 shrink-0 text-sm font-body text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default whitespace-nowrap"
        >
          {item}
        </div>
      ))}
    </motion.div>
  </div>
);

const ServicesMarquee = () => (
  <section id="services" className="py-16 space-y-4 overflow-hidden">
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center text-muted-foreground font-body text-sm tracking-[0.2em] uppercase mb-8"
    >
      What We Do
    </motion.p>
    <MarqueeRow />
    <MarqueeRow reverse />
  </section>
);

export default ServicesMarquee;
