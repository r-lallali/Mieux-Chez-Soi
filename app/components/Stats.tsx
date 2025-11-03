// app/components/Stats.tsx
"use client";

import { useEffect } from "react";
import { 
  motion, 
  useSpring, 
  useTransform, 
  Variants 
} from "framer-motion";
import { Briefcase, Smile, Users } from "lucide-react";
import styles from './Stats.module.scss';

// Composant pour un seul compteur animé
function AnimatedCounter({ value }: { value: number }) {
  
  const spring = useSpring(0, { 
    stiffness: 100, // Rigidité
    damping: 25,   // Amortissement
    mass: 1         
  });
  
  const displayValue = useTransform(spring, (current) => 
    Math.round(current).toLocaleString('fr-FR')
  );
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  return <motion.span>{displayValue}</motion.span>;
}

export default function Stats() {
  const stats = [
    { id: 1, value: 400, unit: "+", label: "Projets Réalisés", icon: <Briefcase /> },
    { id: 2, value: 90, unit: "%", label: "Clients Satisfaits", icon: <Smile /> },
    { id: 3, value: 10, unit: " ans", label: "d'Expérience", icon: <Users /> },
  ];

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
      className={styles.statsGrid}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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