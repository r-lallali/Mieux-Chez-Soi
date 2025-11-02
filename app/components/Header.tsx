// app/components/Header.tsx
"use client"; 
import Link from "next/link";
import { useState } from "react";
import { HardHat, Menu, X } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import styles from './Header.module.scss'; 

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
  };

  const linkVariants: Variants = {
    hover: { scale: 1.05, color: '#2563eb' }, 
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3, ease: "easeInOut" } }
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
        <button 
          className={styles.mobileMenuButton} 
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={30} />
        </button>
      </nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileNav}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.mobileNavHeader}>
              <Link href="/" className={styles.logoLink} onClick={() => setIsMobileMenuOpen(false)}>
                <HardHat className={styles.logoIcon} />
                <span className={styles.logoText}>Mieux chez soi</span>
              </Link>
              <button 
                className={styles.mobileMenuButton} 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <X size={30} />
              </button>
            </div>
            
            <div className={styles.mobileNavLinks}>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Nos Services</a>
              <a href="#realisations" onClick={() => setIsMobileMenuOpen(false)}>Réalisations</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
              <a href="tel:0123456789" className={styles.mobileUrgentButton}>
                Urgence 24/7
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}