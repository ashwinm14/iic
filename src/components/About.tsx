import { Target, Lightbulb, Rocket, Award, Zap } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section ${styles.aboutSection}`}>
      <div className="container">
        <div className={styles.bentoGrid}>
          
          {/* Cell 1: Intro (Large, 2x2) */}
          <div className={`${styles.bentoCell} ${styles.cellIntro}`}>
            <span className={styles.badge}>Who We Are</span>
            <h2 className={styles.title}>
              Driving the Culture of <br/><span className="text-gradient">Innovation</span>
            </h2>
            <p className={styles.description}>
              The Institution&apos;s Innovation Council (IIC), established under the aegis of the Ministry of Education (MoE), Government of India, is dedicated to fostering a vibrant ecosystem for creativity, ideation, and entrepreneurship.
            </p>
            <p className={styles.description}>
              We bridge the gap between classroom academic theory and real-world problem solving, guiding aspiring student innovators every step of the journey.
            </p>
          </div>

          {/* Cell 2: Vision (Tall, 1x2) */}
          <div className={`${styles.bentoCell} ${styles.cellVision}`}>
            <div className={styles.iconWrapperOrange}>
              <Lightbulb size={28} />
            </div>
            <h3 className={styles.cellTitle}>Vision</h3>
            <p className={styles.cellText}>
              To be a leading hub for student entrepreneurs, providing the resources, mentorship, pre-incubation, and platform needed to build successful startups.
            </p>
          </div>

          {/* Cell 3: MoE Certified (Small, 1x1) */}
          <div className={`${styles.bentoCell} ${styles.cellCertified}`}>
            <Award size={40} color="var(--primary-vibrant)" />
            <h4 className={styles.certTitle}>MoE Certified</h4>
            <p className={styles.certText}>Ministry of Education Innovation Cell</p>
          </div>

          {/* Cell 4: Mission (Small, 1x1) */}
          <div className={`${styles.bentoCell} ${styles.cellMission}`}>
            <div className={styles.iconWrapperBlue}>
              <Target size={28} />
            </div>
            <h3 className={styles.cellTitle}>Mission</h3>
            <p className={styles.cellText}>
              Systematically foster the culture of innovation, encouraging students to transform ideas into viable products.
            </p>
          </div>

          {/* Cell 5: Approach (Wide, 4x1) */}
          <div className={`${styles.bentoCell} ${styles.cellApproach}`}>
             <div className={styles.iconWrapperRed}>
               <Rocket size={32} />
             </div>
             <div className={styles.approachContent}>
               <h3 className={styles.cellTitle}>Our Approach</h3>
               <p className={styles.cellText}>
                 Through workshops, hackathons, ideathons, and prototype grants, we provide an end-to-end pathway for cognitive development and venture creation.
               </p>
               <div className={styles.featureList}>
                 <span className={styles.featureItem}><Zap size={16} className={styles.featureIcon} /> Hackathons</span>
                 <span className={styles.featureItem}><Zap size={16} className={styles.featureIcon} /> Incubation</span>
                 <span className={styles.featureItem}><Zap size={16} className={styles.featureIcon} /> Mentorship</span>
                 <span className={styles.featureItem}><Zap size={16} className={styles.featureIcon} /> Funding</span>
               </div>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
