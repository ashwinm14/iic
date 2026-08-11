"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Lightbulb, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Lightbulb className={styles.logoIcon} size={28} />
          <span>IIC<span className="text-gradient">.</span></span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="#about" className={styles.navLink}>About</Link>
          <Link href="#events" className={styles.navLink}>Events</Link>
          <Link href="#team" className={styles.navLink}>Team</Link>
          <button className="btn btn-gradient">Join Us</button>
        </div>

        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}
