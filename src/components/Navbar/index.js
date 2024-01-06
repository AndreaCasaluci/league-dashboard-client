import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faTrophy, faHandshake, faMitten, faPersonRunning, faPeopleGroup, faRankingStar, faCalendarDays, faScrewdriverWrench, faAward, faStar } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

//@fortawesome/fontawesome-svg-core

//npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/fontawesome-svg-core

const Navbar = ({ setSection, activeSection }) => {
  const handleSectionChange = (newSection) => {
    setSection(newSection);
  };

  const [showSubMenu, setShowSubMenu] = useState(false);

  const showSubMenuOnHover = () => {
    setShowSubMenu(true);
  };

  const hideSubMenuOnLeave = () => {
    setShowSubMenu(false);
  };

  return (
    <div className='navbar-container'>
      <div className="navbar">
        <div className="logo">
          {/* <img src="./logo.png" /> */}
          {/* <img src={require('./COMPETITIVEFUTSALLEAGUELOGO2.jpg')} alt="Logo" className="real-logo" /> */}
          <span className="custom-text">
            <span className="first-letter">C</span>OMPETITIVE<br></br>
            <span className="first-letter">F</span>UTSAL<br></br>
            <span className="first-letter">L</span>EAGUE
          </span>
        </div>
        <ul className="nav-links">
          {/* <li onClick={() => handleSectionChange('Home')} className={activeSection === 'Home' ? 'active' : ''}>
            <FontAwesomeIcon icon={faHouse} className="fa-icon" />Home
          </li> */}
          <li onClick={() => handleSectionChange('Teams')} className={activeSection === 'Teams' ? 'active' : ''}>
            <FontAwesomeIcon icon={faPeopleGroup} className="fa-icon" />Teams
          </li>
          <li onClick={() => handleSectionChange('Players')} className={activeSection === 'Players' ? 'active' : ''}>
            <FontAwesomeIcon icon={faPersonRunning} className="fa-icon" />Players
          </li>
          <li onClick={() => handleSectionChange('Fixtures')} className={activeSection === 'Fixtures' ? 'active' : ''}>
            <FontAwesomeIcon icon={faCalendarDays} className="fa-icon" />Fixtures
          </li>
          <li onClick={() => handleSectionChange('TOTW')} className={activeSection === 'TOTW' ? 'active' : ''}>
            <FontAwesomeIcon icon={faAward} className="fa-icon" />Team Of The Week
          </li>
          <li onClick={() => handleSectionChange('PlayOff')} className={activeSection === 'PlayOff' ? 'active' : ''}>
            <FontAwesomeIcon icon={faStar} className="fa-icon" />PlayOff
          </li>
          <li onClick={() => handleSectionChange('AdminPanel')} className={activeSection === 'AdminPanel' ? 'active' : ''}>
            <FontAwesomeIcon icon={faScrewdriverWrench} className='fa-icon' />Admin Panel
          </li>
          <li onMouseEnter={showSubMenuOnHover}>
            <FontAwesomeIcon icon={faRankingStar} className="fa-icon" />
            Leaderboards
            {showSubMenu && (
              <div className="sub-menu" onMouseEnter={showSubMenuOnHover} onMouseLeave={hideSubMenuOnLeave}>
                {/* Sottomenu separato con le opzioni */}
                <ul>
                  <li onClick={() => handleSectionChange('LeagueLeaderboard')}>
                    <FontAwesomeIcon icon={faTrophy} className="sub-fa-icon" />
                    League Leaderboard
                  </li>
                  <li onClick={() => handleSectionChange('GoalLeaderboard')}>
                    <FontAwesomeIcon icon={faFutbol} className="sub-fa-icon" />
                    Goal Leaderboard
                  </li>
                  <li onClick={() => handleSectionChange('AssistLeaderboard')}>
                    <FontAwesomeIcon icon={faHandshake} className="sub-fa-icon" />
                    Assist Leaderboard
                  </li>
                  <li onClick={() => handleSectionChange('CleansheetLeaderboard')}>
                    <FontAwesomeIcon icon={faMitten} className="sub-fa-icon" />
                    Cleansheet Leaderboard
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>

        <div className="attribution">
          <img src={require('./logoUF.png')} alt="Logo" className="bottomLogo" />
          <div className="attribution-text">
            <p>Powered by<br></br> (UN)COMPETITIVE FUTSAL</p>
            <a href="https://discord.com/invite/My6XSb4tS3" className="discord-link">
              <FontAwesomeIcon icon={faDiscord} className="sub-fa-icon" />Join our Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
