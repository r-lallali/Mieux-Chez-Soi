// app/actions/sendEmail.ts
"use server"; 

import { z } from "zod";
import { Resend } from 'resend';
import { contactSchema } from '../lib/schemas';
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

      from: 'Nouveau devis MCS<no-reply@devis.mieux-chezsoi.fr>',

      to: ['lallaliralys@gmail.com','mieuxchezsoirenove@gmail.com','contact@mieux-chezsoi.fr'], 
      
      subject: `Nouveau devis de ${name}`,

      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email du client:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return { 
        success: false, 
        message: "Échec de l'envoi de l'email. Veuillez réessayer." 
      };
    }

    return {
      success: true,
      message: "Merci ! Votre message a bien été envoyé. Nous vous recontacterons bientôt.",
    };

  } catch (exception) {
    console.error("Exception lors de l'envoi:", exception);
    return { 
      success: false, 
      message: "Une erreur interne est survenue. Veuillez réessayer." 
    };
  }
}