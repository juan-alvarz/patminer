import React from 'react'
import FilterResults from "./components/filterResults";
import Menu from "./../../components/home/menu/menu";
import Footer from "./../../components/home/footer/footer";

const FscLineCard = () => (
    <div>
        <div className='menuColor1'>
            <Menu />
        </div>
        <div><FilterResults></FilterResults></div>
        <div className='Footer'>
            <Footer />
        </div>
    </div>
)

export default FscLineCard