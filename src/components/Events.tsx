import { ArrowRight, Calendar, Trophy, Users, Lightbulb } from "lucide-react";
import styles from "./Events.module.css";

const events = [
  {
    id: 1,
    title: "Innovators Hackathon 2026",
    date: "Oct 15 - Oct 17, 2026",
    description: "A 48-hour ideation and product sprint focusing on solving real-world challenges using AI, IoT, and CleanTech solutions.",
    tag: "Flagship Hackathon",
    icon: Trophy,
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(30, 58, 138, 0.1))"
  },
  {
    id: 2,
    title: "Startup Pitch & Demo Day",
    date: "Nov 5, 2026",
    description: "Pitch your venture to seasoned angel investors, venture capitalists, and receive critical validation and seed grants.",
    tag: "Incubation & Funding",
    icon: Lightbulb,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.1))"
  },
  {
    id: 3,
    title: "MoE Innovation Leadership Talk",
    date: "Nov 20, 2026",
    description: "An interactive fireside session with prominent startup founders and policymakers from the Ministry of Education Innovation Cell.",
    tag: "Leadership & Policy",
    icon: Users,
    color: "#ef4444",
    gradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(185, 28, 28, 0.1))"
  }
];

export default function Events() {
  return (
    <section id="events" className="section">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>What&apos;s Happening</span>
          <h2 className="heading-lg">
            Featured <span className="text-gradient">Initiatives & Events</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {events.map((event) => {
            const IconComponent = event.icon;
            return (
              <div key={event.id} className={`glass-card ${styles.card}`}>
                <div 
                  className={styles.imagePlaceholder} 
                  style={{ background: event.gradient, borderBottom: `1px solid ${event.color}30` }}
                >
                  <div className={styles.iconCircle} style={{ background: `${event.color}20`, border: `1px solid ${event.color}50` }}>
                    <IconComponent size={36} color={event.color} />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.metaRow}>
                    <span className={styles.date}>
                      <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      {event.date}
                    </span>
                    <span className={styles.tag} style={{ color: event.color, borderColor: `${event.color}40`, background: `${event.color}15` }}>
                      {event.tag}
                    </span>
                  </div>
                  <h3 className={styles.title}>{event.title}</h3>
                  <p className={styles.description}>{event.description}</p>
                  
                  <div className={styles.cardFooter}>
                    <button className={styles.exploreBtn} style={{ color: event.color }}>
                      Register Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <a href="#about" className="btn btn-outline">Explore Full Calendar & Archives</a>
        </div>
      </div>
    </section>
  );
}
