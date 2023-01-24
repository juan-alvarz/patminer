import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import './../home.css';
import tablet1 from "./../../../assets/home/tablet1.png";
import mobile from "./../../../assets/home/mobile.png";
import slider1 from "./../../../assets/rfq/3-1.jpg";
import slider2 from "./../../../assets/rfq/4-1.jpg";
import slider3 from "./../../../assets/rfq/7_720.jpg";
import { Link } from "react-router-dom";
import { baseUrlContact } from "./../../httpBaseUrl.js";
import AWN from 'awesome-notifications';
import axios from 'axios';



// import { useEffect } from 'react';

const SectionOne = () => {
    

    let history = useHistory();

    const [rfqInput, setRfqInput] = useState('')
    const [rfqAdress, setAdress] = useState('')
    const [rfqQuantity, setQuantity] = useState('')

    const handlePartNumberChange = (event) => {
        setRfqInput(event.target.value)
    };



    const handleQuantityChange = (event) => {
        //console.log('Quantity: ', event.target.value)
        // solo numeros positivos
        const regex = /^[0-9]*$/;
        const valQuantity = regex.test(event.target.value) ? true : false;
        //console.log('valQuantity', valQuantity)
        if (valQuantity === true) {
            setQuantity(event.target.value)
        }


    };

    var [valueSearch, setValueSearch] = useState('')
    var [valueSearch2, setValueSearch2] = useState('')

    var url = baseUrlContact + `api/1/search?searchBy=${rfqInput}`
    //console.log('homeurl:',url)
    //console.log('tamañoPart:',rfqInput.length)

    function fetchTasks() {

        if (rfqInput.length === 13 || rfqInput.length === 9) {
            fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log('data5:',data[5])
                const data1 = data[1]
                const data5 = data[5]
                //console.log('data1', data1)
                const struc1 = [];
                data1.map((e, index) => {
                    struc1.push({
                        ITEM_NAME: e.ITEM_NAME,
                        NSN: e.NSN,
                    })
                })  

                //console.log('struc1:',struc1)
                
                data5.map((e, index) => {
                    struc1[0].PART_NUMBER = e.PART_NUMBER
                })
              
                //console.log('homeData:',struc1)
                localStorage.removeItem('data3')
                localStorage.setItem('data3', JSON.stringify(struc1))

                history.push('/web/rfq')

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            })
            .catch(error => console.log("We are having issues with the server. Try again later"));
            
        }else{
            fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log('homeData:',data)
                localStorage.removeItem('data3')
                localStorage.setItem('data3', JSON.stringify(data[1]))
                history.push('/web/rfq')
                
                setTimeout(() => {
                        window.location.reload();
                }, 1000);
            })
            .catch(error => console.log("We are having issues with the server. Try again later"));
        }

        
    }

    // @dev redirect to serach view
    function redirectSearchView() {
        // history.push('/web/search/' + valueSearch)
        // history.push('/web/search/parts/' + valueSearch)
    }


    // emailEl
    let globalOptions = {
        positio: 'bottom- right',
        maxNotifications: 3,
        animationDuration: 200,
        durations: 100,
      };
    let notifier = new AWN(globalOptions);
    const invalidExist = document.getElementsByClassName('invalid').length > 0;

   

    function redirectRfq(e) {
    // validar formulario
 
        if (!invalidExist && rfqInput && rfqQuantity) {
            e.preventDefault();
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            //  fetchTasks();
            notifier.success('Request sent successfully', {
            durations: { success: 0 },
            })   

            localStorage.removeItem('rfqInfo');
            localStorage.removeItem('tblRFQ');
            localStorage.setItem('rfqInfo', JSON.stringify({
                rfqHomeInfo: rfqInput,
                rfqQuantity: rfqQuantity,
            }))
            history.push('/web/rfq')
            fetchTasks()
        // }

      } else {
        // e.preventDefault();

        notifier.alert('Review Input Fields', { durations: { alert: 0 } });
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);
      }
   
        
    }


    function SearchF(event) {
        if (event.target.value.length === 13 || event.target.value.length === 9) {
            //console.log('vale:',event.target.value.length) 
        // setValueSearch(event.target.value)
        // setValueSearch2( "/web/search/" + event.target.value)
        setValueSearch2( "/web/search/"+ event.target.value + "/1")
          //console.log('valueSearch1: ', valueSearch2);
            
        }else{
            // setValueSearch(event.target.value)
            // setValueSearch2( "/web/search/" + event.target.value)
            setValueSearch2("/web/search/" + event.target.value + "/1")
            //console.log('valueSearch2: ', valueSearch2) 
            // history.push('/web/search/' + event.target.value)
        }
    }

    //*navegacion con el teclado wai-aria
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            //console.log('valueSearch2: ', valueSearch2)
            history.push(valueSearch2)
        }
    }


    return (
        <main className="main ">
            <div >
                <div className="sliderHome pts1" >
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

            <div className="page-content">
                <section className="intro-section">
                    <div className="intro-banner banner banner-fixed imageStyles1">
                        <div className="container">
                            <div className="banner-content">
                                
                                <h2 title="Search by NSN, NIIN or Part Number" className="banner-title text-white font-weight-bold ls-m" data-animation-options="{
                                             'name': 'fadeInUpShorter', 'delay': '.6s'
                                         }">
                                </h2>
                                
                                {/* el evento onkeypress foco en el boton*/}
                                {/* <div className="form-group">
                                    <input type="text" className="form-control" id="emailInput" placeholder="Search by Part Number or NSN" onKeyPress={handleKeyPress} onChange={SearchF} />    
                                </div> */}
                                 {/* container */}       

                                <form >
                                    <div className='child1 pt-5'>
                                        <div className='subChild1ContentBtn pt-5'>
                                            <input aria-label="Search" type="text" placeholder='Search part' onChange={SearchF} />
                                            <Link to={valueSearch2}><button type='submit' >SEARCH</button></Link>
                                        </div>
                                        <h3 className="mb-5 text-white ">
                                            <span className="">Search by NSN, NIIN or Part Number</span>
                                        </h3>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <figure className="custom-absolute-img1" data-animation-options="{
                             'name': 'fadeInLeftShorter', 'delay': '.2s'
                         }">
                            <img src={tablet1} width={900} height={656} alt="tablet" />
                        </figure>
                        
                        <div className="custom-absolute-img2">
                                <form onSubmit={(e) => redirectRfq(e)}>
                                    <div className='child2FormQuota'>
                                        <div className='subChild1'> 
                                            <h1>Request For Quote</h1>
                                            <label for="enterpartnumer">ENTER PART NUMBER</label>
                                            <input 
                                                onInvalid={(e) =>
                                                    e.target.setCustomValidity('Please Enter Part Number')
                                                }
                                                onInput={(e) => e.target.setCustomValidity('')}
                                                id="enterpartnumer"	  
                                                // name='rfq'
                                                required 
                                                type="text" 
                                                onChange={handlePartNumberChange} />
                                            <label for="enterquantity">ENTER QUANTITY</label>
                                            <input 
                                                onInvalid={(e) =>
                                                    e.target.setCustomValidity('Please Enter Quantity')
                                                }
                                                onInput={(e) => e.target.setCustomValidity('')}
                                                id="enterquantity"
                                                required 
                                                type="number" 
                                                min="1" pattern="^[0-9]+"
                                                onChange={handleQuantityChange} />
                                            <button type="submit" onClick={() => redirectRfq()}>SUBMIT</button>
                                        </div>

                                    </div>
                                </form>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    )
}

export default SectionOne