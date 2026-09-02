"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./Gallery.module.css";
import { Loader2, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  image_url?: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("iic_gallery")
          .select("*")
          .order("priority", { ascending: true })
          .order("created_at", { ascending: true });

        if (!error && data && data.length > 0) {
          setItems(data);
        }
      } catch {
        // Fallback gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className={`section ${styles.gallerySection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Campus Life & Innovation</span>
          <h2 className="heading-lg">
            Photo <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-lg" style={{ marginTop: "1rem" }}>
            A snapshot of our vibrant events and community.
          </p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <Loader2 className="animate-spin" size={48} color="var(--primary)" />
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--foreground-muted)", padding: "2rem 0" }}>
            No gallery items added yet.
          </div>
        ) : (
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeString}></div>
            <div className={styles.marqueeTrack}>
              {/* Duplicate the items twice for an infinite seamless scroll */}
              {[1, 2].map((groupIndex) => (
                <div key={groupIndex} className={styles.marqueeGroup}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.swayWrapper}>
                      <div className={styles.polaroidCard}>
                        <div className={styles.clip}></div>
                        <div className={styles.imageBox}>
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt="Gallery item" 
                              className={styles.image} 
                              loading="lazy"
                            />
                          ) : (
                            <div className={styles.placeholder}>
                              <ImageIcon size={48} className={styles.placeholderIcon} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
