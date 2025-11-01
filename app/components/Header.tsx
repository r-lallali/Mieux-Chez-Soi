// app/components/Header.tsx
"use client"; 
import Link from "next/link";
import { HardHat } from "lucide-react";
import { motion, Variants } from "framer-motion"; 
import styles from './Header.module.scss'; 

export default function Header() {
  const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
  };

  const linkVariants: Variants = {
    hover: { scale: 1.05, color: '#2563eb' }, 
    tap: { scale: 0.95 },
  };

  return (
    <motion.header
      className={styles.header}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className={styles.nav}>
        <Link href="/" className={styles.logoLink}>
          <HardHat className={styles.logoIcon} />
          <motion.span
            className={styles.logoText}
            whileHover={{ color: '#2563eb' }}
          >
            Mieux chez soi
          </motion.span>
        </Link>
        <div className={styles.navLinks}>
          <motion.a href="#services" className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
            Nos Services
          </motion.a>
          
          {/* --- AJOUT DU NOUVEAU LIEN --- */}
          <motion.a href="#realisations" className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
            Réalisations
          </motion.a>
          
          <motion.a href="#contact" className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
            Contact
          </motion.a>
          <motion.a
            href="tel:0123456789"
            className={styles.urgentButton}
            whileHover={{ scale: 1.05, backgroundColor: '#b91c1c' }}
            whileTap={{ scale: 0.95 }}
          >
            Urgence 24/7
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}