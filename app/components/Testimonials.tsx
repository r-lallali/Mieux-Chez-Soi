// app/components/Testimonials.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import styles from './Testimonials.module.scss';

const testimonialsData = [
  {
    id: 1,
    name: "David L.",
    location: "Courbevoie (92)",
    rating: 5, 
    quote: "Travail impeccable pour la rénovation de notre salle de bain. Artisans sérieux, à l'écoute et qui respectent les délais. Je recommande !"
  },
  {
    id: 2,
    name: "Sarah M.",
    location: "Paris (75)",
    rating: 5, 
    quote: "Intervention rapide pour une fuite importante. Très professionnels et efficaces. Ils nous ont sauvé notre week-end !"
  },
  {
    id: 3,
    name: "Famille Dubois",
    location: "Gonesse (95)",
    rating: 5, 
    quote: "Nous avons confié notre projet d'extension à Mieux Chez Soi et le résultat est au-delà de nos espérances. Un grand merci à toute l'équipe."
  }
];

export default function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 } 
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div 
      className={styles.testimonialsGrid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {testimonialsData
        // 1. Filtre pour ne garder que les bons avis
        .filter(item => item.rating >= 4) 
        .map((item) => (
          <motion.div key={item.id} className={styles.testimonialCard} variants={itemVariants}>
            <div className={styles.rating}>
              
              {/* --- CORRECTION DE L'ERREUR ICI --- 
                  On s'assure que la note est un nombre positif ou nul
                  avant de créer le tableau d'étoiles.
              */}
              {Array(Math.max(0, item.rating || 0)).fill(0).map((_, i) => (
                <Star key={i} className={styles.starIcon} />
              ))}
            </div>
            <blockquote className={styles.quote}>
              "{item.quote}"
            </blockquote>
            <p className={styles.author}>
              — {item.name}, <span>{item.location}</span>
            </p>
          </motion.div>
      ))}
    </motion.div>
  );
}