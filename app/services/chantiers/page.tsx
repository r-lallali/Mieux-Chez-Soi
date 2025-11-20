
import Link from 'next/link';
import styles from '../ServicePage.module.scss';
import layoutStyles from '../../Layout.module.scss';

export default function ChantiersPage() {
  return (
    <div className={layoutStyles.section}>
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>Chantiers Neufs</h1>
          <p className={styles.subtitle}>Construction et extensions de bâtiments.</p>
        </header>

        <div className={styles.content}>
          <h3>Nos compétences en chantier :</h3>
          <ul>
            <li>Construction d'extensions et surélévations</li>
            <li>Aménagement de locaux professionnels</li>
            <li>Maçonnerie générale</li>
            <li>Coordination tous corps d'état</li>
          </ul>

          <Link href="/#contact" className={styles.ctaButton}>
            Discuter d'un nouveau projet
          </Link>
        </div>
      </div>
    </div>
  );
}