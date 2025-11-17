"use client";
import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import styles from './Location.module.scss';
import layoutStyles from '../Layout.module.scss';

const contactDetails = {
  address: "8 Rue St Nicolas, 95500 Gonesse",
  phone: "06 51 24 52 84",
  email: "contact@mieux-chezsoi.fr"
};

const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41893.99535037887!2d2.448015712311494!3d48.98442622080371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66add3bbe0a1b%3A0xa9a798331d95e84e!2s8%20Rue%20Saint-Nicolas%2C%2095500%20Gonesse!5e0!3m2!1sfr!2sfr!4v1762135101946!5m2!1sfr!2sfr"
export default function Location() {

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
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