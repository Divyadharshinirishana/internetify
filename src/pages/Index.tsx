import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesMarquee from "@/components/ServicesMarquee";
import StatsSection from "@/components/StatsSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <LoadingScreen onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-background min-h-screen overflow-x-hidden"
        >
          <Navbar />
          <HeroSection />
          <ServicesMarquee />
          <StatsSection />
          <WhyUsSection />
          <ContactSection />
          <Footer />
          <WhatsAppFloat />
        </motion.main>
      )}
    </>
  );
};

export default Index;
