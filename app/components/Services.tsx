
"use client";
import { Wrench, Zap, Home } from "lucide-react";
import { motion, Variants } from "framer-motion"; 
import Link from 'next/link'; 
import styles from './Services.module.scss'; 


const servicesData = [
  {
    icon: <Wrench />,
    title: "Rénovation Complète",
    description: "Du sol au plafond, nous transformons votre espace de vie ou de travail avec expertise.",
    href: "/services/renovation"
  },
  {
    icon: <Zap />,
    title: "Urgences & Dépannage",
    description: "Intervention rapide 24/7 pour fuites, pannes électriques, dégâts des eaux et autres urgences.",
    href: "/services/depannage"
  },
  {
    icon: <Home />,
    title: "Chantiers",
    description: "Construction de bâtiments professionnels, extensions, tout corps de travaux intérieurs.",
    href: "/services/chantiers"
  },
];

export default function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className={styles.servicesGrid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: true, amount: 0.5 }} 
    >
      {servicesData.map((service, index) => (
        
        <Link href={service.href} key={service.title} className={styles.serviceLink}>
          <motion.div
            className={styles.serviceCard}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }} 
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className={`${styles.iconContainer} ${styles[`icon-${index}`]}`}>{service.icon}</div>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}