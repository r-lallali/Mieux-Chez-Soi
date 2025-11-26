import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './Realisations.module.scss';

export const metadata = {
    title: 'Nos Réalisations - Mieux Chez Soi',
    description: 'Découvrez l\'ensemble de nos projets de rénovation et construction.',
};

export default function RealisationsPage() {
    const realisationsDir = path.join(process.cwd(), 'public/images/realisations');
    let images: string[] = [];

    try {
        const files = fs.readdirSync(realisationsDir);
        images = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    } catch (error) {
        console.error("Error reading realisations directory:", error);
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <Link href="/" className={styles.backLink} prefetch={false}>
                        <ArrowLeft size={20} className="mr-2" />
                        Retour à l'accueil
                    </Link>
                    <h1 className={styles.title}>Nos Réalisations</h1>
                    <p className={styles.description}>
                        Parcourez notre galerie de projets. De la rénovation complète aux petits travaux, nous mettons notre expertise au service de votre habitat.
                    </p>
                </div>

                <div className={styles.grid}>
                    {images.map((image, index) => (
                        <div key={index} className={styles.imageCard}>
                            <Image
                                src={`/images/realisations/${image}`}
                                alt={`Réalisation ${index + 1}`}
                                fill
                                className={styles.image}
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            <div className={styles.overlay} />
                        </div>
                    ))}
                </div>

                {images.length === 0 && (
                    <p className={styles.emptyMessage}>Aucune image trouvée.</p>
                )}
            </div>
        </div>
    );
}
