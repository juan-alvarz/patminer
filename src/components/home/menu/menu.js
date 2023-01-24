/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './../home.css';
import { Link } from "react-router-dom";
import Logo from "./../../../assets/home/logoOriginal.png";
import MenuIcon from "./../../../assets/home/MenuIcon.svg";

const Menu = () => {
  const [modalMenu, setmodalMenu] = useState({ left: '100%', visibility: 'hidden' });
  // const [visibily, setVisibily] = useState({ visibility:'hidden' });

  function ShowModalMenu(show) {
    if (show === true) {
      setmodalMenu({ left: '0%', visibility: 'visible' });	
      // setVisibily({ visibility: 'visible'});	
    } else {
      setmodalMenu({ left: '100%',  visibility: 'hidden' });
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
                    <Link to="/web/" >HOME</Link>
                  </li>
                  <li>
                    <Link to='/web/electronics'>ELECTRONICS</Link>
                  </li>
                  <li>
                    <Link to="/web/rfq">RFQ</Link>
                  </li>
                  <li>
                    <Link to="/web/nsns">NSNS</Link>
                  </li>
                  <li>
                    <Link to="/web/fsg/1">FSC LINE CARD</Link>
                  </li>
                  <li className="d-xl-show submenu-container">
                    <Link to="/web/contactUs"><a title='contactUs' className="btn btn-rounded btn-solid gra-reversed btn-purchase">CONTACT US</a></Link>
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
      <div  className='MenuMovilOptions' style={modalMenu}>
        <div className='Close'>
          <h1 onClick={() => { ShowModalMenu(false) }}>X</h1>
        </div>
        <div  className='Options'>
          <Link to="/web/" className='href'>HOME</Link>
          <Link to="/web/electronics" className='href'>ELECTRONICS</Link>
          <Link to="/web/rfq" className='href'>RFQ</Link>
          <Link to="/web/nsns" className='href'>NSNS</Link>
          <Link to="/web/fsg/1" className='href'>FSC LINE CAR</Link>
          <Link to="/web/contactUs" className='href2'>CONTACT US</Link>
        </div>
      </div>
      
    </>
  )
}

export default Menu