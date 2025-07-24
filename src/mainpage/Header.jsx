import './Header.css'

function Header() {
  return (
    <div className="Header">  
      <div className="home-logo">
        <img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/JYP.png`}></img>
      </div>
      <nav>
        <ul className="nav-menu">
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/DAY6.png`}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/TWICE.png`}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/StrayKids.png`}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/ITZY.png`}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/NMIXX.png`}></img></li>
          <li><img src={`https://raw.githubusercontent.com/yeonhee2/project_data/refs/heads/main/logoimages/NiziU.png`}></img></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header