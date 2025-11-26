
"use client";
import { motion, Variants } from "framer-motion";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Realisations from "./components/Realisations";
import ContactFormStepper from "./components/ContactFormStepper";
import Location from "./components/Location";

import layoutStyles from './Layout.module.scss';

export default function HomePage() {
    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div>
            <Hero />

            { }
            { }
            <motion.section
                id="stats"
                className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className={layoutStyles.container}>
                    <Stats />
                </div>
            </motion.section>

            { }
            <motion.section
                id="about"
                className={layoutStyles.section}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className={layoutStyles.container}>
                    <motion.h2
                        className={layoutStyles.sectionTitle}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
                        viewport={{ once: true }}
                    >
                        Qui sommes-nous ?
                    </motion.h2>
                    <About />
                </div>
            </motion.section>

            { }
            <motion.section
                id="services"
                className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className={layoutStyles.container}>
                    <Services />
                </div>
            </motion.section>

            { }
            <motion.section
                id="realisations"
                className={layoutStyles.section}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className={layoutStyles.container}>
                    <motion.h2
                        className={layoutStyles.sectionTitle}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
                        viewport={{ once: true }}
                    >
                        Nos Réalisations
                    </motion.h2>
                    <Realisations />
                </div>
            </motion.section>

            { }
            <motion.section
                id="testimonials"
                className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className={layoutStyles.container}>
                    <motion.h2
                        className={layoutStyles.sectionTitle}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
                        viewport={{ once: true }}
                    >
                        Ils nous font confiance
                    </motion.h2>
                    <Testimonials />
                </div>
            </motion.section>

            { }
            <motion.section
                id="contact"
                className={layoutStyles.section}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className={`${layoutStyles.container} ${layoutStyles.maxWidthLg}`}>
                    <motion.p
                        className={layoutStyles.sectionDescription}
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
                        viewport={{ once: true }}
                    >
                        Décrivez-nous votre projet, demandez un devis gratuitement.
                    </motion.p>
                    <ContactFormStepper />
                </div>
            </motion.section>
            <motion.section
                id="location"
                className={`${layoutStyles.section} ${layoutStyles.sectionBgGray}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className={layoutStyles.container}>
                    <Location />
                </div>
            </motion.section>
        </div>
    );
}