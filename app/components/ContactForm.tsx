
"use client"; 

import { useFormState, useFormStatus } from "react-dom";
import { sendEmail, type FormState } from "../actions/sendEmail";
import { useEffect, useRef } from "react";


const initialState: FormState = {
  success: false,
  message: "",
};


function SubmitButton() {
  const { pending } = useFormStatus(); 

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {pending ? "Envoi en cours..." : "Envoyer la Demande"}
    </button>
  );
}

export default function ContactForm() {
  
  const [state, formAction] = useFormState(sendEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {}
      {!state.success && state.message && (
        <div className="text-red-600 p-3 bg-red-100 rounded-md">
          {state.message}
        </div>
      )}
      {state.success && (
        <div className="text-green-600 p-3 bg-green-100 rounded-md">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom*</label>
          <input type="text" id="name" name="name" required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {state.errors?.name && (
            <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
          <input type="email" id="email" name="email" required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone (Optionnel)</label>
        <input type="tel" id="phone" name="phone"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Votre message*</label>
        <textarea id="message" name="message" rows={5} required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        {state.errors?.message && (
          <p className="text-sm text-red-500 mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}