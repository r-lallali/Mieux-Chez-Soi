"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import styles from './Realisations.module.scss';
import BeforeAfterSlider from "./BeforeAfterSlider";

const realisationsData = [
  {
    id: 1,
    title: "Rénovation Complète Appartement",
    description: "Transformation totale d'un T3 : ouverture de la cuisine sur le salon et modernisation des sols.",
    beforeImage: "/images/realisations/IMG-20251116-WA0002.jpg",
    afterImage: "/images/realisations/IMG-20251116-WA0003.jpg",
  },
  {
    id: 2,
    title: "Salle de Bain Moderne",
    description: "Remplacement d'une baignoire par une douche à l'italienne et pose de carrelage grand format.",
    beforeImage: "/images/realisations/IMG-20251116-WA0004.jpg",
    afterImage: "/images/realisations/IMG-20251116-WA0005.jpg",
  },
  {
    id: 3,
    title: "Cuisine Équipée",
    description: "Installation d'une cuisine sur-mesure avec îlot central et éclairage LED intégré.",
    beforeImage: "/images/realisations/IMG-20251116-WA0006.jpg",
    afterImage: "/images/realisations/IMG-20251116-WA0007.jpg",
  },
  {
    id: 4,
    title: "Ravalement de Façade",
    description: "Nettoyage haute pression et mise en peinture pour redonner de l'éclat à l'extérieur.",
    beforeImage: "/images/realisations/IMG-20251116-WA0008.jpg",
    afterImage: "/images/realisations/IMG-20251116-WA0009.jpg",
  }
];

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
    <section className={styles.section}>
      <motion.div
        className={styles.realisationsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {realisationsData.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className={styles.sliderWrapper}
          >
            <BeforeAfterSlider
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              title={item.title}
              description={item.description}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.buttonContainer}>
        <Link href="/realisations" className={styles.viewAllButton}>
          Voir toutes nos réalisations
        </Link>
      </div>
    </section>
  );
}