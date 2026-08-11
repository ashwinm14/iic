import { ArrowRight, Calendar } from "lucide-react";
import styles from "./Events.module.css";

const events = [
  {
    id: 1,
    title: "Innovators Hackathon 2026",
    date: "Oct 15 - Oct 17, 2026",
    description: "A 48-hour coding and building marathon focused on solving real-world challenges using AI and Web3 technologies.",
    color: "var(--primary)"
  },
  {
    id: 2,
    title: "Startup Pitch Deck Series",
    date: "Nov 5, 2026",
    description: "Learn how to craft the perfect pitch deck and present your ideas to top-tier investors and industry experts.",
    color: "var(--secondary)"
  },
  {
    id: 3,
    title: "Founder's Talk: Journey to Series A",
    date: "Nov 20, 2026",
    description: "An exclusive fireside chat with successful alumni founders discussing their entrepreneurial journey and key learnings.",
    color: "var(--accent)"
  }
];

export default function Events() {
  return (
    <section id="events" className="section">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>What's Happening</span>
          <h2 className="heading-lg">
            Featured <span className="text-gradient">Initiatives</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {events.map((event) => (
            <div key={event.id} className={`glass-card ${styles.card}`}>
              <div className={styles.imagePlaceholder} style={{ background: `linear-gradient(135deg, ${event.color}40, transparent)` }}>
                <Calendar size={48} color={event.color} opacity={0.8} />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.date}>{event.date}</span>
                <h3 className={styles.title}>{event.title}</h3>
                <p className={styles.description}>{event.description}</p>
                
                <div className={styles.cardFooter}>
                  <button className={styles.exploreBtn}>
                    Register Now <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button className="btn btn-outline">View All Past Events</button>
        </div>
      </div>
    </section>
  );
}
