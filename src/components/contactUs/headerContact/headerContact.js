import React from 'react'
import { useHistory } from 'react-router-dom'
import "./../contactUs.css";
import slider1 from "./../../../assets/rfq/3-1.jpg";
import slider2 from "./../../../assets/rfq/4-1.jpg";
import slider3 from "./../../../assets/rfq/7_720.jpg";

const HeaderContact = () => {
   // En tu función
    let history = useHistory();
    const rfq = () => {
        let path ="/web/rfq"
        history.push(path);
    }
    

    return (
        <div className='HeaderContact'>
            <div>
                <div className="sliderContactUs">
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
            <div className='headerContact'>
                <h1>Contact PartMiner</h1>
                <h2>This form is for general inquires only, if you need to request a quote</h2>
                <button onClick={rfq}>Visit here</button>
            </div>
        </div>
    )
}

export default HeaderContact