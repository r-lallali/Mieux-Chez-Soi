// app/page.tsx
"use client"; // Client Component pour les animations
import { motion, Variants } from "framer-motion"; // <--- MODIFICATION ICI
import Hero from "./components/Hero";
import Services from "./components/Services";
import ContactFormStepper from "./components/ContactFormStepper";

import layoutStyles from './Layout.module.scss'; // Pour le container global

export default function HomePage() {
  // --- MODIFICATION ICI ---
  // On dit explicitement à TypeScript que c'est un objet de type 'Variants'
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div>
      <Hero />
      
      <motion.section
        id="services"
        className={layoutStyles.section} // Utilise le style de section global
        initial="hidden"
        whileInView="visible" // Anime quand la section est visible
        viewport={{ once: true, amount: 0.3 }} // Une seule fois quand 30% est visible
        variants={sectionVariants} // Utilise les variants typés
      >
        <div className={layoutStyles.container}> {/* Utilise le container global */}
          <motion.h2
            className={layoutStyles.sectionTitle} // Utilise le titre global
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Nos Domaines d'Intervention
          </motion.h2>
          <Services />
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`} // Ajout d'une classe bg-gray si nécessaire dans layout.scss
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants} // Utilise les variants typés
      >
        <div className={`${layoutStyles.container} ${layoutStyles.maxWidthLg}`}> {/* Max width pour le formulaire */}
          <motion.h2
            className={layoutStyles.sectionTitle} // Utilise le titre global
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Demander un Devis Gratuit
          </motion.h2>
          <motion.p
            className={layoutStyles.sectionDescription} // Ajout d'une description globale si nécessaire
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
            viewport={{ once: true }}
          >
            Suivez les étapes pour nous décrire votre projet. C'est simple, rapide et sans engagement.
          </motion.p>
          <ContactFormStepper />
        </div>
      </motion.section>
    </div>
  );
}