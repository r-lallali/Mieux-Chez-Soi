// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Les styles globaux (peuvent être presque vides)
import styles from './Layout.module.scss'; // Import CSS Module

import Header from './components/Header'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BâtiPro - Rénovation & Urgences Bâtiment",
  description: "Services de rénovation, dépannage urgent et chantiers neufs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.className}>
      <body className={styles.body}> {/* Utilisez le style du module SCSS */}
        <Header />
        <main>{children}</main>
        <footer className={styles.footer}> {/* Style du module SCSS */}
          © 2025 BâtiPro. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}