import { z } from "zod";


export const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." })
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, { message: "Le nom ne doit contenir que des lettres, espaces, tirets ou apostrophes." })
    .trim(),
  email: z.string()
    .email({ message: "L'adresse email est invalide." })
    .trim(),
  phone: z.string()
    .min(10, { message: "Le numéro de téléphone doit contenir 10 chiffres minimum." })
    .regex(/^[\d\s+\.-]+$/, { message: "Le numéro de téléphone contient des caractères invalides." })
    .trim(),
  city: z.string()
    .min(2, { message: "La ville doit contenir au moins 2 caractères." })
    .trim(),
  message: z.string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères." })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères." })
    .refine((val) => !/[<>]/.test(val), { message: "Le message ne doit pas contenir de caractères spéciaux comme < ou >." })
    .trim(),
});

export const step1Schema = contactSchema.pick({
  name: true,
  email: true,
  phone: true,
  city: true,
});

export const step2Schema = contactSchema.pick({
  message: true,
});
