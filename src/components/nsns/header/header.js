import React from 'react'
import "./../nsns.css";
import slider1 from "./../../../assets/rfq/3-1.jpg";
import slider2 from "./../../../assets/rfq/4-1.jpg";
import slider3 from "./../../../assets/rfq/7_720.jpg";

const Header = () => (
    <div>
        <div className="sliderNSNS">
            <ul>
                <li>
                    <img src={slider1} alt="" />
                </li>
                <li>
                    <img src={slider2} alt="" />
                </li>
                <li>
                    <img src={slider3} alt="" />
                </li>
            </ul>
        </div>

        <div className='contentHeaderNsns'>
            <div className='headerNsns'>
                <h1>FSC & NSN Glossary</h1>
            </div>
        </div>
    </div>
)

export default Header