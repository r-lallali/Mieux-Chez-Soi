// app/components/Stats.tsx
"use client";
// --- 1. AJOUTER 'useEffect' ---
import { useRef, useEffect } from "react";
import { 
  motion, 
  useSpring, 
  useTransform, 
  useInView,
  Variants // <-- 2. AJOUTER 'Variants'
} from "framer-motion";
import { Briefcase, Smile, Users } from "lucide-react";
import styles from './Stats.module.scss';

// Composant pour un seul compteur animé
function AnimatedCounter({ value }: { value: number }) {
  
  // --- 3. CORRECTION DU BUG D'ANIMATION ---
  // useSpring n'utilise pas 'duration', mais 'stiffness' et 'damping'.
  const spring = useSpring(0, { 
    stiffness: 100, // Rigidité
    damping: 25,   // Amortissement
    mass: 1         
  });
  
  const displayValue = useTransform(spring, (current) => 
    Math.round(current).toLocaleString('fr-FR')
  );

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      spring.set(value); // Déclenche l'animation
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function Stats() {
  const stats = [
    { id: 1, value: 400, unit: "+", label: "Projets Réalisés", icon: <Briefcase /> },
    { id: 2, value: 100, unit: "%", label: "Clients Satisfaits", icon: <Smile /> },
    { id: 3, value: 15, unit: " ans", label: "d'Expérience", icon: <Users /> },
  ];

  // --- 4. AJOUTER LE TYPAGE ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    },
  };

  // --- 5. AJOUTER LE TYPAGE ---
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    // --- 6. MODIFIÉ : Utilise .statsGrid au lieu de .statsContainer ---
    <motion.div 
      className={styles.statsGrid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {stats.map((stat) => (
        <motion.div key={stat.id} className={styles.statItem} variants={itemVariants}>
          <div className={styles.statIcon}>{stat.icon}</div>
          <div className={styles.statValue}>
            <AnimatedCounter value={stat.value} />
            {stat.unit}
          </div>
          <p className={styles.statLabel}>{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}