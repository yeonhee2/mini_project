import { useEffect, useState } from 'react';
import './Carousel.css'

function Carousel() {

  const [slide, setSlide] = useState(1); 

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(s => s % 7 ? s+1 : 1)
    }, 4000); 

    return () => {
      clearInterval(interval)
    }

  }, [])

  return (
    <div className='container'>
      <div className="Carousel">
        <div className={`wrapper c${slide} ${slide!=1 ? 'tran' : ''}`}>
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
          <div className="box">
            <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/cover/DAY6.jpg`}></img>
          </div>
        </div>

        <button className='pre' onClick={ () => {
          setSlide(slide-1)
        }}> &lt; </button>
        <button className='btn1' onClick={() => {
          setSlide(1)
        }}>&nbsp;•&nbsp;</button>
        <button className='btn2'onClick={() => {
          setSlide(2)
        }}>&nbsp;•&nbsp;</button>
        <button className='btn3'onClick={() => {
          setSlide(3)
        }}>&nbsp;•&nbsp;</button>
        <button className='btn4'onClick={() => {
          setSlide(4)
        }}>&nbsp;•&nbsp;</button>
        <button className='btn5'onClick={() => {
          setSlide(5)
        }}>&nbsp;•&nbsp;</button>
        <button className='btn6'onClick={() => {
          setSlide(6)
        }}>&nbsp;•&nbsp;</button>
        <button className='next'onClick={ () => {
          setSlide(slide+1)
        }}> &gt; </button>
      </div>
    </div>
  )
}

export default Carousel