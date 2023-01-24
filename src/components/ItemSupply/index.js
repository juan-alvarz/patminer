import React from 'react'
import Menu from "./../../components/home/menu/menu";
import Footer from "./../../components/home/footer/footer";
import "./ItemSupply.css";
import slider1 from "./../../assets/rfq/3-1.jpg";
import slider2 from "./../../assets/rfq/4-1.jpg";
import slider3 from "./../../assets/rfq/7_720.jpg";
import Table from "./components/table";

const ItemSupply = () => (

    <>
        <br /><br />

        <div className='menuFixMargin'>
            <Menu></Menu>
        </div>
        <div>
            <div className="slider">
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

        <br /><br /><br /><br /><br />
        
        <div className='headerContentFsc'>
            <div className='child1'>
                <div className='contentBtnHeaderFsc'>
                    <input type="text" placeholder='Search part'/*  onChange={event => SetinputSearchValue(event.target.value)} */ /* onKeyPress={() => searchParts(inputSearchValue)} */ />
                    <button /* onClick={} */>SEARCH</button>
                </div>
            </div>
            <div className='child2'>
                <div className='subChild1'>
                    <h1>Request For Quote</h1>
                    <span>ENTER PART NUMBER</span>
                    <input type="text" /* onChange={handlePartNumberChange} */ />
                    <span>ENTER EMAIL ADDRES</span>
                    <input type="text" /* onChange={handleEmailAddressChange} */ />
                    <span>ENTER QUANTITY</span>
                    <input type="text" /* onChange={handleQuantityChange}  */ />
                    <button /* onClick={} */>SUBMIT</button>
                </div>
            </div>
        </div>

        <br /><br /><br /><br /><br /><br /><br />

        <div className='container'>
            <div className='row'>
                <Table/>
            </div>
        </div>
        <Footer></Footer>
    </>
)

export default ItemSupply