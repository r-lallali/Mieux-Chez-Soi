// app/actions/sendEmail.ts
"use server"; 

import { z } from "zod";
import { Resend } from 'resend'; // <-- NOUVEAU

// Initialiser Resend avec votre clé API depuis les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

// Le schéma de validation Zod ne change pas
const contactSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "L'adresse email est invalide." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

// C'est votre "endpoint" API mis à jour
export async function sendEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  // 1. Extraire et valider les données (inchangé)
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = contactSchema.safeParse(rawData);

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
      from: 'Mieux Chez Soi  <no-reply@contact.mieux-chezsoi.fr>',
      
      // Mettez l'email où VOUS voulez recevoir les devis
      to: ['lallaliralys@gmail.com'], 
      
      subject: `Nouveau devis Mieux Chez Soi de ${name}`,
      
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