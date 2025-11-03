// app/components/Stats.tsx
"use client";
// --- MODIFIÉ : Assurez-vous que useEffect et useRef viennent de "react" ---
import { useRef, useEffect } from "react";
import { 
  motion, 
  useSpring, 
  useTransform, 
  useInView,
  Variants 
} from "framer-motion";
import { Briefcase, Smile, Users } from "lucide-react";
import styles from './Stats.module.scss';

// Composant pour un seul compteur animé
function AnimatedCounter({ value }: { value: number }) {
  
  // --- CORRECTION MAJEURE ICI ---
  // useSpring n'utilise pas 'duration', mais 'stiffness' et 'damping'.
  const spring = useSpring(0, { 
    stiffness: 100, // Rigidité du ressort
    damping: 25,   // Amortissement
    mass: 1         // Masse de l'objet (influence l'inertie)
  });
  
  // Le reste de la logique est correcte
  const displayValue = useTransform(spring, (current) => 
    Math.round(current).toLocaleString('fr-FR')
  );

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      spring.set(value); // Déclenche l'animation de 0 à la valeur cible
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

  // (Typage des variants, inchangé depuis la correction précédente)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div 
      className={styles.statsContainer}
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