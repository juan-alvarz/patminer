import React from 'react'
import Menu from "./../../components/home/menu/menu";
import SectionOne from "./../../components/home/section1/section1";
import SectionTwo from "./../../components/home/section2/section2";
import SectionThree from "./../../components/home/section3/section3";
import SectionFour from "./../../components/home/section4/section4";
import Footer from "./../../components/home/footer/footer";


const Home = () => (
  <div>
    <div className='menu'>
      <Menu />
    </div>
    <div className='section1'>
      <SectionOne />
    </div>
    <div className='section2'>
      <SectionTwo />
    </div>
    <div className='section3'>
      <SectionThree />
    </div>
    <div className='section4'>
      <SectionFour />
    </div>
    <div className='Footer'>
      <Footer />
    </div>
  </div>
)

export default Home