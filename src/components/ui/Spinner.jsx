import styles from "../styles/Spinner.module.css"

const Spinners = ({
  size = 28,            
  color = "#0073e6",    
  label = "Loading...",  
  className = "",
  showLabel = false,
  position // 'center' | 'container' | 'topRight' | undefined
}) => {
  const style = {
    "--size": `${size}px`,
    "--color": color
  }

  const posClass =
    position === "center" ? styles.spinnerCenter :
    position === "container" ? styles.spinnerContainer :
    position === "topRight" ? styles.spinnerTopRight :
    "";
  
  return (
    <span className={`${styles.spinnerWrap} ${posClass} ${className}`}>
      <span
        className={styles.spinner}
        style={style}
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label={label} 
      />
      {showLabel && <span className={styles.spinnerLabel}>{label}</span>}
    </span>
  )
}

export default Spinners