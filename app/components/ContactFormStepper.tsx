// app/components/ContactFormStepper.tsx
"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react"; // <-- MODIFIÉ
import { useFormState, useFormStatus } from "react-dom";
import { sendEmail, type FormState } from "../actions/sendEmail";
import { User, Mail, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import styles from './ContactFormStepper.module.scss';

// ... (Le composant SubmitButton reste inchangé)
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      className={styles.submitButton}
      whileHover={{ scale: pending ? 1 : 1.05, backgroundColor: pending ? '' : '#1d4ed8' }}
      whileTap={{ scale: pending ? 1 : 0.95 }}
    >
      {pending ? "Envoi en cours..." : "Envoyer le Devis"}
    </motion.button>
  );
}

// --- Composant principal du Stepper ---
const initialState: FormState = {
  success: false,
  message: "",
};

export default function ContactFormStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, formAction] = useFormState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // --- NOUVEAU : État pour stocker TOUTES les données du formulaire ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // --- NOUVEAU : Gestionnaire pour mettre à jour l'état ---
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gérer la navigation après la soumission du formulaire
  useEffect(() => {
    if (state.success) {
      setCurrentStep(3); // Aller à l'étape 3 (Succès)
      formRef.current?.reset();
      // Vider aussi notre état local
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else if (state.message && !state.success && state.errors) {
      // Si erreurs, revenir à la première étape contenant une erreur
      if (state.errors.name || state.errors.email || state.errors.phone) {
        setCurrentStep(1);
      } else if (state.errors.message) {
        setCurrentStep(2);
      }
    }
  }, [state]);

  // ... (Les objets variants et le composant StepperVisual restent inchangés)
  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const successVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 20, delay: 0.2 } },
    exit: { opacity: 0, scale: 0.8 },
  }

  const StepperVisual = () => (
    <div className={styles.stepperVisual}>
      {/* Étape 1 */}
      <div className={styles.stepItem}>
        <div className={`${styles.stepIcon} ${currentStep >= 1 ? styles.active : ''}`}>
          {currentStep > 1 ? <CheckCircle size={24} /> : <User size={24} />}
        </div>
        <p className={`${styles.stepLabel} ${currentStep >= 1 ? styles.active : ''}`}>Informations</p>
      </div>
      <div className={`${styles.stepLine} ${currentStep > 1 ? styles.active : ''}`}></div>
      {/* Étape 2 */}
      <div className={styles.stepItem}>
        <div className={`${styles.stepIcon} ${currentStep >= 2 ? styles.active : ''}`}>
          {currentStep > 2 ? <CheckCircle size={24} /> : <Mail size={24} />}
        </div>
        <p className={`${styles.stepLabel} ${currentStep >= 2 ? styles.active : ''}`}>Message</p>
      </div>
      <div className={`${styles.stepLine} ${currentStep > 2 ? styles.active : ''}`}></div>
      {/* Étape 3 */}
      <div className={styles.stepItem}>
        <div className={`${styles.stepIcon} ${currentStep === 3 ? styles.success : ''} ${currentStep === 3 ? '' : styles.inactive}`}>
          <CheckCircle size={24} />
        </div>
        <p className={`${styles.stepLabel} ${currentStep === 3 ? styles.success : ''}`}>Envoyé</p>
      </div>
    </div>
  );


  return (
    <motion.div
      className={styles.contactFormContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <StepperVisual />

      {/* ... (Message d'erreur global - inchangé) ... */}
      <AnimatePresence mode="wait">
        {!state.success && state.message && currentStep !== 3 && (
          <motion.div
            key="error-message"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: '1.5rem' }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.errorMessage}
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>

      <form ref={formRef} action={formAction} className={styles.formContent}>
        <AnimatePresence mode="wait">
          {/* --- ÉTAPE 1: INFORMATIONS --- */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.stepPanel}
            >
              <h3 className={styles.stepTitle}>1. Vos Coordonnées</h3>
              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <label htmlFor="name" className={styles.label}>Nom*</label>
                  <input
                    type="text" id="name" name="name" required
                    className={styles.input}
                    value={formData.name} // <-- MODIFIÉ
                    onChange={handleChange} // <-- MODIFIÉ
                  />
                  {state.errors?.name && <p className={styles.errorText}>{state.errors.name[0]}</p>}
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="email" className={styles.label}>Email*</label>
                  <input
                    type="email" id="email" name="email" required
                    className={styles.input}
                    value={formData.email} // <-- MODIFIÉ
                    onChange={handleChange} // <-- MODIFIÉ
                  />
                  {state.errors?.email && <p className={styles.errorText}>{state.errors.email[0]}</p>}
                </div>
              </div>
              <div className={styles.inputField}>
                <label htmlFor="phone" className={styles.label}>Téléphone (Optionnel)</label>
                <input
                  type="tel" id="phone" name="phone"
                  className={styles.input}
                  value={formData.phone} // <-- MODIFIÉ
                  onChange={handleChange} // <-- MODIFIÉ
                />
              </div>
              <div className={styles.navigationButtons}>
                <button type="button" onClick={() => setCurrentStep(2)} className={styles.nextButton}>
                  Suivant <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* --- ÉTAPE 2: MESSAGE / DEVIS --- */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.stepPanel}
            >
              {/* --- NOUVEAU : Champs cachés pour conserver les données de l'étape 1 --- */}
              <input type="hidden" name="name" value={formData.name} />
              <input type="hidden" name="email" value={formData.email} />
              <input type="hidden" name="phone" value={formData.phone} />

              <h3 className={styles.stepTitle}>2. Votre Projet</h3>
              <div className={styles.inputField}>
                <label htmlFor="message" className={styles.label}>Décrivez votre projet*</label>
                <textarea
                  id="message" name="message" rows={6} required
                  className={styles.textarea}
                  value={formData.message} // <-- MODIFIÉ
                  onChange={handleChange} // <-- MODIFIÉ
                ></textarea>
                {state.errors?.message && <p className={styles.errorText}>{state.errors.message[0]}</p>}
              </div>
              <div className={styles.navigationButtons}>
                <button type="button" onClick={() => setCurrentStep(1)} className={styles.prevButton}>
                  <ArrowLeft size={18} /> Précédent
                </button>
                <SubmitButton />
              </div>
            </motion.div>
          )}

          {/* --- ÉTAPE 3: CONFIRMATION --- */}
          {currentStep === 3 && (
            // ... (Cette section reste inchangée)
            <motion.div
              key="step3"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.successPanel}
            >
              <CheckCircle className={styles.successIcon} />
              <h3 className={styles.successTitle}>Devis bien envoyé !</h3>
              <p className={styles.successMessage}>
                {state.message || "Merci. Nous avons reçu votre demande et vous recontacterons dans les plus brefs délais."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                }}
                className={styles.nextButton}
              >
                Faire une nouvelle demande
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}