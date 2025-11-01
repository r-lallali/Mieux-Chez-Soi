// app/actions/sendEmail.ts
"use server"; 

import { z } from "zod";
import { Resend } from 'resend';
import { contactSchema } from '../lib/schemas';
// Initialiser Resend avec votre clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

export async function sendEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  // La validation utilise maintenant le schéma importé (inchangé)
  const validatedFields = contactSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    console.log("Validation échouée:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Échec de la validation. Veuillez corriger les champs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, message } = validatedFields.data;
  
  try {
    const { data, error } = await resend.emails.send({
      // IMPORTANT : Pour les tests, Resend vous autorise à utiliser "onboarding@resend.dev"
      // Pour la production, vous DEVEZ vérifier votre propre domaine (ex: "contact@mieux-chez-soi.com")
      from: 'Mieux Chez Soi  <no-reply@mieux-chezsoi.fr>',
      
      // Mettez l'email où VOUS voulez recevoir les devis
      to: ['lallaliralys@gmail.com'], 
      
      subject: `Nouveau devis de ${name}`,
      
      // L'email que vous recevrez
      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email du client:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    // Si Resend retourne une erreur
    if (error) {
      console.error("Erreur Resend:", error);
      return { 
        success: false, 
        message: "Échec de l'envoi de l'email. Veuillez réessayer." 
      };
    }

    // 3. Retourner une réponse de succès (inchangé)
    return {
      success: true,
      message: "Merci ! Votre message a bien été envoyé. Nous vous recontacterons bientôt.",
    };

  } catch (exception) {
    // Gérer les erreurs inattendues
    console.error("Exception lors de l'envoi:", exception);
    return { 
      success: false, 
      message: "Une erreur interne est survenue. Veuillez réessayer." 
    };
  }
}