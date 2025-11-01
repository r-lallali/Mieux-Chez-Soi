// app/components/Services.tsx
"use client";
import { Wrench, Zap, Home } from "lucide-react";
import { motion, Variants } from "framer-motion"; // <-- MODIFIÉ
import styles from './Services.module.scss'; // Import CSS Module

const servicesData = [
  {
    icon: <Wrench />,
    title: "Rénovation Complète",
    description: "Du sol au plafond, nous transformons votre espace de vie ou de travail avec expertise.",
  },
  {
    icon: <Zap />,
    title: "Urgences & Dépannage",
    description: "Intervention rapide 24/7 pour fuites, pannes électriques, dégâts des eaux et autres urgences du bâtiment.",
  },
  {
    icon: <Home />,
    title: "Chantiers",
    description: "Construction de bâtiments professionnels, du plan à la livraison clé en main.",
  },
];

export default function Services() {
  // --- MODIFIÉ ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Délai entre l'animation des enfants
      },
    },
  };

  // --- MODIFIÉ ---
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className={styles.servicesGrid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Anime quand la grille est visible
      viewport={{ once: true, amount: 0.5 }} // Une seule fois quand 50% est visible
    >
      {servicesData.map((service, index) => (
        <motion.div
          key={service.title}
          className={styles.serviceCard}
          variants={itemVariants}
          whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }} // Effet 3D subtil
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className={`${styles.iconContainer} ${styles[`icon-${index}`]}`}>{service.icon}</div>
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          <p className={styles.serviceDescription}>{service.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}