// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import styles from './Layout.module.scss'; 

import Header from './components/Header'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mieux Chez-Soi",
  description: "Services de rénovation, dépannage urgent et chantiers neufs.",
};

const phoneNumber = "06 51 24 52 84";
const phoneHref = `tel:${phoneNumber.replace(/\s/g, '')}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.className}>
      <body className={styles.body}> 
        <Header />
        <main>{children}</main>
        
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerZone}>
              Intervention en Île-de-France.
            </p>
          </div>
          <p className={styles.footerCopyright}>
            © 2025 Mieux Chez Soi. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  );
}