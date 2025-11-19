// app/components/Services.tsx
"use client";
import { useRef } from "react";
import Link from 'next/link';
import { Wrench, Zap, Home } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Services.module.scss'; 

// On enregistre le plugin ScrollTrigger (nécessaire pour les animations au scroll)
gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);

  // useGSAP gère automatiquement le nettoyage (cleanup) des animations React
  useGSAP(() => {
    // Animation d'entrée : Les cartes apparaissent une par une
    gsap.from(".gsap-service-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", // Démarre quand le haut du conteneur est à 85% de l'écran
        toggleActions: "play none none reverse", // Joue l'anim, et inverse si on remonte
      },
      y: 60, // Vient de 60px plus bas
      opacity: 0,
      duration: 0.8,
      stagger: 0.2, // 0.2s de délai entre chaque carte
      ease: "power3.out" // Courbe de vitesse fluide
    });
  }, { scope: containerRef }); // Scope permet de cibler facilement les classes internes

  // Gestionnaires d'événements pour le Hover (souris)
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { 
      scale: 1.05, 
      boxShadow: '0 20px 30px rgba(0,0,0,0.15)', 
      duration: 0.4, 
      ease: "back.out(1.7)" // Petit effet de rebond élastique
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { 
      scale: 1, 
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  return (
    <div className={styles.servicesGrid} ref={containerRef}>
      {servicesData.map((service, index) => (
        <Link href={service.href} key={service.title} className={styles.serviceLink}>
          {/* On ajoute la classe "gsap-service-card" pour le ciblage facile */}
          <div
            className={`${styles.serviceCard} gsap-service-card`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`${styles.iconContainer} ${styles[`icon-${index}`]}`}>{service.icon}</div>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}