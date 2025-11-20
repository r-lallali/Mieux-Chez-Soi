
import Link from 'next/link';
import styles from '../ServicePage.module.scss';
import layoutStyles from '../../Layout.module.scss';

export default function DepannagePage() {
  return (
    <div className={layoutStyles.section}>
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Urgences & Dépannage</h1>
          <p className={styles.subtitle}>Intervention rapide en Île-de-France.</p>
        </header>

        <div className={styles.content}>
          <h3>Nos interventions fréquentes :</h3>
          <ul>
            <li>Recherche et réparation de fuites d'eau</li>
            <li>Dégorgement de canalisations</li>
            <li>Pannes de courant et diagnostics électriques</li>
            <li>Réparation de chauffe-eau</li>
          </ul>

          <Link href="/#contact" className={styles.ctaButton}>
            Contacter pour une urgence
          </Link>
        </div>
      </div>
    </div>
  );
}