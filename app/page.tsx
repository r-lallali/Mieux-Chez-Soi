// app/page.tsx
"use client"; // Client Component pour les animations
import { motion, Variants } from "framer-motion";
import Hero from "./components/Hero";
// --- NOUVEAUX IMPORTS ---
import Stats from "./components/Stats";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
// --- FIN NOUVEAUX IMPORTS ---
import Services from "./components/Services";
import Realisations from "./components/Realisations"; 
import ContactFormStepper from "./components/ContactFormStepper";

import layoutStyles from './Layout.module.scss'; 

export default function HomePage() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div>
      <Hero />
      
      {/* --- 1. NOUVELLE SECTION STATS --- */}
      <Stats />
      
      {/* --- 2. NOUVELLE SECTION À PROPOS --- */}
      <motion.section
        id="about"
        className={layoutStyles.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className={layoutStyles.container}>
          <motion.h2
            className={layoutStyles.sectionTitle}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Votre Artisan de Confiance
          </motion.h2>
          <About />
        </div>
      </motion.section>
      
      {/* --- SECTION SERVICES (INCHANGÉE) --- */}
      <motion.section
        id="services"
        className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`} // Fond gris
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className={layoutStyles.container}>
          <motion.h2
            className={layoutStyles.sectionTitle}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Nos Domaines d'Intervention
          </motion.h2>
          <Services />
        </div>
      </motion.section>

      {/* --- SECTION RÉALISATIONS (INCHANGÉE) --- */}
      <motion.section
        id="realisations"
        className={layoutStyles.section} // Fond blanc
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} 
        variants={sectionVariants}
      >
        <div className={layoutStyles.container}>
          <motion.h2
            className={layoutStyles.sectionTitle}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Nos Réalisations
          </motion.h2>
          <Realisations />
        </div>
      </motion.section>

      {/* --- 3. NOUVELLE SECTION TÉMOIGNAGES --- */}
      <motion.section
        id="testimonials"
        className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`} // Fond gris
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className={layoutStyles.container}>
          <motion.h2
            className={layoutStyles.sectionTitle}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Ils nous font confiance
          </motion.h2>
          <Testimonials />
        </div>
      </motion.section>

      {/* --- SECTION CONTACT (INCHANGÉE) --- */}
      <motion.section
        id="contact"
        className={layoutStyles.section} // Fond blanc
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className={`${layoutStyles.container} ${layoutStyles.maxWidthLg}`}>
          <motion.h2
            className={layoutStyles.sectionTitle}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Demander un Devis Gratuit
          </motion.h2>
          <motion.p
            className={layoutStyles.sectionDescription}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Basés à Gonesse (95), nous intervenons sur Paris, Courbevoie et toute la région.
            Suivez les étapes pour nous décrire votre projet. C'est simple et sans engagement.
          </motion.p>
          <ContactFormStepper />
        </div>
      </motion.section>
    </div>
  );
}