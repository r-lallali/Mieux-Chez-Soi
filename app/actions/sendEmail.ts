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
    // 1. Email à l'Admin (Vous)
    const { error: adminError } = await resend.emails.send({
      from: 'Nouveau devis MCS <no-reply@devis.mieux-chezsoi.fr>',
      to: ['lallaliralys@gmail.com', 'contact@mieux-chezsoi.fr'],
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

    if (adminError) {
      console.error("Erreur envoi Admin:", adminError);
      return {
        success: false,
        message: "Échec de l'envoi de l'email administrateur."
      };
    }

    // 2. Email de confirmation au Client + BCC Trustpilot
    const { error: clientError } = await resend.emails.send({
      from: 'Mieux Chez Soi <no-reply@devis.mieux-chezsoi.fr>',
      to: [email], // Le client
      bcc: ['mieux-chezsoi.fr+e8a111b5c1@invite.trustpilot.com'], // Trustpilot
      replyTo: 'contact@mieux-chezsoi.fr',
      subject: `Confirmation de votre demande de devis - Mieux Chez Soi`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Bonjour ${name},</h2>
          <p>Nous avons bien reçu votre demande de devis et nous vous en remercions.</p>
          <p>Notre équipe va étudier votre projet et vous recontactera très prochainement (sous 24h à 48h).</p>
          <br>
          <p><strong>Récapitulatif de votre demande :</strong></p>
          <p><em>"${message.replace(/\n/g, "<br>")}"</em></p>
          <br>
          <p>Cordialement,</p>
          <p><strong>L'équipe Mieux Chez Soi</strong><br>
          <a href="https://www.mieux-chezsoi.fr" style="color: #9A1B2F;">www.mieux-chezsoi.fr</a></p>
        </div>
      `
    });

    if (clientError) {
      console.error("Erreur envoi Client:", clientError);
      // On ne retourne pas d'erreur fatale ici car l'admin a bien reçu le devis
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