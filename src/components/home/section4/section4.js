import React from 'react'
import './../home.css';
import "./../../../assets/plugins/landing.min.css";
import quality1 from "./../../../assets/home/quality_img-1.jpg";
import quality2 from "./../../../assets/home/quality_img-2.jpg";
import quality3 from "./../../../assets/home/quality_img-3.jpg";
import quality4 from "./../../../assets/home/quality_img-4.jpg";

const SectionFour = () => (
    <>
        <div className='subsection4Other'>
            <h3>Quality Commitment</h3>
            <p>We utilize ISO9001 AND AS9120 Quality Systems, advanced technologies and databases. PartMiner is compliant in all aspects of our quality systems including pricing, order entry, acknowledgement, invoicing and military RFID packaging.</p>
        </div>
        <div className='qualityImages'>
            <img src={quality1} alt="" />
            <img src={quality2} alt="" />
            <img src={quality3} alt="" />
            <img src={quality4} alt="" />
        </div>
        <div className='content4'>
            <h3 style={{ textAlign: 'center', color: '050505' }}>Other Services</h3>
            <p>We have the ability to manufacture a part per your drawing and specifications. If you will require an Export License for an ITAR item please let us know. Additional fees may apply.</p>
        </div>
    </>
)

export default SectionFour