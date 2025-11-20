
"use client"; 
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion"; 
import { Disclosure } from '@headlessui/react';
import styles from './Header.module.scss'; 

const phoneNumber = "06 51 24 52 84";
const phoneHref = `tel:${phoneNumber.replace(/\s/g, '')}`;

export default function Header() {
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
              
              <Link href="/" className={styles.logoLink}>
                
                <Image
                  src="/images/logo.png" 
                  alt="Mieux chez soi Logo"
                  width={195} 
                  height={70} 
                  className={styles.logoImage}
                  priority 
                />
                <motion.span
                  className={styles.logoText}
                >
                  mieux chez soi
                </motion.span>
              </Link>
              <div className={styles.navLinks}>
                <Link href="/#about" passHref>
                  <motion.a className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                    À Propos
                  </motion.a>
                </Link>
                <Link href="/#services" passHref>
                  <motion.a className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                    Nos Services
                  </motion.a>
                </Link>
                <Link href="/#realisations" passHref>
                  <motion.a className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                    Réalisations
                  </motion.a>
                </Link>
                <Link href="/#testimonials" passHref>
                  <motion.a className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                    Avis
                  </motion.a>
                </Link>
                <Link href="/#contact" passHref>
                  <motion.a className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                    Contact
                  </motion.a>
                </Link>
                <Link href="/#location" passHref>
                  <motion.a className={styles.navLink} variants={linkVariants} whileHover="hover" whileTap="tap">
                    Nous trouver
                  </motion.a>
                </Link>
                
                <motion.a 
                  href={phoneHref} 
                  className={styles.phoneLink}
                  variants={linkVariants} whileHover="hover" whileTap="tap"
                >
                  <Phone size={16} />
                  {phoneNumber}
                </motion.a>
              </div>

              <Disclosure.Button 
                className={styles.mobileMenuButton}
                aria-label="Ouvrir le menu"
              >
                {open ? <X size={30} /> : <Menu size={30} />}
              </Disclosure.Button>
            </nav>
          </motion.div>

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
                <Disclosure.Button as={Link} href="/#location" className={styles.mobileNavLink}>
                  Nous trouver
                </Disclosure.Button>
                <Disclosure.Button as="a" href={phoneHref} className={styles.mobileUrgentButton}>
                  {phoneNumber}
                </Disclosure.Button>
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}