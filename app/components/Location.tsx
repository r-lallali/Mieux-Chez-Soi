// app/components/Location.tsx
"use client";
// --- 1. MODIFICATION : Importer 'Variants' ---
import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import styles from './Location.module.scss';
import layoutStyles from '../Layout.module.scss'; // Pour le style de titre

// --- (Vos informations de contact) ---
const contactDetails = {
  address: "1 Rue de la Paix, 95500 Gonesse", // Mettez votre vraie adresse ici
  phone: "01 23 45 67 89",
  email: "contact@mieux-chezsoi.fr"
};

// URL d'intégration de Google Maps
const mapEmbedUrl = "http://googleusercontent.com/maps.google.com/7";

export default function Location() {
  
  // --- 2. MODIFICATION : Ajouter le type 'Variants' ---
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  // --- 3. MODIFICATION : Ajouter le type 'Variants' ---
  const mapVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <h2 className={layoutStyles.sectionTitle}>Nous Trouver</h2>
      <div className={styles.locationGrid}>
        <motion.div 
          className={styles.contactInfo}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h3>Mieux Chez Soi</h3>
          <p>
            Venez discuter de votre projet directement à notre bureau,
            ou contactez-nous pour un devis gratuit.
          </p>
          <ul>
            <li>
              <MapPin size={20} />
              <div>
                <strong>Adresse :</strong>
                <br />
                {contactDetails.address}
              </div>
            </li>
            <li>
              <Phone size={20} />
              <div>
                <strong>Téléphone :</strong>
                <br />
                <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`}>{contactDetails.phone}</a>
              </div>
            </li>
            <li>
              <Mail size={20} />
              <div>
                <strong>Email :</strong>
                <br />
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.div 
          className={styles.mapContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={mapVariants}
        >
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carte de localisation de Mieux Chez Soi"
          ></iframe>
        </motion.div>
      </div>
    </>
  );
}