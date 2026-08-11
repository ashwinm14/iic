"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./Team.module.css";
import { Loader2 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description?: string;
  image_url?: string;
}

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from("iic_team")
          .select("*")
          .order("priority", { ascending: true })
          .order("created_at", { ascending: true });

        if (error) throw error;
        setTeam(data || []);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section id="team" className="section">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Meet The Leaders</span>
          <h2 className="heading-lg">
            Our <span className="text-gradient">Team</span>
          </h2>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <Loader2 className="animate-spin" size={48} color="var(--primary)" />
          </div>
        ) : team.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
            No team members added yet.
          </div>
        ) : (
          <div className={styles.grid}>
            {team.map((member) => (
              <div key={member.id} className={`glass-card ${styles.memberCard}`}>
                <div className={styles.imageWrapper}>
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.name} className={styles.image} />
                  ) : (
                    <div className={styles.placeholder}>👤</div>
                  )}
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                {member.description && (
                  <p className={styles.description}>{member.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
