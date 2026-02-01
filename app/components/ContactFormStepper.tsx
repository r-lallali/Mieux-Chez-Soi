"use client";

import { useState, useEffect, useRef, ChangeEvent, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail, type FormState } from "../actions/sendEmail";
import { User, Mail, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { step1Schema, step2Schema } from "../lib/schemas";

import styles from './ContactFormStepper.module.scss';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      className={styles.submitButton}
      whileHover={{ scale: pending ? 1 : 1.05, backgroundColor: pending ? '' : '#781222' }}
      whileTap={{ scale: pending ? 1 : 0.95 }}
    >
      {pending ? "Envoi en cours..." : "Envoyer le Devis"}
    </motion.button>
  );
}

const initialState: FormState = {
  success: false,
  message: "",
};

interface StepperVisualProps {
  currentStep: number;
}

const StepperVisual = ({ currentStep }: StepperVisualProps) => (
  <div className={styles.stepperVisual}>
    <div className={styles.stepItem}>
      <div className={`${styles.stepIcon} ${currentStep >= 1 ? styles.active : ''}`}>
        {currentStep > 1 ? <CheckCircle size={24} /> : <User size={24} />}
      </div>
      <p className={`${styles.stepLabel} ${currentStep >= 1 ? styles.active : ''}`}>Informations</p>
    </div>
    <div className={`${styles.stepLine} ${currentStep > 1 ? styles.active : ''}`}></div>
    <div className={styles.stepItem}>
      <div className={`${styles.stepIcon} ${currentStep >= 2 ? styles.active : ''}`}>
        {currentStep > 2 ? <CheckCircle size={24} /> : <Mail size={24} />}
      </div>
      <p className={`${styles.stepLabel} ${currentStep >= 2 ? styles.active : ''}`}>Message</p>
    </div>
    <div className={`${styles.stepLine} ${currentStep > 2 ? styles.active : ''}`}></div>
    <div className={styles.stepItem}>
      <div className={`${styles.stepIcon} ${currentStep === 3 ? styles.success : ''} ${currentStep === 3 ? '' : styles.inactive}`}>
        <CheckCircle size={24} />
      </div>
      <p className={`${styles.stepLabel} ${currentStep === 3 ? styles.success : ''}`}>Envoyé</p>
    </div>
  </div>
);

export default function ContactFormStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, formAction] = useActionState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });


  const [clientErrors, setClientErrors] = useState<Record<string, string[] | undefined> | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Limiter le téléphone à 10 chiffres maximum
    let processedValue = value;
    if (name === "phone") {
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue,
    }));

    if (clientErrors && clientErrors[name]) {
      setClientErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleNextStep = () => {
    const result = step1Schema.safeParse(formData);
    if (!result.success) {
      setClientErrors(result.error.flatten().fieldErrors);
    } else {
      setClientErrors(null);
      setCurrentStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (currentStep === 2) {
      const result = step2Schema.safeParse({ message: formData.message });
      if (!result.success) {
        e.preventDefault();
        setClientErrors(prev => ({ ...prev, ...result.error.flatten().fieldErrors }));
        return;
      }
    }
    // If valid, let the form action proceed
  };

  useEffect(() => {
    if (state.success) {
      setCurrentStep(3);
      formRef.current?.reset();
      setFormData({ name: "", email: "", phone: "", city: "", message: "" });
    } else if (state.message && !state.success && state.errors) {
      if (state.errors.name || state.errors.email || state.errors.phone || state.errors.city) {
        setCurrentStep(1);
      } else if (state.errors.message) {
        setCurrentStep(2);
      }
    }
  }, [state]);

  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
  };
  const successVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 20, delay: 0.2 } },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <motion.div
      className={styles.contactFormContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <StepperVisual currentStep={currentStep} />
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

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} className={styles.formContent}>
        <AnimatePresence mode="wait">
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
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {(clientErrors?.name || state.errors?.name) && (
                    <p className={styles.errorText}>
                      {clientErrors?.name?.[0] || state.errors?.name?.[0]}
                    </p>
                  )}
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="email" className={styles.label}>Email*</label>
                  <input
                    type="email" id="email" name="email" required
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {(clientErrors?.email || state.errors?.email) && (
                    <p className={styles.errorText}>
                      {clientErrors?.email?.[0] || state.errors?.email?.[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.inputField}>
                  <label htmlFor="phone" className={styles.label}>Téléphone*</label>
                  <input
                    type="tel" id="phone" name="phone"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {(clientErrors?.phone || state.errors?.phone) && (
                    <p className={styles.errorText}>
                      {clientErrors?.phone?.[0] || state.errors?.phone?.[0]}
                    </p>
                  )}
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="city" className={styles.label}>Ville*</label>
                  <input
                    type="text" id="city" name="city" required
                    className={styles.input}
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {(clientErrors?.city || state.errors?.city) && (
                    <p className={styles.errorText}>
                      {clientErrors?.city?.[0] || state.errors?.city?.[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.navigationButtons}>
                <button type="button" onClick={handleNextStep} className={styles.nextButton}>
                  Suivant <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.stepPanel}
            >
              <input type="hidden" name="name" value={formData.name} />
              <input type="hidden" name="email" value={formData.email} />
              <input type="hidden" name="phone" value={formData.phone} />
              <input type="hidden" name="city" value={formData.city} />
              <h3 className={styles.stepTitle}>2. Votre Projet</h3>
              <div className={styles.inputField}>
                <label htmlFor="message" className={styles.label}>Décrivez votre projet*</label>
                <textarea
                  id="message" name="message" rows={6} required
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {state.errors?.message && (
                  <p className={styles.errorText}>{state.errors.message[0]}</p>
                )}
                {clientErrors?.message && (
                  <p className={styles.errorText}>{clientErrors.message[0]}</p>
                )}
              </div>
              <div className={styles.navigationButtons}>
                <button type="button" onClick={() => setCurrentStep(1)} className={styles.prevButton}>
                  <ArrowLeft size={18} /> Précédent
                </button>
                <SubmitButton />
              </div>
            </motion.div>
          )}
          {currentStep === 3 && (
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