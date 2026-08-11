import { Target, Lightbulb, Rocket } from "lucide-react";
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
          <p className="text-lg mb-8" style={{ marginBottom: "2rem" }}>
            The Institution Innovation Council is dedicated to fostering a vibrant ecosystem for creativity and entrepreneurship. We bridge the gap between academic learning and real-world problem solving.
          </p>
          <button className="btn btn-outline">Read Our Full Story</button>
        </div>

        <div className={styles.cards}>
          <div className={`glass-card ${styles.card}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <Target size={24} />
              </div>
              <h3 className={styles.cardTitle}>Our Mission</h3>
            </div>
            <p className="text-lg" style={{ fontSize: "0.95rem" }}>
              To systematically foster the culture of innovation amongst students across our institution, encouraging them to transform ideas into viable products.
            </p>
          </div>

          <div className={`glass-card ${styles.card}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <Lightbulb size={24} color="var(--secondary)" />
              </div>
              <h3 className={styles.cardTitle}>Our Vision</h3>
            </div>
            <p className="text-lg" style={{ fontSize: "0.95rem" }}>
              To be a leading hub for student entrepreneurs, providing the resources, mentorship, and platform needed to build successful startups.
            </p>
          </div>

          <div className={`glass-card ${styles.card}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <Rocket size={24} color="var(--accent)" />
              </div>
              <h3 className={styles.cardTitle}>Our Approach</h3>
            </div>
            <p className="text-lg" style={{ fontSize: "0.95rem" }}>
              Through workshops, hackathons, and incubation support, we provide an end-to-end pathway for cognitive development and venture creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
