
"use client";
import { motion, Variants } from "framer-motion"; 
import styles from './Hero.module.scss'; 

export default function Hero() {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
      },
    },
  };

  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.section
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.overlay}></div>
      <div className={styles.backgroundImage}>
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
          alt="Chantier de construction"
        />
      </div>

      <motion.div className={styles.content}>
        <motion.h1 className={styles.title} variants={itemVariants}>
          Votre Projet, Notre Expertise.
        </motion.h1>
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Rénovation, construction neuve et dépannages urgents 24/7.
        </motion.p>
        <motion.a
          href="#contact"
          className={styles.callToAction}
          variants={itemVariants}
          whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }} 
          whileTap={{ scale: 0.95 }}
        >
          Obtenir un Devis
        </motion.a>
      </motion.div>
    </motion.section>
  );
}