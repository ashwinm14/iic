import Link from "next/link";
import { ArrowRight, Sparkles, Award } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>


        <h1 className={`heading-xl ${styles.title} animate-fade-in delay-100`}>
          Institution&apos;s <span className="text-gradient">Innovation</span> Council
        </h1>

        <p className={`text-lg ${styles.description} animate-fade-in delay-200`}>
          Empowering the next generation of student entrepreneurs and innovators.
          Join us to transform your breakthrough ideas into sustainable, real-world ventures.
        </p>

        <div className={`${styles.actions} animate-fade-in delay-300`}>
          <Link href="#events" className="btn btn-gradient">
            Explore Initiatives <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </Link>
          <Link href="#about" className="btn btn-outline">
            <Award size={18} style={{ marginRight: '0.5rem', color: 'var(--secondary)' }} />
            Discover Our Mission
          </Link>
        </div>

        <div className={`${styles.statsGrid} animate-fade-in delay-300`}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Innovation Events</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>25+</span>
            <span className={styles.statLabel}>Startups Incubated</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>1000+</span>
            <span className={styles.statLabel}>Active Innovators</span>
          </div>
        </div>
      </div>
    </section>
  );
}
