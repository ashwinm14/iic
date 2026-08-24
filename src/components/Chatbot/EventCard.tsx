"use client";

import React from "react";
import { Calendar, Clock, MapPin, Trophy, ArrowRight, ExternalLink } from "lucide-react";
import { IICEvent } from "@/lib/knowledgeBase";
import styles from "./Chatbot.module.css";

interface EventCardProps {
  event: IICEvent;
  onAskDetails?: (eventTitle: string) => void;
  onRegisterClick?: (event: IICEvent) => void;
}

export default function EventCard({ event, onAskDetails, onRegisterClick }: EventCardProps) {
  const handleRegister = (e: React.MouseEvent) => {
    if (onRegisterClick) {
      onRegisterClick(event);
    }
  };

  const handleDetails = () => {
    if (onAskDetails) {
      onAskDetails(`Tell me more about ${event.title}`);
    }
  };

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventCardHeader} style={{ borderLeftColor: event.color || "var(--primary)" }}>
        <div className={styles.eventCardTag} style={{ color: event.color || "var(--primary)" }}>
          {event.tag || "Innovation Event"}
        </div>
        <h4 className={styles.eventCardTitle}>{event.title}</h4>
      </div>

      <div className={styles.eventCardMeta}>
        <div className={styles.eventMetaItem}>
          <Calendar size={13} className={styles.metaIcon} />
          <span>{event.date}</span>
        </div>
        {event.time && (
          <div className={styles.eventMetaItem}>
            <Clock size={13} className={styles.metaIcon} />
            <span>{event.time}</span>
          </div>
        )}
        <div className={styles.eventMetaItem}>
          <MapPin size={13} className={styles.metaIcon} />
          <span>{event.venue}</span>
        </div>
      </div>

      <p className={styles.eventCardDesc}>{event.description}</p>

      {event.prizePool && (
        <div className={styles.eventPrizeBadge}>
          <Trophy size={13} color="#f59e0b" />
          <span>{event.prizePool}</span>
        </div>
      )}

      <div className={styles.eventCardActions}>
        <a
          href={event.registrationLink || "#events"}
          onClick={handleRegister}
          className={styles.eventRegBtn}
        >
          Register Now <ArrowRight size={13} />
        </a>
        <button
          type="button"
          onClick={handleDetails}
          className={styles.eventDetailsBtn}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
