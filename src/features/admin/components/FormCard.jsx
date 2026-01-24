import styles from "../styles/Admin.module.css";

export default function FormCard({ title, children, footer }) {
  return (
    <section className={styles.card}>
      {title ? <h2 className={styles.cardTitle}>{title}</h2> : null}
      <div className={styles.cardBody}>{children}</div>
      {footer ? <div className={styles.cardFooter}>{footer}</div> : null}
    </section>
  );
}
