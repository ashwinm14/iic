import { Target, Lightbulb, Rocket, CheckCircle2 } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        {/* Intro Narrative */}
        <div className={styles.introHeader}>
          <span className={styles.subtitle}>Who We Are</span>
          <h2 className={`heading-lg ${styles.title}`}>
            Driving the Culture of <span className="text-gradient">Innovation</span>
          </h2>
          <p className={`text-lg ${styles.description}`}>
            The Institution&apos;s Innovation Council (IIC), established under the aegis of the Ministry of Education (MoE), Government of India, is dedicated to fostering a vibrant ecosystem for creativity, ideation, and entrepreneurship.
          </p>
          <p className={`text-lg ${styles.description}`}>
            We bridge the gap between classroom academic theory and real-world problem solving, guiding aspiring student innovators every step of the journey.
          </p>
          {/* 
          <div className={styles.featurePills}>
            <div className={styles.featurePill}>
              <CheckCircle2 size={18} className={styles.pillIconBlue} />
              <span>MoE Innovation Cell Certified</span>
            </div>
            <div className={styles.featurePill}>
              <CheckCircle2 size={18} className={styles.pillIconOrange} />
              <span>Comprehensive Startup Incubation</span>
            </div>
            <div className={styles.featurePill}>
              <CheckCircle2 size={18} className={styles.pillIconRed} />
              <span>Industry & Investor Mentorship</span>
            </div>
          </div> */}
        </div>

        {/* Strategic Pillars: Mission, Vision & Approach */}
        <div className={styles.pillarsGrid}>
          {/* Pillar 1: Mission */}
          <div className={`${styles.pillarCard} ${styles.pillarBlue}`}>
            <div className={styles.cardWatermark}>01</div>
            <div className={styles.cardTop}>
              <div className={`${styles.cardIconWrapper} ${styles.iconBlue}`}>
                <Target size={26} color="#2563eb" />
              </div>
              {/* <span className={`${styles.cardTag} ${styles.tagBlue}`}>Core Mandate</span> */}
            </div>
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.cardText}>
              To systematically foster the culture of innovation amongst students across our institution, encouraging them to transform ideas into viable products and prototypes.
            </p>
          </div>

          {/* Pillar 2: Vision */}
          <div className={`${styles.pillarCard} ${styles.pillarOrange}`}>
            <div className={styles.cardWatermark}>02</div>
            <div className={styles.cardTop}>
              <div className={`${styles.cardIconWrapper} ${styles.iconOrange}`}>
                <Lightbulb size={26} color="#d97706" />
              </div>
              {/* <span className={`${styles.cardTag} ${styles.tagOrange}`}>Strategic Horizon</span> */}
            </div>
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <p className={styles.cardText}>
              To be a leading hub for student entrepreneurs, providing the resources, mentorship, pre-incubation, and platform needed to build successful startups.
            </p>
          </div>

          {/* Pillar 3: Approach */}
          <div className={`${styles.pillarCard} ${styles.pillarRed}`}>
            <div className={styles.cardWatermark}>03</div>
            <div className={styles.cardTop}>
              <div className={`${styles.cardIconWrapper} ${styles.iconRed}`}>
                <Rocket size={26} color="#dc2626" />
              </div>
              {/* <span className={`${styles.cardTag} ${styles.tagRed}`}>Action Pathway</span> */}
            </div>
            <h3 className={styles.cardTitle}>Our Approach</h3>
            <p className={styles.cardText}>
              Through workshops, hackathons, ideathons, and prototype grants, we provide an end-to-end pathway for cognitive development and venture creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
