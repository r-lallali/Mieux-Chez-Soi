
"use client";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, CalendarClock, Wrench, Package } from "lucide-react";
import styles from './About.module.scss';

const commitments = [
  { id: 1, text: "Respect des Délais", icon: <CalendarClock /> },
  { id: 2, text: "Matériaux de Qualité", icon: <Wrench /> },
  { id: 3, text: "Devis Gratuit & Détaillé", icon: <Package /> },
  { id: 4, text: "Garantie Décennale", icon: <ShieldCheck /> }
];

export default function About() {
  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={styles.aboutGrid}>
      <motion.div
        className={styles.aboutText}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p>
          Passionnés par la rénovation et basés à Gonesse dans le 95, Mieux Chez Soi est une équipe jeune et dynamique de 5 salariés prête à intervenir pour tous vos travaux.
          Avec plus de 6 ans d'expérience, nous mettons notre savoir-faire au service de vos projets,
          du simple dépannage à la rénovation complète de votre habitat et ce dans toute l'Île-de-France.
        </p>
      </motion.div>
      <div className={styles.aboutCommitments}>
        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {commitments.map(item => (
            <motion.li key={item.id} variants={itemVariants}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              {item.text}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}