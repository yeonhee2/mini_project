import styles from "../styles/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerLogo}>🎶 Idol Note</p>
        <p className={styles.footerDesc}>JYP 아티스트들의 스케줄과 음악을 한눈에</p>
        <p className={styles.footerCopy}>© 2025 Idol Note. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer