
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
          <h3>Nos prestations de rénovation :</h3>
          <ul>
            <li>Rénovation de cuisines et salles de bain</li>
            <li>Isolation thermique et phonique (murs, combles)</li>
            <li>Pose de revêtements (parquet, carrelage, peinture)</li>
            <li>Mise aux normes électriques et plomberie</li>
            <li>Création et modification de cloisons</li>
          </ul>

          <Link href="/#contact" className={styles.ctaButton} prefetch={false}>
            Demander un devis rénovation
          </Link>
        </div>
      </div>
    </div>
  );
}