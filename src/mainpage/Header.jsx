import { useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
  const[isOpen, setIsOpen] = useState(false);
  const naivgate = useNavigate();

  return (
    <div className="Header">  
      <div className="home-logo">
        <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/JYP.png`} onClick={() => naivgate('/')}></img>
      </div>

      <button className='menu-toggle' onClick={ () => setIsOpen(!isOpen)}>
        ≡
      </button>

      <nav className={isOpen ? 'open' : ''}>
        <ul className="nav-menu">
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/DAY6.png`} onClick={() => naivgate('/day6/20150907')}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/TWICE.png`} onClick={() => naivgate('/twice/20151020')}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/StrayKids.png`} onClick={() => naivgate('/straykids/20180325')}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/ITZY.png`} onClick={() => naivgate('/itzy/20190212')}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/NMIXX.png`} onClick={() => naivgate('/nmixx/20220222')}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/NiziU.png`} onClick={() => naivgate('/niziu/20201202')}></img></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header