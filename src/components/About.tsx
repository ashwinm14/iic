import { Target, Lightbulb, Rocket, CheckCircle2 } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <span className={styles.subtitle}>Who We Are</span>
          <h2 className={`heading-lg ${styles.title}`}>
            Driving the Culture of <span className="text-gradient">Innovation</span>
          </h2>
          <p className="text-lg" style={{ marginBottom: "1.5rem" }}>
            The Institution&apos;s Innovation Council (IIC), established under the aegis of the Ministry of Education (MoE), Government of India, is dedicated to fostering a vibrant ecosystem for creativity, ideation, and entrepreneurship.
          </p>
          <p className="text-lg" style={{ marginBottom: "2rem", color: "rgba(241, 245, 249, 0.65)" }}>
            We bridge the gap between classroom academic theory and real-world problem solving, guiding aspiring student innovators every step of the journey.
          </p>
          
          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <CheckCircle2 size={20} color="var(--primary)" />
              <span>MoE Innovation Cell Certified</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={20} color="var(--secondary)" />
              <span>Comprehensive Startup Incubation</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={20} color="var(--accent)" />
              <span>Industry & Investor Mentorship</span>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          <div className={`glass-card ${styles.card} ${styles.cardBlue}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.iconBlue}`}>
                <Target size={24} color="#3b82f6" />
              </div>
              <h3 className={styles.cardTitle}>Our Mission</h3>
            </div>
            <p className="text-lg" style={{ fontSize: "0.95rem" }}>
              To systematically foster the culture of innovation amongst students across our institution, encouraging them to transform ideas into viable products and prototypes.
            </p>
          </div>

          <div className={`glass-card ${styles.card} ${styles.cardOrange}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.iconOrange}`}>
                <Lightbulb size={24} color="#f59e0b" />
              </div>
              <h3 className={styles.cardTitle}>Our Vision</h3>
            </div>
            <p className="text-lg" style={{ fontSize: "0.95rem" }}>
              To be a leading hub for student entrepreneurs, providing the resources, mentorship, pre-incubation, and platform needed to build successful startups.
            </p>
          </div>

          <div className={`glass-card ${styles.card} ${styles.cardRed}`}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.iconRed}`}>
                <Rocket size={24} color="#ef4444" />
              </div>
              <h3 className={styles.cardTitle}>Our Approach</h3>
            </div>
            <p className="text-lg" style={{ fontSize: "0.95rem" }}>
              Through workshops, hackathons, ideathons, and prototype grants, we provide an end-to-end pathway for cognitive development and venture creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
