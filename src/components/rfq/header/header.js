import React from 'react'
import { useHistory } from 'react-router-dom'

import "./../rfq.css";
import slider1 from "./../../../assets/rfq/3-1.jpg";
import slider2 from "./../../../assets/rfq/4-1.jpg";
import slider3 from "./../../../assets/rfq/7_720.jpg";

const Header = () => {
     // En tu función
     let history = useHistory();
     const rfq = () => {
         let path ="/web/uploadrfq"
         history.push(path);
     }

    

    return (
        <div>
            <div>
                <div className="sliderRfq">
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
            </div>

            <div className='headerComponent'>
                <h1>Request a Quote</h1>
                <h3>You can submit your RFQ via online form below or</h3>
                <button onClick={rfq}>submit a list of parts here</button>
            </div>
        </div>
    )
}

export default Header