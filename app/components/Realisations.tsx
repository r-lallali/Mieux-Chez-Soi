// app/components/Realisations.tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Realisations.module.scss';

gsap.registerPlugin(ScrollTrigger);

const realisationsData = [
  {
    id: 1,
    title: "Rénovation Cuisine Moderne",
    description: "Transformation complète d'une cuisine datée en un espace moderne et fonctionnel.",
    imageUrl: "/images/realisations/1-cuisine-moderne.jpg",
  },
  {
    id: 2,
    title: "Ravalement de Façade",
    description: "Nettoyage, traitement et peinture d'une façade pour une protection durable.",
    imageUrl: "/images/realisations/2-facade.jpg",
  },
  {
    id: 3,
    title: "Construction Extension Bois",
    description: "Création d'une extension en ossature bois pour une nouvelle pièce de vie.",
    imageUrl: "/images/realisations/3-extension-bois.jpg",
  },
  {
    id: 4,
    title: "Aménagement Combles",
    description: "Isolation et aménagement des combles perdus en une suite parentale lumineuse.",
    imageUrl: "/images/realisations/4-combles.jpg",
  }
];

const IMAGE_WIDTH = 1000;
const IMAGE_HEIGHT = 750;

export default function Realisations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".gsap-real-card");
    
    cards.forEach((card, i) => {
      // Animation de la carte elle-même (montée + fade)
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%", // Se déclenche quand la carte entre un peu dans l'écran
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.15 // Délai manuel pour le stagger si on ne veut pas tout déclencher d'un coup
      });

      // Animation de l'image à l'intérieur (Effet Parallax/Zoom subtil)
      const image = card.querySelector("img");
      if (image) {
        gsap.from(image, {
          scrollTrigger: {
            trigger: card,
            start: "top 100%",
          },
          scale: 1.3, // L'image commence zoomée
          duration: 1.5,
          ease: "power2.out" // Et dézoome doucement
        });
      }
    });

  }, { scope: containerRef });

  // Animation Hover simplifiée
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -10, duration: 0.3, ease: "power2.out" });
    // On cible l'image à l'intérieur pour un petit zoom supplémentaire
    gsap.to(e.currentTarget.querySelector("img"), { scale: 1.1, duration: 0.5 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(e.currentTarget.querySelector("img"), { scale: 1, duration: 0.5 });
  };

  return (
    <div className={styles.realisationsGrid} ref={containerRef}>
      {realisationsData.map((item) => (
        <div
          key={item.id}
          className={`${styles.realisationCard} gsap-real-card`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.imageContainer}>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.realisationImage} 
            />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.realisationTitle}>{item.title}</h3>
            <p className={styles.realisationDescription}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}