// app/services/renovation/page.tsx
import Link from 'next/link';
import styles from '../ServicePage.module.scss';
import layoutStyles from '../../Layout.module.scss';

export default function RenovationPage() {
  return (
    <div className={layoutStyles.section}>
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Rénovation Complète</h1>
          <p className={styles.subtitle}>Du sol au plafond, nous transformons votre espace.</p>
        </header>

        <div className={styles.content}>
          <p>
            Une rénovation complète peut sembler intimidante, mais avec "Mieux Chez Soi",
            vous êtes accompagné à chaque étape. Nous gérons l'ensemble de votre projet,
            de la conception à la livraison.
          </p>

          <h3>Nos prestations de rénovation :</h3>
          <ul>
            <li>Rénovation de cuisines et salles de bain</li>
            <li>Isolation thermique et phonique (murs, combles)</li>
            <li>Pose de revêtements (parquet, carrelage, peinture)</li>
            <li>Mise aux normes électriques et plomberie</li>
            <li>Création et modification de cloisons</li>
          </ul>

          <p>
            Notre expertise nous permet de garantir un travail de qualité,
            réalisé avec des matériaux durables et dans le respect des délais convenus.
          </p>

          <Link href="/#contact" className={styles.ctaButton}>
            Demander un devis rénovation
          </Link>
        </div>
      </div>
    </div>
  );
}