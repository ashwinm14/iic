"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { IIC_TEAM_FALLBACK, IICTeamMember } from "@/lib/knowledgeBase";
import styles from "./Team.module.css";
import { Loader2, UserCheck, ChevronLeft, ChevronRight } from "lucide-react";

export default function Team() {
  const [team, setTeam] = useState<IICTeamMember[]>(IIC_TEAM_FALLBACK);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("iic_team")
          .select("*")
          .order("priority", { ascending: true })
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          setTeam(data);
        }
      } catch (error) {
        console.error("Error fetching team from Supabase, using fallback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // Auto-scrolling logic
  useEffect(() => {
    if (team.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % team.length);
    }, 3500); // 3.5 seconds per slide

    return () => clearInterval(interval);
  }, [team.length, isPaused]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % team.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + team.length) % team.length);
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const total = team.length;
    if (total === 0) return {};
    
    // Calculate shortest distance in a circular array
    let offset = index - activeIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const absOffset = Math.abs(offset);
    const isActive = offset === 0;

    return {
      transform: `perspective(1200px) translateX(${offset * 120}%) scale(${isActive ? 1 : Math.max(0.6, 0.85 - absOffset * 0.1)}) rotateY(${offset * -15}deg)`,
      zIndex: 100 - absOffset,
      opacity: isActive ? 1 : Math.max(0, 1 - absOffset * 0.4),
      pointerEvents: isActive ? "auto" : "auto",
    };
  };

  return (
    <section id="team" className={`section ${styles.sectionWrapper}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="heading-lg">
            Meet the <span className="text-gradient">Squad</span>
          </h2>
          <p className="text-lg" style={{ marginTop: "1rem", maxWidth: "600px", marginInline: "auto" }}>
            The creative minds and driving force behind our mission. Swipe to explore.
          </p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <Loader2 className="animate-spin" size={48} color="var(--primary)" />
          </div>
        ) : team.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--foreground-muted)", padding: "2rem 0" }}>
            No team members added yet.
          </div>
        ) : (
          <div 
            className={styles.carouselContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={styles.carouselTrack}>
              {team.map((member, index) => {
                const style = getCardStyle(index);
                const isActive = index === activeIndex;

                return (
                  <div 
                    key={member.id} 
                    className={`${styles.memberCard} ${isActive ? styles.activeCard : ''}`}
                    style={style}
                    onClick={() => !isActive && setActiveIndex(index)}
                  >
                    <div className={styles.imageBox}>
                      {member.image_url ? (
                        <img 
                          src={member.image_url} 
                          alt={member.name} 
                          className={styles.memberImage}
                          draggable={false}
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <UserCheck size={64} className={styles.placeholderIcon} />
                        </div>
                      )}
                      <div className={styles.overlay}></div>
                    </div>
                    
                    <div className={styles.infoBox}>
                      <h3 className={styles.name}>{member.name}</h3>
                      <div className={styles.roleWrapper}>
                        <span className={styles.roleBadge}>{member.role}</span>
                      </div>
                      <div className={styles.activeIndicator}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.controls}>
              <button onClick={prevSlide} className={styles.controlBtn} aria-label="Previous member">
                <ChevronLeft size={28} />
              </button>
              <div className={styles.indicators}>
                {team.map((_, idx) => (
                  <button 
                    key={idx}
                    className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className={styles.controlBtn} aria-label="Next member">
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
