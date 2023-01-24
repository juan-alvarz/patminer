import React from 'react'
import HeaderContact from './../../components/contactUs/headerContact/headerContact';
import FormContact from './../../components/contactUs/formContact/formContac';
import Menu from "./../../components/home/menu/menu";
import Footer from "./../../components/home/footer/footer";

const ContactUs = () => {
    return (
        <div>
            <div className='menuColor2'>
                <Menu />
            </div>
            <div>
                <HeaderContact />
            </div>
            <div>
                <FormContact />
            </div>
            <div className='Footer'>
                <Footer />
            </div>
        </div>
    )
}

export default ContactUs