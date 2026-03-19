import React from 'react'
import FooterApi from '../../api/FooterApi.json'
import { IoCallSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb"
import { NavLink } from 'react-router-dom'

const Footer = () => {
  
  const footerIcon = {
    MdPlace: <MdPlace />,
    IoCallSharp: <IoCallSharp />,
    TbMailPlus: <TbMailPlus />
  }

  // Function to render appropriate link based on type
  const renderDetail = (item) => {
    switch(item.icon) {
      case 'MdPlace':
        return (
          <a 
            href="https://maps.google.com/?q=Noida City Center" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {item.detail}
          </a>
        );
      case 'IoCallSharp':
        return (
          <a href={`tel:${item.detail}`}>
            {item.detail}
          </a>
        );
      case 'TbMailPlus':
        return (
          <a href={`mailto:${item.detail}`}>
            {item.detail}
          </a>
        );
      default:
        return item.detail;
    }
  }

  return (
    <footer className='footer-section'>
      <div className='grid container grid-three-cols'>
        {
          FooterApi.map((footerdata, index) => {
            const { icon, title, detail } = footerdata;
            return (
              <div className='footer-contact' key={index}>
                <div className='icon'>{footerIcon[icon]}</div>
                <div className='footer-contact-text'>
                  <p>{title}</p>
                  <p className='footer-link'>
                    {renderDetail(footerdata)}
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
      
      <div className='copyright-area'>
        <div className='container'>
          <p>
            Copyright &copy; 2026, All Right Reserved
            <NavLink to="https://google.com" target='_blank'>Prerana Gupta</NavLink>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer