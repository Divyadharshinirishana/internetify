import { motion } from "framer-motion";
import { Zap, Palette, TrendingUp, Headphones } from "lucide-react";

const features = [
  { icon: Zap, title: "Fast Delivery", description: "Rapid development cycles without compromising quality. Your project, delivered on time.", color: "from-blue-500 to-cyan-400" },
  { icon: Palette, title: "Premium Design", description: "Stunning, pixel-perfect interfaces that captivate users and elevate your brand.", color: "from-violet-500 to-purple-400" },
  { icon: TrendingUp, title: "Growth Focused", description: "Every pixel is optimized for conversions, SEO, and measurable business results.", color: "from-emerald-500 to-teal-400" },
  { icon: Headphones, title: "Full Support", description: "Dedicated support from concept to launch and beyond. We're always here for you.", color: "from-orange-500 to-amber-400" },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Our Strengths</p>
          <h2 className="section-heading">Why Choose Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-8 group hover:shadow-lg hover:shadow-primary/10 transition-all duration-500"
            >
              <motion.div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-md`}
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <f.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
