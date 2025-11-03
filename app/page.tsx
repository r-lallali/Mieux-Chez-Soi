// app/page.tsx
"use client"; // Client Component pour les animations
import { motion, Variants } from "framer-motion";
import Hero from "./components/Hero";
import Stats from "./components/Stats"; // (Import inchangé)
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Realisations from "./components/Realisations"; 
import ContactFormStepper from "./components/ContactFormStepper";
import Location from "./components/Location";

import layoutStyles from './Layout.module.scss'; 

export default function HomePage() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div>
      <Hero />
      
      {/* --- MODIFICATION DE LA SECTION STATS --- */}
      {/* Nous la mettons dans une vraie <section> pour un layout propre */}
      <motion.section
        id="stats"
        className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`} // Fond gris
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className={layoutStyles.container}>
          <Stats />
        </div>
      </motion.section>
      
      {/* --- SECTION À PROPOS --- */}
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
      
      {/* --- SECTION SERVICES --- */}
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

      {/* --- SECTION RÉALISATIONS --- */}
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

      {/* --- SECTION TÉMOIGNAGES --- */}
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

      {/* --- SECTION CONTACT --- */}
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
            Décrivez nous votre projet.
          </motion.p>
          <ContactFormStepper />
        </div>
      </motion.section>
      <motion.section
        id="location"
        className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`} // Fond gris
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className={layoutStyles.container}>
          <Location />
        </div>
      </motion.section>
    </div>
  );
}