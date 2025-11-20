
"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import styles from './Realisations.module.scss';

const realisationsData = [
  {
    id: 1,
    title: "Rénovation Cuisine Moderne",
    description: "Transformation complète d'une cuisine datée en un espace moderne et fonctionnel.",
    imageUrl: "/images/realisations/1-cuisine-moderne.jpg",
  },
  {
    id: 2,
    title: "Ravalement de Façade",
    description: "Nettoyage, traitement et peinture d'une façade pour une protection durable.",
    imageUrl: "/images/realisations/2-facade.jpg",
  },
  {
    id: 3,
    title: "Construction Extension Bois",
    description: "Création d'une extension en ossature bois pour une nouvelle pièce de vie.",
    imageUrl: "/images/realisations/3-extension-bois.jpg",
  },
  {
    id: 4,
    title: "Aménagement Combles",
    description: "Isolation et aménagement des combles perdus en une suite parentale lumineuse.",
    imageUrl: "/images/realisations/4-combles.jpg",
  }
];

const IMAGE_WIDTH = 1000;
const IMAGE_HEIGHT = 750;

export default function Realisations() {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className={styles.realisationsGrid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {realisationsData.map((item) => (
        <motion.div
          key={item.id}
          className={styles.realisationCard}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.03, 
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className={styles.imageContainer}>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.realisationImage} 
            />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.realisationTitle}>{item.title}</h3>
            <p className={styles.realisationDescription}>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}