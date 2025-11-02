// app/components/Header.tsx
"use client"; 
import Link from "next/link";
import { HardHat, Menu, X } from "lucide-react"; // Inchangé
import { motion, Variants, AnimatePresence } from "framer-motion"; 
import { Popover } from '@headlessui/react'; // <-- 1. IMPORTER Popover
import styles from './Header.module.scss'; 

export default function Header() {
  // --- 2. SUPPRIMER le useState ---
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // (Variants inchangés)
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

        {/* Liens Desktop (inchangés) */}
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

        {/* --- 3. MODIFICATION : Remplacer le bouton par Popover --- */}
        <Popover className={styles.mobilePopover}>
          {({ open }) => ( // Headless UI nous donne l'état 'open'
            <>
              <Popover.Button 
                className={styles.mobileMenuButton}
                aria-label="Ouvrir le menu"
              >
                {/* L'icône change en fonction de l'état 'open' */}
                {open ? <X size={30} /> : <Menu size={30} />}
              </Popover.Button>

              <AnimatePresence>
                {open && (
                  <Popover.Panel
                    static // Requis pour que Framer Motion gère l'animation
                    as={motion.div} // Animer le Panel comme un motion.div
                    className={styles.mobileNav}
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Le Popover.Panel gère le focus, pas besoin de header séparé */}
                    <div className={styles.mobileNavLinks}>
                      {/* Utiliser Popover.Button as={Link} ferme le menu au clic */}
                      <Popover.Button as={Link} href="/#services" className={styles.mobileNavLink}>
                        Nos Services
                      </Popover.Button>
                      <Popover.Button as={Link} href="/#realisations" className={styles.mobileNavLink}>
                        Réalisations
                      </Popover.Button>
                      <Popover.Button as={Link} href="/#contact" className={styles.mobileNavLink}>
                        Contact
                      </Popover.Button>
                      <Popover.Button as="a" href="tel:0123456789" className={styles.mobileUrgentButton}>
                        Urgence 24/7
                      </Popover.Button>
                    </div>
                  </Popover.Panel>
                )}
              </AnimatePresence>
            </>
          )}
        </Popover>
      </nav>

      {/* --- 4. SUPPRIMER l'ancien menu mobile (géré par Popover) --- */}
      {/* <AnimatePresence> ... </AnimatePresence> */}

    </motion.header>
  );
}