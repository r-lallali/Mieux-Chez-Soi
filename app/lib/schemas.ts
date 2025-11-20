
import { z } from "zod";


export const contactSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "L'adresse email est invalide." }),
  phone: z.string().min(10,{message: "Le numéro de téléphone doit contenir 10 chiffres minimum."}),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});



export const step1Schema = contactSchema.pick({
  name: true,
  email: true,
  phone: true,
});