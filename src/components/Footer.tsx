import Link from "next/link";
import { Lightbulb, Globe, MessageSquare, Share2, Mail } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Lightbulb color="var(--accent)" size={28} />
            <span>IIC<span className="text-gradient">.</span></span>
          </div>
          <p className={styles.description}>
            Institution Innovation Council. Empowering minds to think critically, innovate fearlessly, and build for the future.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon}><Globe size={18} /></a>
            <a href="#" className={styles.socialIcon}><Share2 size={18} /></a>
            <a href="#" className={styles.socialIcon}><MessageSquare size={18} /></a>
            <a href="#" className={styles.socialIcon}><Mail size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className={styles.title}>Quick Links</h4>
          <ul className={styles.links}>
            <li><Link href="#about" className={styles.link}>About Us</Link></li>
            <li><Link href="#events" className={styles.link}>Events & Hackathons</Link></li>
            <li><Link href="#team" className={styles.link}>Our Team</Link></li>
            <li><Link href="#" className={styles.link}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.title}>Resources</h4>
          <ul className={styles.links}>
            <li><Link href="#" className={styles.link}>Incubation Policy</Link></li>
            <li><Link href="#" className={styles.link}>Startup Guide</Link></li>
            <li><Link href="#" className={styles.link}>Mentorship Program</Link></li>
            <li><Link href="#" className={styles.link}>FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.title}>Newsletter</h4>
          <p className={styles.description}>Subscribe to get updates on upcoming events and opportunities.</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <input 
              type="email" 
              placeholder="Your email" 
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '99px',
                color: 'white',
                outline: 'none',
                width: '100%'
              }} 
            />
            <button className="btn btn-gradient" style={{ padding: '0.5rem 1rem' }}>Join</button>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} Institution Innovation Council. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="#" className={styles.link}>Privacy Policy</Link>
          <Link href="#" className={styles.link}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
