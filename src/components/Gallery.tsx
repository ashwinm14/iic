"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./Gallery.module.css";
import { Loader2 } from "lucide-react";

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

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error("Error fetching gallery:", error);
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
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
            <Loader2 className="animate-spin" size={48} color="var(--primary)" />
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: "center", color: "#94a3b8", padding: "2rem 0" }}>
            No gallery items added yet.
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <div key={item.id} className={styles.imageCard}>
                {item.image_url ? (
                  <img src={item.image_url} alt="Gallery item" className={styles.image} />
                ) : (
                  <div className={styles.placeholder}>📸</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
