"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import styles from "./Events.module.css";
import { supabase } from "@/lib/supabase";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*, event_registrations(count)')
          .order('start_time', { ascending: false });

        if (error) {
          console.error("Error fetching events:", error);
          return;
        }

        if (data) {
          const iicEvents = data.filter((ev: any) => {
            const searchString = `
              ${ev.title || ""} 
              ${ev.tagline || ""} 
              ${ev.venue || ""}
              ${ev.description || ""}
            `.toLowerCase();
            return searchString.includes("iic");
          });

          const mapped = iicEvents.map((ev: any) => ({
            ...ev,
            registration_link: ev.registration_link || (ev.form_active ? `/events/${ev.id}/register` : "#"),
          }));

          setEvents(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const liveEvents = events.filter((event) => {
    if (event.publish_status) {
      return event.publish_status === 'live';
    }
    return event.is_live && event.requires_registration !== false;
  });

  const upcomingEvents = events.filter((event) => {
    if (event.publish_status) {
      return event.publish_status === 'upcoming';
    }
    return event.is_live && event.requires_registration === false;
  });

  const pastEvents = events.filter((event) => {
    if (event.publish_status) {
      return event.publish_status === 'completed';
    }
    return !event.is_live;
  });

  const getTicketDateParts = (startStr?: string) => {
    if (!startStr) return { day: "??", month: "TBA", year: "????" };
    const date = new Date(startStr);
    if (Number.isNaN(date.getTime())) return { day: "??", month: startStr, year: "" };
    
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString("en-GB", { month: "short" }),
      year: date.getFullYear().toString(),
      time: date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })
    };
  };

  const TicketCard = ({ event, badge, badgeClass }: { event: any, badge: string, badgeClass: string }) => {
    const isHouseFull = event.max_seats > 0 && event.event_registrations && event.event_registrations[0]?.count >= event.max_seats;
    const isClosed = (!event.form_active) || isHouseFull || badge === "COMPLETED";
    const dateParts = getTicketDateParts(event.start_time);

    return (
      <div className={styles.ticket}>
        {/* Ticket Stub / Date Block */}
        <div className={styles.ticketDate}>
          <span className={styles.monthText}>{dateParts.month}</span>
          <span className={styles.dayText}>{dateParts.day}</span>
          <span className={styles.yearText}>{dateParts.year}</span>
          <div className={styles.stubBarcode}>IIC-EVT-{event.id || '2026'}</div>
        </div>

        {/* Ticket Body */}
        <div className={styles.ticketBody}>
          <div className={styles.watermark}>IIC EVENT PASS</div>
          <div className={styles.ticketInfo}>
            <span className={`${styles.ticketBadge} ${badgeClass}`}>
              {badge}
            </span>
            <h3 className={styles.title}>{event.title}</h3>
            {event.tagline && <p className={styles.tagline}>{event.tagline}</p>}
            
            <div className={styles.metaInfo}>
              {dateParts.time && dateParts.time !== "Invalid Date" && (
                <div className={styles.metaItem}>
                  <Clock size={16} color="var(--primary)" />
                  <span>{dateParts.time}</span>
                </div>
              )}
              {event.venue && (
                <div className={styles.metaItem}>
                  <MapPin size={16} color="var(--primary)" />
                  <span>{event.venue}</span>
                </div>
              )}
            </div>

            <div className={styles.ticketAction}>
              {!isClosed ? (
                <a href={event.registration_link || "#"} target="_blank" rel="noopener noreferrer" className={`btn btn-gradient ${styles.actionBtn}`}>
                  Register Now <ArrowRight size={16} />
                </a>
              ) : event.aftermovie_link ? (
                <a href={event.aftermovie_link} target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${styles.actionBtn}`}>
                  Watch Aftermovie <ExternalLink size={16} />
                </a>
              ) : (
                <button disabled className={styles.disabledBtn}>
                  {isHouseFull ? "House Full" : "Closed"}
                </button>
              )}
            </div>
          </div>
          
          <div className={styles.ticketImage}>
            <Image 
              src={event.poster_url || "/placeholder.svg"} 
              alt={event.title} 
              fill 
              className={styles.posterImage}
              unoptimized
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="events" className={`section ${styles.eventsSection}`}>
      <div className={styles.glowBlob1} />
      <div className={styles.glowBlob2} />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Happenings</span>
          <h2 className="heading-lg">
            Our <span className="text-gradient">Timeline of Innovation</span>
          </h2>
          <p className={styles.headerDesc}>
            Grab your tickets to the future. Discover live happenings, register for upcoming workshops, and browse our past events.
          </p>
        </div>

        {isLoading ? (
          <div className={styles.ticketList}>
            {[1, 2].map(i => (
              <div key={i} className={styles.ticket} style={{ height: '220px', background: 'rgba(255,255,255,0.7)', animation: 'pulse 2s infinite' }} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
            <p>No IIC events found currently. Stay tuned!</p>
          </div>
        ) : (
          <>
            {liveEvents.length > 0 && (
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.liveIndicator} /> Live Now
                </h3>
                <div className={styles.ticketList}>
                  {liveEvents.map((event) => (
                    <TicketCard key={event.id} event={event} badge="LIVE NOW" badgeClass={styles.badgeLive} />
                  ))}
                </div>
              </div>
            )}

            {upcomingEvents.length > 0 && (
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.upcomingIndicator} /> Upcoming Events
                </h3>
                <div className={styles.ticketList}>
                  {upcomingEvents.map((event) => (
                    <TicketCard key={event.id} event={event} badge="UPCOMING" badgeClass={styles.badgeUpcoming} />
                  ))}
                </div>
              </div>
            )}

            {pastEvents.length > 0 && (
              <div className={styles.sectionBlock}>
                <h3 className={styles.sectionTitle}>
                  Past Events
                </h3>
                <div className={styles.ticketList}>
                  {pastEvents.map((event) => (
                    <TicketCard key={event.id} event={event} badge="COMPLETED" badgeClass={styles.badgePast} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
