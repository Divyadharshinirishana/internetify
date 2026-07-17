import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { CONTACT_EMAIL } from "@/lib/contact";

const services = ["Website", "App", "Ecommerce", "Other"];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, service, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `Project enquiry from ${name.trim()}`,
          _template: "table",
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service,
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Email submission failed");
      }

      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      toast.success("Message sent successfully.");
    } catch {
      toast.error("Unable to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200";

  return (
    <section id="contact" className="relative scroll-mt-14 sm:scroll-mt-16 py-16 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(250_80%_62%_/_0.04)_0%,_transparent_60%)]" />
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Get In Touch</p>
          <h2 className="section-heading">Let's Build Something Great</h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card p-5 sm:p-8 md:p-10 space-y-4 sm:space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <input
              className={inputClass}
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
            />
            <input
              className={inputClass}
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <input
              className={inputClass}
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={20}
            />
            <select
              className={inputClass}
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <textarea
            className={`${inputClass} min-h-[120px] resize-none`}
            placeholder="Tell us about your project *"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={submitting}
            className="glow-button w-full flex items-center justify-center gap-2 text-lg font-display disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="w-5 h-5" />
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
