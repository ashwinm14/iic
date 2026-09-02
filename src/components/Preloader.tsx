"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 550);
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`${styles.preloader} ${fadingOut ? styles.fadeOut : ""}`}
      aria-hidden={!loading}
      role="status"
      aria-label="Loading Institution's Innovation Council"
    >
      <div className={styles.ambientGlow} />

      <div className={styles.contentWrapper}>
        {/* Round Animated Logo Container */}
        <div className={styles.roundLoaderContainer}>
          {/* Subtle Outer Dashed Counter-Rotating Track */}
          <svg
            className={styles.svgOuterDash}
            viewBox="0 0 192 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeDasharray="5 7"
            />
          </svg>

          {/* Primary Gradient Circular Spinner Ring */}
          <svg
            className={styles.svgSpinner}
            viewBox="0 0 176 176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="iicRoundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="35%" stopColor="#2563eb" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#d32027" />
              </linearGradient>
            </defs>
            {/* Background circular guide ring */}
            <circle
              cx="88"
              cy="88"
              r="76"
              stroke="#f1f5f9"
              strokeWidth="4"
            />
            {/* Rotating gradient arc */}
            <circle
              cx="88"
              cy="88"
              r="76"
              stroke="url(#iicRoundGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="260 160"
            />
          </svg>

          {/* Expanding pulse wave */}
          <div className={styles.pulseWave} />

          {/* Central Logo Circle */}
          <div className={styles.logoCircle}>
            <Image
              src="/iic-round-logo.png"
              alt="Institution's Innovation Council Logo"
              width={88}
              height={88}
              priority
              className={styles.emblemImage}
            />
          </div>
        </div>

        {/* Brand Title */}
        <h2 className={styles.brandTitle}>
          Institution&apos;s <span className="text-gradient">Innovation</span> Council
        </h2>
      </div>
    </div>
  );
}
