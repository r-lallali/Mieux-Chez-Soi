# Mieux Chez Soi

"Mieux Chez Soi" est un projet moderne construit avec Next.js 16 et React 19, mettant l'accent sur les Server Actions, une gestion de formulaire avancée et une approche de style hybride.

## 🚀 Technologies principales

* **Framework** : **Next.js 16+** (utilisant l'App Router)
* **Langage** : **TypeScript**
* **UI** : **React 19**
* **Styling** : **Sass/SCSS Modules** ET **Tailwind CSS 4** (via PostCSS)
* **Animations** : **Framer Motion**
* **Composants UI** : **Headless UI**
* **Icônes** : **Lucide React**
* **Backend (Actions)** : **Next.js Server Actions** (`"use server"`)
* **Validation de Schéma** : **Zod**
* **Emailing** : **Resend** (pour l'envoi des demandes de devis)

## 📝 Remarques et Analyse du Projet

Ce projet se distingue par l'utilisation de plusieurs patterns de développement très récents et efficaces.

### 1. Stack "Bleeding Edge"

Le projet est à la pointe de l'écosystème React, utilisant **React 19** (version `19.2.0`) et **Next.js 16** (version `16.0.1`). Cela lui permet de tirer parti des fonctionnalités les plus récentes, notamment pour la gestion des formulaires et les actions serveur.

### 2. Gestion de formulaire moderne et robuste

L'une des parties les plus intéressantes est le formulaire de contact (`ContactFormStepper.tsx`). Il combine plusieurs techniques modernes :

* **Multi-étapes** : Pour une meilleure expérience utilisateur lors de la saisie d'informations.
* **Hooks React 19** : Utilisation de `useActionState` (via `useFormState`) et `useFormStatus` pour gérer l'état du formulaire (chargement, erreurs, succès) de manière native.
* **Double Validation Zod** : Zod est utilisé à la fois :
    1.  **Côté client** (`step1Schema`) pour une validation instantanée avant de passer à l'étape suivante.
    2.  **Côté serveur** (`contactSchema` dans `sendEmail.ts`) pour sécuriser la Server Action avant d'envoyer l'email. C'est un pattern très robuste.
* **Server Actions** : Toute la logique d'envoi d'email est gérée via une Server Action (`"use server"`), éliminant le besoin de créer des routes d'API manuelles. L'email est envoyé via **Resend**.

### 3. Approche de style hybride

Le projet n'opte pas pour "tout Tailwind" ou "tout Sass", mais combine intelligemment les deux :

* **SCSS Modules** : La plupart des composants (`Hero`, `Stats`, `About`, `Services`, `ContactFormStepper`, etc.) sont stylisés avec leurs propres fichiers `.module.scss`. Cela permet un scope CSS localisé, l'utilisation de variables Sass (`$primary-color`) et du nesting.
* **Tailwind CSS 4** : Tailwind est configuré via `postcss.config.mjs` et listé comme dépendance de développement. Il est probable qu'il soit utilisé pour les styles globaux, les classes utilitaires de base ou pour standardiser le design system, tandis que SCSS gère la logique de style plus complexe des composants.
* **Abandon d'un composant** : Le fichier `app/components/ContactForm.tsx` existe mais n'est pas importé dans `app/page.tsx`, indiquant qu'il a été remplacé par le `ContactFormStepper.tsx`, plus avancé.

### 4. Forte utilisation des animations

Le site met un fort accent sur l'expérience utilisateur grâce à **Framer Motion**. Presque chaque composant principal (`Hero.tsx`, `About.tsx`, `Realisations.tsx`, `Stats.tsx`) possède ses propres animations (fade-in, slide-in) gérées avec les hooks `whileInView`, `initial`, et des `Variants`.

### 5. Structure de contenu claire

Le projet utilise l'App Router pour structurer le contenu de manière logique :

* **`app/page.tsx`** : Agit comme la page d'accueil principale ("one-page") qui assemble toutes les sections.
* **`app/services/.../page.tsx`** : Des routes dédiées (par exemple, `/services/renovation`, `/services/depannage`) sont créées pour le contenu statique, ce qui est excellent pour le SEO.
* **Composants partagés** : Les composants réutilisables (`Header`, `Stats`, `About`, etc.) sont correctement isolés dans `app/components/`.
