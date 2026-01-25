import styles from '../styles/Carousel.module.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import UseNavi from '../../../hooks/UseNavi';
import { useEffect } from 'react';

function Carousel( {artist, onReady} ) {
  const {goTo} = UseNavi()
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    fade: true,                // 배너형 전환에 적합
    pauseOnHover: true,
    lazyLoad: "ondemand",      // 이미지 많은 경우 로딩 최적화
    cssEase: "linear"
  };

  // 데이터가 로드되면 부모에게 알림
  useEffect(() => {
    if (artist && artist.length > 0) {
      onReady(); 
    }
  }, [artist, onReady]);
  
  return (
    
    <div className={styles.Carousel}>
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {
            artist.map((data,i) => {
              return(
                <div className={styles.box} 
                  key={i} 
                  onClick={ () => {goTo(`/album/${data.group}`, {group:data.group})
                }}>
                  <img 
                    src={data.coverUrl}
                    alt={`${data.group} cover`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )
            })
          }
        </Slider>
      </div>
    </div>
  
  )
}

export default Carousel