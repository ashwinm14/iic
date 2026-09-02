"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { IIC_TEAM_FALLBACK, IICTeamMember } from "@/lib/knowledgeBase";
import styles from "./Team.module.css";
import { Loader2, Sparkles, UserCheck } from "lucide-react";

export default function Team() {
  const [team, setTeam] = useState<IICTeamMember[]>(IIC_TEAM_FALLBACK);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
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
      }
    };

    fetchTeam();
  }, []);

  return (
    <section id="team" className="section">
      <div className="container">
        <div className={styles.header}>
          {/* <span className={styles.subtitle}>
            <Sparkles size={14} style={{ display: "inline", marginRight: "6px" }} />
            IIC Committee &apos;26–&apos;27
          </span> */}
          <h2 className="heading-lg">
            Our <span className="text-gradient">Core Committee</span>
          </h2>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <Loader2 className="animate-spin" size={48} color="var(--secondary)" />
          </div>
        ) : team.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(241,245,249,0.5)", padding: "2rem 0" }}>
            No team members added yet.
          </div>
        ) : (
          <div className={styles.grid}>
            {team.map((member) => (
              <div key={member.id} className={`glass-card ${styles.memberCard}`}>
                <div className={styles.iconCircle}>
                  <UserCheck size={24} className={styles.userIcon} />
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                <div className={styles.roleBadge}>
                  <span className={styles.role}>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
