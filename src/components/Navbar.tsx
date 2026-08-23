"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoWrapper}>
            <Image
              src="/iic-logo.png"
              alt="Institution's Innovation Council Logo"
              width={140}
              height={46}
              priority
              className={styles.logoImage}
            />
          </div>
        </Link>

        <div className={styles.navLinks}>
          <Link href="#about" className={styles.navLink}>About</Link>
          <Link href="#events" className={styles.navLink}>Events</Link>
          <Link href="#team" className={styles.navLink}>Team</Link>
          <Link href="#gallery" className={styles.navLink}>Gallery</Link>
          <a href="#events" className="btn btn-gradient">Join Us</a>
        </div>

        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="#about" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="#events" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Events</Link>
          <Link href="#team" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Team</Link>
          <Link href="#gallery" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <a href="#events" className="btn btn-gradient" onClick={() => setMobileMenuOpen(false)}>Join Us</a>
        </div>
      )}
    </nav>
  );
}
