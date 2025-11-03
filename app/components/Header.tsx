// app/components/Header.tsx
"use client"; 
import Link from "next/link";
// --- 1. IMPORTER L'ICÔNE TÉLÉPHONE ---
import { HardHat, Menu, X, Phone } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion"; 
import { Disclosure } from '@headlessui/react';
import styles from './Header.module.scss'; 

// --- 2. DÉFINIR LE NUMÉRO ICI ---
const phoneNumber = "01 23 45 67 89";
// Format cliquable
const phoneHref = `tel:${phoneNumber.replace(/\s/g, '')}`;

export default function Header() {
  // ... (variants inchangées)
  const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
  };
  const linkVariants: Variants = {
    hover: { scale: 1.05, color: '#2563eb' }, 
    tap: { scale: 0.95 },
  };
  const mobilePanelVariants: Variants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, height: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <Disclosure as="header" className={styles.headerWrapper}>
      {({ open }) => (
        <>
          <motion.div
            className={styles.header}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <nav className={styles.nav}>
              {/* Logo (inchangé) */}
              <Link href="/" className={styles.logoLink}>
                <HardHat className={styles.logoIcon} />
                <motion.span
                  className={styles.logoText}
                  whileHover={{ color: '#2563eb' }}
                >
                  Mieux chez soi
                </motion.span>
              </Link>

              {/* Liens Desktop (Modifiés) */}
              <div className={styles.navLinks}>
                <motion.a href="#about" className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                  À Propos
                </motion.a>
                <motion.a href="#services" className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                  Nos Services
                </motion.a>
                <motion.a href="#realisations" className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                  Réalisations
                </motion.a>
                <motion.a href="#testimonials" className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                  Avis
                </motion.a>
                <motion.a href="#contact" className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                  Contact
                </motion.a>
                
                {/* --- 3. AJOUT DU NUMÉRO EN CLAIR --- */}
                <motion.a 
                  href={phoneHref} 
                  className={styles.phoneLink}
                  variants={linkVariants} whileHover="hover" whileTap="tap"
                >
                  <Phone size={16} />
                  {phoneNumber}
                </motion.a>

                <motion.a
                  href={phoneHref}
                  className={styles.urgentButton}
                  whileHover={{ scale: 1.05, backgroundColor: '#b91c1c' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Urgence 24/7
                </motion.a>
              </div>

              {/* Bouton Hamburger (inchangé) */}
              <Disclosure.Button 
                className={styles.mobileMenuButton}
                aria-label="Ouvrir le menu"
              >
                {open ? <X size={30} /> : <Menu size={30} />}
              </Disclosure.Button>
            </nav>
          </motion.div>

          {/* Panneau Mobile (Modifié) */}
          <AnimatePresence>
            {open && (
              <Disclosure.Panel
                static
                as={motion.div}
                variants={mobilePanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={styles.mobilePanel}
              >
                <Disclosure.Button as={Link} href="/#about" className={styles.mobileNavLink}>
                  À Propos
                </Disclosure.Button>
                <Disclosure.Button as={Link} href="/#services" className={styles.mobileNavLink}>
                  Nos Services
                </Disclosure.Button>
                <Disclosure.Button as={Link} href="/#realisations" className={styles.mobileNavLink}>
                  Réalisations
                </Disclosure.Button>
                <Disclosure.Button as={Link} href="/#testimonials" className={styles.mobileNavLink}>
                  Avis Clients
                </Disclosure.Button>
                <Disclosure.Button as={Link} href="/#contact" className={styles.mobileNavLink}>
                  Contact
                </Disclosure.Button>
                {/* --- 4. AJOUT DU NUMÉRO DANS LE MENU MOBILE --- */}
                <Disclosure.Button as="a" href={phoneHref} className={styles.mobileUrgentButton}>
                  {phoneNumber} (Urgence 24/7)
                </Disclosure.Button>
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}