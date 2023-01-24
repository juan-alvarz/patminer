import React from 'react'
import Header from "./../../components/nsns/header/header";
import Glossary from "./../../components/nsns/glossary/glossary";
import Menu from "./../../components/home/menu/menu";
import Footer from "./../../components/home/footer/footer";

const Nsns = () => (
    <div>
        <div className='menuColor1'><Menu></Menu></div>
        <div>
            <Header />
        </div>
        <div>
            <Glossary />
        </div>
        <div className='Footer'>
            <Footer />
        </div>
    </div>
)

export default Nsns