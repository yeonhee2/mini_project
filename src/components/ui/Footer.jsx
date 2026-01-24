import styles from "../styles/Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerLogo}>🎶 Idol Note</p>
        <p className={styles.footerDesc}>JYP 아티스트들의 스케줄과 음악을 한눈에</p>
        <p className={styles.footerCopy}>© 2025 Idol Note. All Rights Reserved.</p>
        <p className={styles.footerCopy}>
          본 사이트는 아티스트와 팬의 연결을 고민하며 제작한 비영리 팬 메이드(Fan-made) 아카이브입니다. 사용된 아티스트 로고, 사진 등 모든 콘텐츠의 저작권 및 지식재산권은 (주)JYP 엔터테인먼트에 귀속됩니다.
        </p>
      </div>
    </footer>
  )
}

export default Footer