"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import styles from "./BeforeAfterSlider.module.scss";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    title?: string;
    description?: string;
}

export default function BeforeAfterSlider({
    beforeImage,
    afterImage,
    title,
    description,
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    return (
        <div className={styles.sliderCard}>
            <div
                className={styles.imageContainer}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                <div className={styles.afterImage}>
                    <Image
                        src={afterImage}
                        alt="Après"
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    <span className={styles.label}>APRÈS</span>
                </div>

                <div
                    className={styles.beforeImage}
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <Image
                        src={beforeImage}
                        alt="Avant"
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    <span className={styles.label}>AVANT</span>
                </div>

                <div
                    className={styles.sliderHandle}
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className={styles.sliderLine} />
                    <div className={styles.sliderButton}>
                        <ChevronsLeftRight size={20} color="white" />
                    </div>
                </div>
            </div>

            {(title || description) && (
                <div className={styles.content}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            )}
        </div>
    );
}
