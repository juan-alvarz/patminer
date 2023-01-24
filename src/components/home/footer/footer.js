import React from 'react'
import './../home.css';
import "./../../../assets/plugins/landing.min.css";
import { Link } from "react-router-dom";
import facebook from "./../../../assets/home/footer/facebook.png";
import twitter from "./../../../assets/home/footer/twitter.png";
import linkedin from "./../../../assets/home/footer/linkedin.png";
import instagram from "./../../../assets/home/footer/instagram.png";
import footer_logo from "./../../../assets/img/logo.png";

const Footer = () => (
    <footer className="footer purchase-section text-center float-bg" id="footer" style={{}}>
        <div className="header header-transparent header-transparent2">
            <div className="header-middle sticky-header fix-top sticky-content has-center header-middle2">
                <br /><br /><br /><br /><br />
                <div className="container-fluid">
                    <div className="header-left">
                        <Link to="/web/">
                            <img style={{ width: '210px', marginInline: '40px' }} src={footer_logo} alt="logo" width={153} height={44} />
                        </Link>
                    </div>
                    <div className="header-center">
                        <nav className="main-nav d-lg-block">
                            <ul className="menu menu-active-underline">
                                <li>
                                    <Link to="/web/"><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold' }}>HOME</h1></Link>
                                </li>
                                <li>
                                    <Link to="/web/rfq"><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold' }}>RFQ</h1></Link>
                                </li>
                                <li>
                                    <Link to="/web/nsns"><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold' }}>NSNS</h1></Link>
                                </li>
                                <li>
                                    <Link to="/web/fsg/1"><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold' }}>FSC LINE CARD</h1></Link>
                                </li>
                                <li className="d-xl-show submenu-container">
                                    <Link to="/web/contactUs"> <a rel="noopener" className="btn btn-rounded btn-solid gra-reversed btn-purchase" style={{ border: '0px', fontWeight: 'bold' }}>CONTACT US</a></Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="header header-transparent header-transparent2">
            <div className="header-middle sticky-header fix-top sticky-content has-center header-middle2" style={{ paddingTop: '0px' }}>
                <div className="container-fluid">
                    <div className="header-left">
                        <p className="w-100 mb-0 header-leftTextChange">
                            Copyright © 2022 PartMiner Industries. All Rights Reserved.
                            <br />
                            <ul className="menu menu-active-underline">
                                <li>
                                    <Link to="/web/terms" style={{ height: '20px !important' }} ><h1 className='aStyle3' href="#sec-demos" style={{ fontWeight: 'bold', fontSize: 12, cursor: 'pointer' }}>Terms and Conditions</h1></Link>
                                </li>
                            </ul>
                        </p>
                    </div>
                    <div className="header-center">
                        <nav className="main-nav d-lg-block">
                            <ul className="menu menu-active-underline">
                                <li>
                                    <span style={{ fontSize: "16px", marginTop: "-4px" }}>Your feedback is appreciated </span>
                                </li>
                                <li>
                                    <a className='aStyle2' href="tel:+1(603) 218-3767">+1(603) 218-3767</a>
                                </li>
                                <li>
                                    <a className='aStyle2' href="mailto:comments@part-miner.com">comments@part-miner.com</a>
                                </li>
                            </ul>
                            <div className='redesSociales'>
                                <a href="https://www.facebook.com/PartminerIndustries" title='facebook'><img src={facebook} alt="" /></a>
                                {/* <a href="#"><img src={twitter} alt="" /></a> */}
                                <a href="https://www.linkedin.com/" title='linkedin'> <img src={linkedin} alt="" /></a>
                                {/* <a href="#"> <img src={instagram} alt="" /></a> */}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </footer>
)

export default Footer