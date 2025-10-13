import { useEffect, useState } from 'react'
import styles from '../styles/ScrollTopButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({top:0, behavior : 'smooth'})
  }

  return(
    <button 
      className={`${styles.scrollTopBtn} ${visible ? styles.show : ''}`}
      onClick={scrollToTop}
      title="맨 위로 가기"
      aria-label="맨 위로 가기"
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </button>
  )
}

export default ScrollTopButton