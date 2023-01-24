import React, { useState, useEffect } from 'react'
import "./fscLineCard.css";
// import arrowLeft from "./../../../assets/fscLineCard/arrowLeft.jpg";
import slider1 from "./../../../assets/rfq/3-1.jpg";
import slider2 from "./../../../assets/rfq/4-1.jpg";
import slider3 from "./../../../assets/rfq/7_720.jpg";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// import { baseUrlContact } from "./../../httpBaseUrl.js";
import AWN from 'awesome-notifications';



const FilterResults = () => {

    const [quantity, setQuantity] = useState('');
    const [rfqAdress, setRfqAdress] = useState('');
    const [rfqInput, setRfqInput] = useState('');
    const [InputSearchValue, setInputSearchValue] = useState('');
    const [data, setData] = useState([]);
    const history = useHistory();

    const handleQuantity = (event) => {
        const regex = /^[0-9]*$/;
        const valQuantity = regex.test(event.target.value) ? true : false;
        //console.log('valQuantity', valQuantity)
        if (valQuantity === true) {
            setQuantity(event.target.value)
        }
    };


    const handleRfqInput = (event) => {
        setRfqInput(event.target.value)
    }

    const handleInputSearchValue = (event) => {
        setInputSearchValue(event.target.value)
    }

    const httpGet = (urlApi) => {
        return new Promise((responseAll, rejecteAll) => {
            let url = urlApi

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    responseAll(response)
                }).catch(err => rejecteAll(err));
        })
    }

    const GetGroups = () => {
        httpGet("https://api.part-miner.com/api/fsg/groups").then(res => {
            //console.log("Res es: ", res)
            setData(res)
        })
    }

    useEffect(() => {
        GetGroups()
    }, [])

    var baseUrl = 'https://api.part-miner.com/'

    var url = baseUrl + `api/1/search?searchBy=${rfqInput}`
    //console.log('homeurl:',url)
    //console.log('TPart:',rfqInput.length)
    
    function fetchTasks() {
        if (rfqInput.length === 13 || rfqInput.length === 9) {
            fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log('homeData:',data)    
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
                localStorage.setItem('rfqInfo', JSON.stringify({
                    rfqHomeInfo: rfqInput ? rfqInput : "",
                    rfqQuantity: "",
                }))

                history.push('/web/rfq')
                // window.location.href = window.location.href;
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => console.log("We are having issues with the server. Try again later"));

        }else{
            fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log('struc2:',struc2)
                localStorage.removeItem('data3')
                localStorage.setItem('data3', JSON.stringify(data[1]))
                history.push('/web/rfq')
                // window.location.href = window.location.href;
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => console.log("We are having issues with the server. Try again later"));

        }
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
        
        if (!invalidExist && rfqInput && quantity) {
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
                rfqQuantity: quantity,
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

   

    const handleRedirectToFSC = (fsg_code, fsc_code) => {
        /* http://localhost:3000/web/fsgs/10/fsc/1005/1 */
        //console.log("fsg_code: ", fsg_code)
        //console.log("fsc_code: ", fsc_code)
        history.push(`/web/fsgs/${fsg_code}/fsc/${fsc_code}/1`)
    }


    return (
        <>
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

            <div className='headerContentFsc'>
                <div className='child1'>

                    <form>
                    <div className='contentBtnHeaderFsc'>
                        <input type="text" placeholder='Search part' onChange={handleInputSearchValue} />
                        <Link to={"/web/search/" + InputSearchValue + '/1'}><button type='submit'>SEARCH</button></Link>
                        <h5 className="mb-1 text-white ">
                            <span className="">Search by NSN, NIIN or Part Number</span>
                        </h5>
                    </div>
                    </form>
                    
                </div>
            {/* old rfq */}
                {/* <div className='child2'>
                    <div className='subChild1'>
                        <h1>Request For Quote</h1>
                        <span>ENTER PART NUMBER</span>
                        <input required type="text" onChange={handleRfqInput} />
                        <span>ENTER EMAIL ADDRES</span>
                        <input required type="email" onChange={handleRfqAdress} />
                        <span>ENTER QUANTITY</span>
                        <input required type="text" onChange={handleQuantity} />
                        <button onClick={() => { handleClick() }} >SUBMIT</button>
                    </div>
                </div> */}

                <form onSubmit={(e) => redirectRfq(e)}>
                    <div className='child2'>
                        <div className='subChild1'>
                            <h1>Request For Quote</h1>
                            <span>ENTER PART NUMBER</span>
                            <input 
                                onInvalid={(e) =>
                                    e.target.setCustomValidity('Please Enter Part Number')
                                }
                                onInput={(e) => e.target.setCustomValidity('')}
                                // name='rfq'
                                required 
                                type="text" 
                                onChange={handleRfqInput} />
                            <span>ENTER QUANTITY</span>
                            <input 
                                onInvalid={(e) =>
                                    e.target.setCustomValidity('Please Enter Quantity')
                                }
                                onInput={(e) => e.target.setCustomValidity('')}
                                required 
                                type="number" 
                                min="1" pattern="^[0-9]+"
                                onChange={handleQuantity} />
                            <button type="submit" onClick={() => redirectRfq()}>SUBMIT</button>
                        </div>
                        </div>
                </form>


            </div>
            <br /> <br />
            <div className='navigateSmall'>
                <h1><span>Home/</span> FSGs</h1>
            </div>
            <h1 className='FederalSupplyGroup'>Federal Supply Groups and Classes</h1>
            <div className='FederalSupplyGroupContent'>
                {
                    data.map((el, index) => {
                        if (el) {
                            if (el.FSG_TITLE !== "Live Animals" && el.FSG_TITLE !== "Toiletries") {
                                return (
                                    <>
                                        <h2>FS Group {el.FSG} - {el.FSG_TITLE}</h2>
                                        <div className='FederalSupplyBlock'>
                                            <ul key={index}>
                                                {
                                                    el.FSC_GROUP.map((el2, index2) => {
                                                        return (
                                                            /* http://localhost:3000/web/fsgs/10/fsc/1005/1 */
                                                            <Link to={`/web/fsgs/${el.FSG}/fsc/${el2.FSC}/1`} onClick={()=>handleRedirectToFSC(el.FSG, el2.FSC)} ><li key={index2}>FSC {el2.FSC} {el2.FSC_TITLE}</li></Link>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </>
                                )
                            }

                        } else {
                            return (
                                <h1 key={index} className='errorNoItem'>No item found</h1>
                            )
                        }
                    })
                }
            </div>
        </>
    )
}
export default FilterResults