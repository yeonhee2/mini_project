import styles from "../styles/Admin.module.css";

export default function AdminPageHeader({ title, desc, actions }) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        {desc ? <p className={styles.pageDesc}>{desc}</p> : null}
      </div>

      {actions ? <div className={styles.pageActions}>{actions}</div> : null}
    </div>
  );
}
