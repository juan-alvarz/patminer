import React, { useState, useEffect } from 'react';
import "./../fscLineCard.css";
import slider1 from "./../../../assets/rfq/3-1.jpg";
import slider2 from "./../../../assets/rfq/4-1.jpg";
import slider3 from "./../../../assets/rfq/7_720.jpg";
import { Link, NavLink, useParams } from "react-router-dom";
// import arrowLeft from "./../../../assets/fscLineCard/arrowLeft.jpg";
import Menu from "./../../home/menu/menu";
import Footer from "./../../home/footer/footer";
import { baseUrlContact } from "./../../httpBaseUrl.js";
import { useHistory } from "react-router-dom";
import loading from "./../../../assets/home/loading-loading-screen.gif";
import axios from "axios";
import { textAlign } from '@mui/system';

import AWN from 'awesome-notifications';


const FilterResultParts = () => {
    const [rfqInput, setRfqInput] = useState('')
    const [rfqQuantity, setQuantity] = useState('')
    const [PartElements, setPartElements] = useState([])
    const [TitlePart, setTitlePart] = useState('')
    const [NavigationBar, setNavigationBar] = useState([]);
    const [pageCounter, setPageCounter] = useState(1);
    const [loadingState, setLoadingState] = useState(false);
    
    let { codeFsc, codeFsg, page } = useParams();
    
    const [inputSearchValue, SetinputSearchValue] = useState(codeFsc||'')

    const history = useHistory();
    var totalPages = [];


    const handlePartNumberChange = (event) => {
        setRfqInput(event.target.value)
    };



    const handleQuantityChange = (event) => {
        const regex = /^[0-9]*$/;
        const valQuantity = regex.test(event.target.value) ? true : false;
        //console.log('valQuantity', valQuantity)
        if (valQuantity === true) {
            setQuantity(event.target.value)
        }
    };

    // btn RFQ
    function fetchTasks(data) {
        //console.log('_data.nsn: ',data);
        
        var url = baseUrlContact + `api/1/search?searchBy=${data}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
            //    //console.log('homeData:',data)            
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

                //console.log('strucSeach:',struc1)
                
                data5.map((e, index) => {
                    struc1[0].PART_NUMBER = e.PART_NUMBER
                })

                //console.log('homeData:',struc1)
            
                localStorage.removeItem('data3')
                localStorage.setItem('data3', JSON.stringify(struc1))
               
                history.push('/web/rfq')
                // window.location.href = window.location.href;
            })
            .catch(error => console.log("We are having issues with the server. Try again later"));
    }

    function redirectRfq2(data) {  
       //console.log('fGuardar:',data)
        // data.stopPropagation()
        // data.preventDefault()

        if (localStorage.getItem("rfqInfo") == null || localStorage.getItem("rfqInfo") == "undefined") {
            localStorage.setItem("rfqInfo", JSON.stringify("rfqInfo"));
        }
        
        localStorage.removeItem('tblRFQ');
        localStorage.setItem('tblRFQ', JSON.stringify({ data }))
        // history.push('/web/rfq')
        //fetchDataRFQ(data)
        fetchTasks(data)
    }

    function fetchDataRFQ(data) {
        //console.log('DatoPart: ',inputSearchValue);
        //console.log('Part: ',data);
        // const _ = require("lodash");
        var url = baseUrlContact + `api/1/search?searchBy=${data}`
        //console.log('url:',url)
        axios.get(url).then(function (response) {
            //console.log('new call: ',response.data)
            //console.log('Data:', data )

        const data1 = response.data[1]
        //console.log('data1', data1)
        //console.log("response 1:",response.data[1])
        const struc1 = [];
        data1.map((e, index) => {
            struc1.push({
                item_name: e.ITEM_NAME,
                nsn: e.NSN,
                part_number: e.FSC,
                partn : e.PART_NUMBER
            })
        })  
        //console.log('struc1:',struc1)    
        localStorage.removeItem('data3')
        localStorage.setItem('data3', JSON.stringify(struc1))
        history.push('/web/rfq')
        })
        .catch(error => console.log("We are having issues with the server. Try again later"));
       
    }

    //* form RFQ
    function fetchTasks2() {
        var url = baseUrlContact + `api/1/search?searchBy=${rfqInput}`
        //console.log('homeurl:',url)
        //console.log('lengthPart:',rfqInput.length)

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

                //console.log('strucSeach:',struc1)
                
                data5.map((e, index) => {
                    struc1[0].PART_NUMBER = e.PART_NUMBER
                })

                //console.log('homeData:',struc1)

                localStorage.removeItem('data3')
                localStorage.setItem('data3', JSON.stringify(struc1))
                history.push('/web/rfq')
                window.location.href = window.location.href;
            })
            .catch(error => console.log("We are having issues with the server. Try again later"));

        } else {
            fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log('homeData:',data)
                localStorage.removeItem('data3')
                localStorage.setItem('data3', JSON.stringify(data[1]))
                history.push('/web/rfq')
                window.location.href = window.location.href;
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
            fetchTasks2()
        // }

      } else {
        // e.preventDefault();

        notifier.alert('Review Input Fields', { durations: { alert: 0 } });
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);
      }
    }

   




    function searchParts(_page) {
        /* var url = `https://api.part-miner.com/api/${page}/part?searchBy=${codeFsc}`; */
        setLoadingState(true)
        setPartElements([])
        setNavigationBar([])
        setTitlePart('')
        
        //console.log('_page:', _page)

        if(_page){
            if(_page.toString().indexOf("...")>=0){
                const queryString = window.location.pathname;

                let nextPage = parseInt(localStorage.getItem("currentPage"));
                    nextPage = nextPage+20;

                handleLink(nextPage);
                
                return;
            }else{
                localStorage.setItem("currentPage", _page);
            }
        }

        if (_page) {
            //console.log('_page IF2:', _page)
            var url = `https://api.part-miner.com/api/fg/${_page}/fsc?searchBy=${codeFsc}`
        } else {
            var url = `https://api.part-miner.com/api/fg/${page}/fsc?searchBy=${codeFsc}`

        }

        //console.log("URL", url)
        totalPages = [];

        axios.get(url).then(function (res) {
            //console.log("RES", res)

            if (res.data) {

                const vparts = res.data[1]
                const pnsn = res.data[3]
                // const cage = res.data[5]
                // const vh6nameincs = res.data[7]
                const vcha = res.data[9]
                const pagination = res.data[10]
                const title = []
                const struc = [];

                // @dev list of all pages
                // for (var i = 0; i < pagination.pages; i++) {
                //     totalPages.push(i)
                // }

                
                 // @dev list of all pages
                 var paginationCounter = Math.ceil(pagination.pages/100),currentPagesNumber = 0;

                for (let index = 0; index < paginationCounter; index++) {
                    let currentArray = [];
                    for (var i = currentPagesNumber; i < currentPagesNumber+100; i++) {
                        if(pagination.pages===i) break;
                        currentArray.push(i);
                    }
                    if(paginationCounter-1===index) currentPagesNumber= currentPagesNumber + (pagination.pages - currentPagesNumber);
                    else currentPagesNumber+=100;
                    if(index>0) currentArray.unshift(currentArray[0]-1);
                    
                    if((index+1)<paginationCounter&&0){
                        currentArray.push("...");
                        currentArray.push((pagination.pages-2));
                        currentArray.push((pagination.pages-1));
                        localStorage.setItem("totalPages", (pagination.pages-1));
                    }

                    totalPages.push([currentArray,currentPagesNumber]);                    
                }

                let indexFind = totalPages.findIndex(val=>{
                    return parseInt(pagination.current)<val[1]; 
                })

                totalPages = totalPages[indexFind===-1?totalPages.length-1:indexFind][0]; 
                    
                //console.log("totalPages: HHH",totalPages);

                    
                totalPages = totalPages[indexFind===-1?totalPages.length-1:indexFind][0]; 
                
                let currentPageV = localStorage.getItem("currentPage") ? parseInt(localStorage.getItem("currentPage")) : 0;
                let fromPage = 0;
                let untilPage = 10;

                if(currentPageV>=10&&currentPageV<=99){
                    fromPage = (currentPageV-1);
                    untilPage = (currentPageV+10);
                }else if(currentPageV==100||currentPageV>100){
                    fromPage = 90;
                    untilPage = 100;
                }
                
                totalPages = [];
                for (let index = fromPage; index < untilPage; index++) {
                    totalPages.push(index);
                }


                // structure tbl
                vparts.map((part, index) => {
                    struc.push({
                        item_name: part.ITEM_NAME,
                        nsn: part.NSN,
                        part_number: part.FSC,

                    })
                })
                //console.log('Vparts hey: ', vparts)

                // vh6nameincs.map((vh6, index) => {
                //     struc[index].detail = vh6.DEFINITION
                // })

                pnsn.map((mfgsku, index) => {
                    struc[index].partn = mfgsku.PART_NUMBER
                })
               
                //console.log('MFGSKU TAMAñO: ',pnsn.length)

                
                vcha.map((vchar, index) => {
                    struc[index].vchars = vchar.CLEAR_TEXT_REPLY
                 })
                 //console.log('vchar TAMAñO: ',vcha.length)

                //console.log("Struc: ", struc)
                setPartElements(
                    <tbody>

                        {
                            struc.length > 0 ?
                                (
                                    struc.map((_data, index) => {
                                        if (_data.item_name === undefined && _data.nsn === undefined && _data.partn === undefined && _data.vchars === undefined ) {
                                            //console.log("Undefinied")
                                        } else {
                                            title.push(_data.part_number)
                                            return (
                                                <tr key={index + 1}>
                                                    <td style={{ textAlign: 'center' }}> {_data.item_name} </td>

                                                    <td className='linkNSNS' style={{ textAlign: 'center' }}>
                                                        <Link to={'/web/search/' + _data.nsn + '/1'} >{_data.nsn}</Link>
                                                    </td>
                                                    
                                                    <td style={{ textAlign: 'center' }}>
                                                        {_data.partn}
                                                    </td>
                                                        
                                                    <td>
                                                       <b>General Characteristics Item Description:</b> {_data.vchars}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }} id={"Part" + index}>
                                                        {_data.part_number}
                                                    </td>
                                                    <td className='subChild1' style={{ textAlign: 'center' }} id={"RFQ" + index}>
                                                      <button className='rfqButton' onClick={() => redirectRfq2(_data.nsn)}>RFQ</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                ) : <tr><td style={{textAlign:'center'}} colSpan={5}>This query no contain more rows</td></tr>
                        }
                    </tbody>
                )
                setTitlePart('FSC ' + codeFsc)
                setNavigationBar(
                    <div className='scrollmenu'>
                        {
                            totalPages.map((element, index) => {
                                let _page = element === "..." ? element : (element + 1);

                                let currentPage = localStorage.getItem("currentPage");
                                    currentPage = currentPage!=="" && currentPage!==null ? ((parseInt(currentPage)+21)) : 20;
                                    currentPage = currentPage>parseInt(localStorage.getItem("totalPages")) && localStorage.getItem("totalPages")!=="" && localStorage.getItem("totalPages")!=="null" ? parseInt(localStorage.getItem("totalPages")) : currentPage;


                                return (
                                    <>
                                        {
                                            totalPages ?
                                                (
                                                    <>

                                                        <NavLink onClick={() => handleLink(element === "..."?currentPage:_page)} to={`/web/fsgs/${codeFsg}/fsc/${codeFsc}/${(element === "..."?currentPage:_page)}`} key={"linkPagination"+(element === "..."?currentPage:_page)} >
                                                            <a>{_page}</a>
                                                        </NavLink>
                                                        
                                                    </>
                                                ) : (<></>)
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                )

                setLoadingState(false)
                //console.log(loadingState)

            } else {
                setPartElements(
                    <h1 className='NotFoundItemText'>No data has been found</h1>
                )

                setLoadingState(false)
                //console.log(loadingState)
            }
        })
        .catch(error => console.log("We are having issues with the server. Try again later"));


    }

    useEffect(() => {
        searchParts()
    }, [])

    const previousPage = (_totalPages) => {
        if ((page - 1) <= 1) {
            setPageCounter(1)
            var currentPage = 1;
        } else {
            var currentPage = parseInt(page) - 1;
        }
        //console.log('currentPage',currentPage)

        history.push(`/web/fsgs/${codeFsg}/fsc/${codeFsc}/${currentPage}`)
        searchParts(currentPage)
    }
    const nextPage = (_totalPages) => {
        if ((page + 1) <= 1) {
            setPageCounter(page + 2)
            var currentPage = 1;
        } else {
            setPageCounter(page + 1);
            var currentPage = parseInt(page) + 1;
        }
        //console.log('currentPage2',currentPage)

        history.push(`/web/fsgs/${codeFsg}/fsc/${codeFsc}/${currentPage}`)
        searchParts(currentPage)
    }

    const handleLink = (_page) => {
        //console.log('_page3',_page)

        history.push(`/web/fsgs/${codeFsg}/fsc/${codeFsc}/${_page}`)
        searchParts(_page)
    }

    return (
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
                    <form>
                        <div className='contentBtnHeaderFsc'>
                            <input type="text" placeholder='Search part' onChange={event => SetinputSearchValue(event.target.value)} />
                            <Link to={"/web/search/" + inputSearchValue + '/1'}><button type='sumit'>SEARCH</button></Link>
                            <h5 className="mb-1 text-white ">
                                <span className="">Search by NSN, NIIN or Part Number</span>
                            </h5>
                        </div>
                    </form>
                </div>

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
                            onChange={handlePartNumberChange} />
                        <span>ENTER QUANTITY</span>
                        <input 
                            onInvalid={(e) =>
                                e.target.setCustomValidity('Please Enter Quantity')
                            }
                            onInput={(e) => e.target.setCustomValidity('')}
                            required 
                            type="number" 
                            min="1" pattern="^[0-9]+"
                            onChange={handleQuantityChange} />
                        <button type="submit" onClick={() => redirectRfq()}>SUBMIT</button>

                        </div>
                    </div>
                </form>
            </div>
            <br />
            <div className='navigateSmall navigateSmallFix2'>
                <div className='row'>
                    <h1><span>Home/</span> <Link to={'/web/fsg/1'}><span>FSGs/</span></Link>  <Link to={'/web/fsg/1/' + codeFsg}><span>FSG {codeFsg}/</span></Link> {TitlePart} </h1>
                </div>
            </div>

            {
                loadingState ?
                    (
                        <>
                            <h1 className='FederalSupplyGroup'>{TitlePart}</h1>
                            <div className='FilterResultsContent FilterResultsContentMovil' >
                                <div className='container'>
                                    <div id='loading'>

                                        <img src={loading} alt="loading-image" />

                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className='FederalSupplyGroup'>{TitlePart}</h1>
                            <div className='FilterResultsContent FilterResultsContentMovil' >
                                <div className='container-fluid'>
                                    <table className='tableParts-tbl2'>
                                        <thead>
                                            <tr key="0">
                                                <td style={{ width: '190px' }} >Name</td>
                                                <td style={{ width: '190px' }}>NSN</td>
                                                <td style={{ width: '190px' }}>MFG SKU</td>
                                                <td>Details</td>
                                                <td># FSC</td>
                                                <td>RFQ</td>
                                            </tr>
                                        </thead>
                                        {PartElements}
                                    </table>
                                </div>

                                {
                                    inputSearchValue.length>5 || codeFsc.length>5?
                                        (<></>)
                                    :
                                        (window.innerWidth <= 500 ? 
                                            (<div className='subChild1' style={{ textAlign: 'center', marginTop: '3vh',width: "95%" }} /* id={"RFQ" + index} */>
                                                {NavigationBar ? NavigationBar : <h1>No viene navegacion</h1>}
                                                <div className='myRow' style={{display: 'block', marginTop: '5px'}}>
                                                    <button style={{float: 'left', margin: 0}} className='rfqButton' onClick={() => previousPage(totalPages)}>{'Previous'}</button>
                                                    <button style={{float: 'right', margin: 0}} className='rfqButton' onClick={() => nextPage(totalPages)}>{'Next'}</button>
                                                </div>
                                            </div>)
                                        :
                                            (<div className='subChild1' style={{ textAlign: 'center', marginTop: '3vh',width: "95%" }} /* id={"RFQ" + index} */>
                                                <div className='myRow'>
                                                    <button className='rfqButton' onClick={() => previousPage(totalPages)}>{'Previous'}</button>
                                                    {NavigationBar ? NavigationBar : <h1>No viene navegacion</h1>}
                                                    <button className='rfqButton' onClick={() => nextPage(totalPages)}>{'Next'}</button>
                                                </div>
                                            </div>)
                                        )
                                }

                            </div>
                        </>
                    )
            }

            <Footer></Footer>
        </>
    )
}

export default FilterResultParts