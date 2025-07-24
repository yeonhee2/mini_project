import { useEffect, useState } from 'react';
import './Carousel.css'

function Carousel() {

  const [slide, setSlide] = useState(1);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('aa')
      
  //       setSlide(slide + 1)
  //   }, 1000);

  // }, [])


  return (
    <div className="Carousel">
      <div className={`wrapper c${slide}`}>
        <div className="box">
          <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/cover/DAY6.jpg`}></img>
        </div>
        <div className="box">
          <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/cover/TWICE.jpg`}></img>
        </div>
        <div className="box">
          <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/cover/Straykids.jpg`}></img>
        </div>
        <div className="box">
          <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/cover/ITZY.jpg`}></img>
        </div>
        <div className="box">
          <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/cover/NMIXX.jpg`}></img>
        </div>
        <div className="box">
          <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/cover/NiziU.jpg`}></img>
        </div>
      </div>

      <button className='pre'> &lt; </button>
      <button className='btn1' onClick={() => {
        document.querySelector('.btn1').classlist.add('c1')
      }}>&nbsp;•&nbsp;</button>
      <button className='btn2'>&nbsp;•&nbsp;</button>
      <button className='btn3'>&nbsp;•&nbsp;</button>
      <button className='btn4'>&nbsp;•&nbsp;</button>
      <button className='btn5'>&nbsp;•&nbsp;</button>
      <button className='btn6'>&nbsp;•&nbsp;</button>
      <button className='next'> &gt; </button>
    </div>
  )
}

export default Carousel