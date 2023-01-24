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

const FilterResultParts = () => {
    const [rfqInput, setRfqInput] = useState('')
    const [rfqAdress, setAdress] = useState('')
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

    // var rfqDetails = []
    function fetchTasks(data) {
        console.log('_data.nsn: ',data);
        
        var url = baseUrlContact + `api/search?searchBy=${data}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log('partsD5:', data[5].map(e=>e.PART_NUMBER) )
                console.log('Data:', data )
                const data1 = data[1]
                const data5 = data[5]
                const struc1 = [];
                data1.map((e, index) => {
                    struc1.push({
                        item_name: e.ITEM_NAME,
                        nsn: e.NSN,
                        part_number: e.FSC,
                    })
                })  
                data5.map((e, index) => {
                    struc1[0].partn = e.PART_NUMBER
                })

                localStorage.removeItem('data3')
                localStorage.setItem('data3', JSON.stringify(struc1))
                history.push('/web/rfq')
            })
            .catch(error => console.log("We are having issues with the server. Try again later"));
    }


    // function fetchTasks2(data) {
    //     var url = baseUrlContact + `stockn/part?searchBy=${data}`
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('Data10:', data)
    //             history.push('/web/rfq')
    //         })
    //   }

    function redirectRfq(data) {
        localStorage.removeItem('rfqInfo');
        localStorage.setItem('rfqInfo', JSON.stringify({
            rfqHomeInfo: rfqInput ? rfqInput : data,
            rfqQuantity: rfqQuantity ? rfqQuantity : 0,
            rfqAdress: rfqAdress ? rfqAdress : ''
        }))
        fetchTasks(data)
        history.push('/web/rfq')
    }

    function redirectRfq2(data) {
        console.log('fGuardar:',data)
        fetchTasks(data)

        localStorage.removeItem('tblRFQ');
        localStorage.setItem('tblRFQ', JSON.stringify({ data }))
    }




    function searchParts(_page) {
        /* var url = `https://api.part-miner.com/api/${page}/part?searchBy=${codeFsc}`; */
        console.log("ejecucion");
        setLoadingState(true)
        setPartElements([])
        setNavigationBar([])
        setTitlePart('')
        
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
            var url = `https://api.part-miner.com/api/fg/${_page}/fsc?searchBy=${codeFsc}`
        } else {
            var url = `https://api.part-miner.com/api/fg/${page}/fsc?searchBy=${codeFsc}`
        }

        totalPages = [];

        axios.get(url).then(function (res) {

            if (res.data) {

                const vparts = res.data[1]
                const pnsn = res.data[3]
                const cage = res.data[5]
                const vh6nameincs = res.data[7]
                const pagination = res.data[10]
                const title = [];
                const struc = [];

                // @dev list of all pages
                let paginationCounter = Math.ceil(pagination.pages/20),currentPagesNumber = 0;

                for (let index = 0; index < paginationCounter; index++) {
                    let currentArray = [];
                    for (var i = currentPagesNumber; i < currentPagesNumber+20; i++) {
                        if(pagination.pages===i) break;
                        currentArray.push(i);
                    }
                    if(paginationCounter-1===index) currentPagesNumber= currentPagesNumber + (pagination.pages - currentPagesNumber);
                    else currentPagesNumber+=20;
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


                vparts.map((part, index) => {
                    struc.push({
                        item_name: part.ITEM_NAME,
                        nsn: part.NSN,
                        part_number: part.FSC,

                    })
                })
                console.log('Vparts hey: ', vparts)

                // vh6nameincs.map((vh6, index) => {
                //     struc[index].detail = vh6.DEFINITION
                // })

                pnsn.map((mfgsku, index) => {
                    struc[index].partn = mfgsku.PART_NUMBER
                })
               
                console.log('MFGSKU TAMAñO: ',pnsn.length)

                pnsn.map((cage, index) => {
                    struc[index].partn = cage.PART_NUMBER
                })

                setPartElements(
                    <tbody>

                        {
                            struc.length > 0 ?
                                (
                                    struc.map((_data, index) => {
                                        if (_data.item_name === undefined && _data.nsn === undefined && _data.detail === undefined) {
                                        } else {
                                            title.push(_data.part_number)
                                            return (
                                                <tr key={index + 1}>
                                                    <td style={{ textAlign: 'center' }}> {_data.item_name} </td>

                                                    <td className='linkNSNS' style={{ textAlign: 'center' }}>
                                                        <Link to={'/web/search/' + _data.nsn} >{_data.nsn}</Link>
                                                    </td>
                                                    
                                                    <td style={{ textAlign: 'center' }}>
                                                        {_data.partn}
                                                    </td>
                                                        
                                                    <td>
                                                        {_data.detail}
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
                                let _page = element == "..." ? element : (element + 1);
                                
                                let currentPage = localStorage.getItem("currentPage");
                                    currentPage = currentPage!="" && currentPage!=null ? ((parseInt(currentPage)+21)) : 20;
                                    currentPage = currentPage>parseInt(localStorage.getItem("totalPages")) && localStorage.getItem("totalPages")!="" && localStorage.getItem("totalPages")!="null" ? parseInt(localStorage.getItem("totalPages")) : currentPage;


                                return (
                                    <>
                                        {
                                            totalPages ?
                                                (
                                                    <>

                                                        <NavLink onClick={() => handleLink(element == "..."?currentPage:_page)} to={`/web/fsgs/${codeFsg}/fsc/${codeFsc}/${(element == "..."?currentPage:_page)}`} key={"linkPagination"+(element == "..."?currentPage:_page)} >
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

            } else {
                setPartElements(
                    <h1 className='NotFoundItemText'>No data has been found</h1>
                )

                setLoadingState(false)
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
        history.push(`/web/fsgs/${codeFsg}/fsc/${codeFsc}/${currentPage}`)
        searchParts(currentPage)
    }

    const handleLink = (_page) => {
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
                    <div className='contentBtnHeaderFsc'>
                        <input type="text" placeholder='Search part' value={inputSearchValue} onChange={event => SetinputSearchValue(event.target.value)} />
                        <Link to={"/web/search/" + inputSearchValue}><button>SEARCH</button></Link>
                    </div>
                </div>
                <div className='child2'>
                    <div className='subChild1'>
                        <h1>Request For Quote</h1>
                        <span>ENTER PART NUMBER</span>
                        <input type="text" onChange={(e) => setRfqInput(e.nativeEvent.srcElement.value)} />
                        <span>ENTER EMAIL ADDRES</span>
                        <input type="text" onChange={(e) => setAdress(e.nativeEvent.srcElement.value)} />
                        <span>ENTER QUANTITY</span>
                        <input type="text" onChange={(e) => setQuantity(e.nativeEvent.srcElement.value)} />
                        <button onClick={() => redirectRfq()} >SUBMIT</button>
                    </div>
                </div>
            </div>
            <br />
            <div className='navigateSmall navigateSmallFix2'>
                <div className='row'>
                    <h1><span>Home/</span> <Link to={'/web/fsg/1'}><span>FSGs/</span></Link>  <Link to={'/web/fsg/1/' + codeFsg}><span>FSG {codeFsg}/</span></Link> {TitlePart} </h1>
                </div>
            </div>
            <br /><br /><br /><br />

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
                                    <table className='tableParts'>
                                        <thead>
                                            <tr key="0">
                                                <td style={{ width: '190px' }} >Name</td>
                                                <td style={{ width: '190px' }}>NSN</td>
                                                <td style={{ width: '190px' }}>MFG SKU</td>
                                                <td>Details</td>
                                                <td># Part</td>
                                                <td>RFQ</td>
                                            </tr>
                                        </thead>
                                        {PartElements}
                                    </table>

                                </div>
                                
                                {
                                    inputSearchValue.length>5  || codeFsc.length>5 ?
                                        (<></>)
                                    :
                                        (window.innerWidth <= 500 ? 
                                            (<div className='subChild1' style={{ textAlign: 'center', marginTop: '3vh',width: "95%" }} /* id={"RFQ" + index} */>
                                                {NavigationBar && inputSearchValue.length>5 ? NavigationBar : <h1>No viene navegacion</h1>}
                                                <div className='myRow' style={{display: 'block', marginTop: '5px'}}>
                                                    <button style={{float: 'left', margin: 0}} className='rfqButton' onClick={() => previousPage(totalPages)}>{'Previous'}</button>
                                                    <button style={{float: 'left', margin: 0}} className='rfqButton' onClick={() => nextPage(totalPages)}>{'Next'}</button>
                                                </div>
                                            </div>)
                                            :
                                            (<div className='subChild1' style={{ textAlign: 'center', marginTop: '3vh',width: "95%" }} /* id={"RFQ" + index} */>
                                                <div className='myRow'>
                                                    <button className='rfqButton' onClick={() => previousPage(totalPages)}>{'Previous'}</button>
                                                    {NavigationBar && inputSearchValue.length>5 ? NavigationBar : <h1>No viene navegacion</h1>}
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