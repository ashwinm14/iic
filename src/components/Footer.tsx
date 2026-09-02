import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Institution&apos;s Innovation Council IEDC CEV. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
