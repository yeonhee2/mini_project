import './Carousel.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';



function Carousel( {artist} ) {
  
  const naivgate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed : 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    fade: true
  };
  
  return (
    <div className='container'>
      <div className="Carousel">
        <div className="slider-container">
          <Slider {...settings}>
            {
              artist.map((data,i) => {
                return(
                  <div className="box" key={i} onClick={ () => {
                    naivgate(`/album/${data.group}`,{state: data.group })
                  }}>
                    <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/cover/${data.group}.jpg`}></img>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Carousel