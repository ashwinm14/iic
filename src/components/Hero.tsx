import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <div className={`${styles.badge} animate-fade-in`}>
          <Sparkles size={16} />
          <span>Innovate. Create. Inspire.</span>
        </div>
        
        <h1 className={`heading-xl ${styles.title} animate-fade-in delay-100`}>
          Institution <span className="text-gradient">Innovation</span> Council
        </h1>
        
        <p className={`text-lg ${styles.description} animate-fade-in delay-200`}>
          Empowering the next generation of student entrepreneurs and innovators. 
          Join us to transform your creative ideas into successful ventures.
        </p>
        
        <div className={`${styles.actions} animate-fade-in delay-300`}>
          <button className="btn btn-gradient">
            Explore Initiatives <ArrowRight size={18} className="ml-2" />
          </button>
          <button className="btn btn-outline">
            View Upcoming Events
          </button>
        </div>
      </div>
    </section>
  );
}
