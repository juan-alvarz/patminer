// import AltMenu from "./AltMenu";

// export default function Menu(){
//   return (
//     <AltMenu/>
//   )
// }

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './../home.css';
import { Link } from "react-router-dom";
import Logo from "./../../../assets/home/logoOriginal.png";
import MenuIcon from "./../../../assets/home/MenuIcon.svg";
import { Box, styled } from '@mui/material';

const LinkTo = styled(Link)(({ theme }) => ({
  color: 'black !important',
  transition: '.3s all',
  '&:hover': {
    color: '#D0402B'
  }
}))

const Menu = () => {
  const [modalMenu, setmodalMenu] = useState({ left: '100%', visibility: 'hidden' });
  // const [visibily, setVisibily] = useState({ visibility:'hidden' });

  function ShowModalMenu(show) {
    if (show === true) {
      setmodalMenu({ left: '0%', visibility: 'visible' });
      // setVisibily({ visibility: 'visible'});	
    } else {
      setmodalMenu({ left: '100%', visibility: 'hidden' });
      // setVisibily({ visibility: 'hidden'});	
    }
  }

  return (
    <>
      <header id="pass-header" className="header header-transparent menuHeaderAll">
        <div className="header-middle sticky-header fix-top sticky-content has-center">
          <div className="container-fluid NewColorMenu">
            <div className="header-left">
              <Link to="/web/"><span className="logo">
                <img src={Logo} alt="logo" width={153} height={44} />
              </span>
              </Link>
              {/* End Logo */}
              {/* <span className="divider" /> */}
            </div>
            <div className="header-center">
              <nav className="main-nav d-lg-block d-none" >
                <ul className="menu menu-active-underline">
                  <li >
                    <LinkTo to="/web/" >HOME</LinkTo>
                  </li>
                  <li>
                    <LinkTo to='/web/electronics'>ELECTRONICS</LinkTo>
                  </li>
                  <li>
                    <LinkTo to="/web/rfq">RFQ</LinkTo>
                  </li>
                  <li>
                    <LinkTo to="/web/nsns">NSNS</LinkTo>
                  </li>
                  <li>
                    <LinkTo to="/web/fsg/1">FSC LINE CARD</LinkTo>
                  </li>
                  <li>
                    <LinkTo to='/web/aboutus'>ABOUT US</LinkTo>
                  </li>
                  <li className="d-xl-show submenu-container">
                    <LinkTo to="/web/contactUs"><a title='contactUs' className="btn btn-solid gra-reversed btn-purchase" style={{ borderRadius: '1rem', border: 'none', fontSize: '1.5rem' }}>CONTACT US</a></LinkTo>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className='MenuMovilContent'>
        <Link to="/web/">
          <span className="logo">
            <img src={Logo} alt="Logo" className='imgFirst' />
          </span>
        </Link>
        <img src={MenuIcon} alt="Menu" className='imgLast' onClick={() => { ShowModalMenu(true) }} />
      </div>
      {/* <div className='MenuMovilOptions'></div> */}
      {/* <div  className='MenuMovilOptions' style={"visibility:hidden"}> */}
      <div className='MenuMovilOptions' style={modalMenu}>
        <div className='Close'>
          <h1 onClick={() => { ShowModalMenu(false) }}>X</h1>
        </div>
        <div className='Options'>
          <Link to="/web/" className='href'>HOME</Link>
          <Link to="/web/electronics" className='href'>ELECTRONICS</Link>
          <Link to="/web/rfq" className='href'>RFQ</Link>
          <Link to="/web/nsns" className='href'>NSNS</Link>
          <Link to="/web/fsg/1" className='href'>FSC LINE CAR</Link>
          <Link to="/web/contactUs" className='href2'>CONTACT US</Link>
          <Link to="/web/aboutus" className='href2'>ABOUT US</Link>
        </div>
      </div>

    </>
  )
}

export default Menu