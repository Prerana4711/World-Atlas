import React, { useState } from 'react'
import { NavLink } from 'react-router'

const Header = () => {
  const [show, setShow] = useState(false);
  
  const handleButtonToggle = () => {
    setShow(!show);
  };
 const handleLinkClick = () => {
    setShow(false);
  };
  return (
    <header>
      <div className='container'>
        <div className='navbar-grid'>
          <div className='logo'>
            <NavLink to='/'><h1>WorldAtlas</h1></NavLink>
          </div>
          
          <nav className={show ? "show" : ""}>
            <ul>
              <li><NavLink to={"/"}  onClick={handleLinkClick}>Home</NavLink></li>
              <li><NavLink to={"/about"}  onClick={handleLinkClick}>About</NavLink></li>
              <li><NavLink to={"/country"}  onClick={handleLinkClick}>Country</NavLink></li>
              <li><NavLink to={"/contact"}  onClick={handleLinkClick}>Contact</NavLink></li>
            </ul>
          </nav>
          
          <div className="hamburger" onClick={handleButtonToggle}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
