import Link from "next/link";
import { ArrowRight, Award, Activity, Users, Star } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        {/* Left Side: Content */}
        <div className={styles.heroContent}>
          <div className={` animate-fade-in delay-100`}>
          
          </div>
          
          <h1 className={`heading-xl ${styles.title} animate-fade-in delay-200`}>
            Institution&apos;s <br />
            <span className={styles.textOutline}>Innovation</span> <br />
            <span className="text-gradient">Council</span>
          </h1>

          <p className={`text-lg ${styles.description} animate-fade-in delay-300`}>
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
        </div>

        {/* Right Side: Dynamic Graphic / Widget */}
        <div className={`${styles.heroGraphic} animate-fade-in delay-200`}>
          {/* Orbit rings */}
          <div className={styles.orbitRing1}>
            <div className={styles.orbitNode1}></div>
          </div>
          <div className={styles.orbitRing2}>
             <div className={styles.orbitNode2}></div>
             <div className={styles.orbitNode3}></div>
          </div>
          
          {/* Glassmorphic Dashboard Widget */}
          <div className={styles.glassWidget}>
            <div className={styles.widgetHeader}>
              <Activity size={18} color="#2563eb" />
              <span>Network Status</span>
            </div>
            <div className={styles.widgetBody}>
              <div className={styles.statRow}>
                <Users size={16} color="#64748b" />
                <span className={styles.statLabel}>Active Innovators</span>
                <span className={styles.statValue}>1,200+</span>
              </div>
              <div className={styles.statRow}>
                <Award size={16} color="#d97706" />
                <span className={styles.statLabel}>Startups Incubated</span>
                <span className={styles.statValue}>45+</span>
              </div>
            </div>
            <div className={styles.widgetFooter}>
              <span className={styles.pulseIndicator}></span>
              <span>Live Updates</span>
            </div>
          </div>
          
          {/* Second Glass Widget */}
          <div className={`${styles.glassWidget} ${styles.widgetSecondary}`}>
             <div className={styles.widgetHeader}>
               <Star size={18} color="#d32027" />
               <span>Top Tier</span>
             </div>
             <p className={styles.widgetText}>Recognized among top institutions for fostering entrepreneurship.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
