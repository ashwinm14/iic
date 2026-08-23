import Link from "next/link";
import Image from "next/image";
import { Globe, MessageSquare, Share2, Mail, ExternalLink, ShieldCheck } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Image
              src="/iic-logo.png"
              alt="Institution's Innovation Council Logo"
              width={160}
              height={52}
              className={styles.logoImage}
            />
          </div>
          <p className={styles.description}>
            Established under the Ministry of Education (MoE), Govt. of India, to cultivate systemic innovation, promote startup incubation, and foster entrepreneurial mindset.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon} aria-label="Website"><Globe size={18} /></a>
            <a href="#" className={styles.socialIcon} aria-label="Social Share"><Share2 size={18} /></a>
            <a href="#" className={styles.socialIcon} aria-label="Discussions"><MessageSquare size={18} /></a>
            <a href="#" className={styles.socialIcon} aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className={styles.title}>Quick Navigation</h4>
          <ul className={styles.links}>
            <li><Link href="#about" className={styles.link}>About IIC</Link></li>
            <li><Link href="#events" className={styles.link}>Events & Hackathons</Link></li>
            <li><Link href="#team" className={styles.link}>Core Committee</Link></li>
            <li><Link href="#gallery" className={styles.link}>Campus Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.title}>MoE Resources</h4>
          <ul className={styles.links}>
            <li><a href="https://mic.gov.in" target="_blank" rel="noopener noreferrer" className={styles.link}>MoE Innovation Cell <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} /></a></li>
            <li><Link href="#" className={styles.link}>National Innovation Policy (NISP)</Link></li>
            <li><Link href="#" className={styles.link}>Incubation & Pre-Incubation</Link></li>
            <li><Link href="#" className={styles.link}>IPR & Patent Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.title}>Stay Connected</h4>
          <p className={styles.description}>Subscribe for alerts on upcoming hackathons, grants, and innovation challenges.</p>
          <div className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your student/official email" 
              className={styles.newsletterInput}
            />
            <button className="btn btn-gradient" style={{ padding: '0.6rem 1.25rem', whiteSpace: 'nowrap' }}>Subscribe</button>
          </div>
          <div className={styles.affiliationBadge}>
            <ShieldCheck size={16} color="var(--secondary)" />
            <span>Ministry of Education Verified Council</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; {new Date().getFullYear()} Institution&apos;s Innovation Council. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="#" className={styles.bottomLink}>Privacy Policy</Link>
          <Link href="#" className={styles.bottomLink}>Terms of Service</Link>
          <Link href="#" className={styles.bottomLink}>MoE Guidelines</Link>
        </div>
      </div>
    </footer>
  );
}
