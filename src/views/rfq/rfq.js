import React from 'react'
import Header from "./../../components/rfq/header/header";
import PartInformation from "./../../components/rfq/partInformation/partInformation";
import ContactForm from "./../../components/rfq/contactForm/contactForm";
import Menu from "./../../components/home/menu/menu";
import Footer from "./../../components/home/footer/footer";

const Rfq = () => (
    <div>
        <div className='menuColor1'><Menu></Menu></div>
        <div><Header /></div>
        <div><PartInformation /></div>
        <div><ContactForm /></div>
        <div className='Footer'>
            <Footer />
        </div>
    </div>

)

export default Rfq