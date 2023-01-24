import React, { useState, useEffect } from 'react';
import "./../ItemSupply.css";
import loading from "./../../../assets/home/loading-loading-screen.gif";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ItemSupply = () => {

    const [currentTable, setCurrentTable] = useState([]);
    const [NavigationBar, setNavigationBar] = useState([]);
    const [pageCounter, setPageCounter] = useState(1);
    const [loadingState, setLoadingState] = useState(false)

    let history = useHistory();

    var paginationList = [];
    var totalPages = [];

    /**
     * #1 Crear new array con la informacion de la tabla - Already Created
     * #2 set to state the new array
     */

    let { page, part } = useParams();

    useEffect(() => {

        currentPage(part);

    }, [])

    const nextPage = () => {
        setLoadingState(true)
        totalPages = [];

        if ((page + 1) <= 1) {
            setPageCounter(page + 2)
            var currentPage = 1;
        } else {
            setPageCounter(page + 1);
            var currentPage = parseInt(page) + 1;
        }

        console.log("Next Page: ", totalPages)

       /*  var url = `https://api.part-miner.com/api/${currentPage}/part?searchBy=${part}` */
       var url = `https://api.part-miner.com/api/search?searchBy=${part}`;
        console.log(url)

        axios.get(url).then(function (response) {
            var count = 0;
            var MFG_SKU = [];
            var PNSN = [];
            var Item_name = [];
            var Cage = [];
            var definition = [];
            
            console.log(response.data)

            // @dev list of all pages
            for (var i = 0; i < response.data[8].pages; i++) {
                totalPages.push(i)
            }

            if (response.data[1].length === 0 && response.data[3].length === 0 && response.data[5].length === 0 && response.data[7].length === 0) {
                setCurrentTable(
                    <>
                        <tr key={1}>
                            <td colSpan={6} style={{ textAlign: 'center' }}>This query no contain more rows</td>
                        </tr>
                    </>
                )
            } else {
                let numOfParts = 0
                response.data.map((item, i) => {
                    // @dev entro a Vparts 
                    if (count == 1) {
                        item.forEach(_item => {
                            MFG_SKU.push(_item.PART_NUMBER);
                        })
                        numOfParts = item.length
                    }

                    // @dev entro a PNSN
                    if (count == 3) {
                        item.forEach(_item => {
                            PNSN.push(_item.NSN);
                            Item_name.push(_item.ITEM_NAME);
                        })
                    }

                    // @dev entro a Cage
                    if (count == 5) {
                        item.forEach(_item => {
                            Cage.push(_item.COMPANY)
                        })
                    }

                    // @dev entro a Definition
                    if (count == 7) {
                        item.forEach(_item => {
                            definition.push(_item.DEFINITION)
                        })
                    }

                    count++;
                })

                console.log("MFG_SKU: ", numOfParts)
                for (let index = 0; index < numOfParts; index++) {

                    paginationList.push({
                        "MFG_SKU": MFG_SKU[index],
                        "NSN": PNSN[index],
                        "Item_Name": Item_name[index],
                        "Details": definition[index],
                        "Manufacturer_CAGE": Cage[index],
                    })

                }

                console.log("Pagination List: ", paginationList)

                setCurrentTable(
                    <>
                        {
                            paginationList.map((element, index) => {
                                return (
                                    <tr key={index + 1}>
                                        {
                                            element.Item_Name ?
                                                (
                                                    <>
                                                        <td style={{ textAlign: 'center' }}>{element.MFG_SKU}</td>
                                                        <td style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleNSNClick(element.NSN)}>{element.NSN}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Item_Name}</td>
                                                        <td >{element.Details}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Manufacturer_CAGE}</td>
                                                        <td className='subChild1' style={{ textAlign: 'center' }} /* id={"RFQ" + index} */>
                                                            <button className='rfqButton' /* onClick={() => redirectRfq(rfqArray[index])} */>RFQ</button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <></>)
                                        }
                                    </tr>
                                )
                            })
                        }
                    </>
                )

                setNavigationBar(
                    <div className='scrollmenu'>
                        {

                            totalPages.map((element, index) => {

                                return (
                                    <>
                                        {
                                            totalPages ?
                                                (
                                                    <Link onClick={handleLink} to={`/web/itemSupply/${element + 1}/${part}`} ><a>{element + 1}</a></Link>
                                                ) : (<></>)
                                        }
                                    </>
                                )
                            })


                        }
                    </div>
                )
            }
            setLoadingState(false)
            history.push(`/web/itemSupply/${currentPage}/${part}`)
        }).catch(

            function (error) {
                console.log(error);
                setLoadingState(false)
            }
        )
    }


    const handleNSNClick = (NSN) => {
        history.push(`/web/search/${NSN}`)
    }

    const currentPage = () => {
        setLoadingState(true)
        totalPages = [];

        var url = `https://api.part-miner.com/api/${page}/part?searchBy=${part}`
        console.log(url)

        axios.get(url).then(function (response) {


            var count = 0;
            var MFG_SKU = [];
            var PNSN = [];
            var Item_name = [];
            var Cage = [];
            var definition = [];

            // @dev list of all pages
            for (var i = 0; i < response.data[8].pages; i++) {
                totalPages.push(i)
            }

            if (response.data[1].length === 0 && response.data[3].length === 0 && response.data[5].length === 0 && response.data[7].length === 0) {
                setCurrentTable(
                    <>
                        <tr key={1}>
                            <td colSpan={6} style={{ textAlign: 'center' }}>This query no contain more rows</td>
                        </tr>
                    </>
                )
            } else {

                // @dev create objects 
                let numOfParts = 0
                response.data.map((item, i) => {
                    // @dev entro a Vparts 
                    if (count == 1) {
                        item.forEach(_item => {
                            MFG_SKU.push(_item.PART_NUMBER);
                        })
                        numOfParts = item.length
                    }

                    // @dev entro a PNSN
                    if (count == 3) {
                        item.forEach(_item => {
                            PNSN.push(_item.NSN);
                            Item_name.push(_item.ITEM_NAME);
                        })
                    }

                    // @dev entro a Cage
                    if (count == 5) {
                        item.forEach(_item => {
                            Cage.push(_item.COMPANY)
                        })
                    }

                    // @dev entro a Definition
                    if (count == 7) {
                        item.forEach(_item => {
                            definition.push(_item.DEFINITION)
                        })
                    }


                    count++;
                })

                // @dev create a pagination list Object
                for (let index = 0; index < numOfParts; index++) {

                    paginationList.push({
                        "MFG_SKU": MFG_SKU[index],
                        "NSN": PNSN[index],
                        "Item_Name": Item_name[index],
                        "Details": definition[index],
                        "Manufacturer_CAGE": Cage[index],
                    })

                }

                // @dev create a table
                setCurrentTable(
                    <>
                        {
                            paginationList.map((element, index) => {
                                return (
                                    <tr key={index + 1}>
                                        {
                                            element.Item_Name ?
                                                (
                                                    <>
                                                        <td style={{ textAlign: 'center' }}>{element.MFG_SKU}</td>
                                                        <td style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleNSNClick(element.NSN)}>{element.NSN}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Item_Name}</td>
                                                        <td>{element.Details}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Manufacturer_CAGE}</td>
                                                        <td className='subChild1' style={{ textAlign: 'center' }} /* id={"RFQ" + index} */>
                                                            <button className='rfqButton' /* onClick={() => redirectRfq(rfqArray[index])} */>RFQ</button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <></>)
                                        }
                                    </tr>
                                )
                            })
                        }
                    </>
                )

                // @dev create a navigation bar
                setNavigationBar(
                    <div className='scrollmenu'>
                        {

                            totalPages.map((element, index) => {

                                return (
                                    <>
                                        {
                                            totalPages ?
                                                (
                                                    <Link onClick={handleLink} to={`/web/itemSupply/${element + 1}/${part}`} ><a>{element + 1}</a></Link>
                                                ) : (<></>)
                                        }
                                    </>
                                )
                            })


                        }
                    </div>
                )
            }

            setLoadingState(false)
        }).catch(

            function (error) {
                console.log(error);
                setLoadingState(false)
            }
        )
    }

    const previousPage = () => {
        setLoadingState(true)
        totalPages = [];

        // @dev get the current page
        if ((page - 1) <= 1) {
            setPageCounter(1)
            var currentPage = 1;
        } else {
            var currentPage = parseInt(page) - 1;
        }

        var url = `https://api.part-miner.com/api/${currentPage}/part?searchBy=${part}`
        axios.get(url).then(function (response) {

            var count = 0;
            var MFG_SKU = [];
            var PNSN = [];
            var Item_name = [];
            var Cage = [];
            var definition = [];

            // @dev list of all pages
            for (var i = 0; i < response.data[8].pages; i++) {
                totalPages.push(i)
            }

            if (response.data[1].length === 0 && response.data[3].length === 0 && response.data[5].length === 0 && response.data[7].length === 0) {
                setCurrentTable(
                    <>
                        <tr key={1}>
                            <td colSpan={6} style={{ textAlign: 'center' }}>This query no contain more rows</td>
                        </tr>
                    </>
                )
            } else {
                let numOfParts = 0

                // @dev create objects
                response.data.map((item, i) => {
                    // @dev entro a Vparts 
                    if (count == 1) {
                        item.forEach(_item => {
                            MFG_SKU.push(_item.PART_NUMBER);
                        })
                        numOfParts = item.length
                    }

                    // @dev entro a PNSN
                    if (count == 3) {
                        item.forEach(_item => {
                            PNSN.push(_item.NSN);
                            Item_name.push(_item.ITEM_NAME);
                        })
                    }

                    // @dev entro a Cage
                    if (count == 5) {
                        item.forEach(_item => {
                            Cage.push(_item.COMPANY)
                        })
                    }

                    // @dev entro a Definition
                    if (count == 7) {
                        item.forEach(_item => {
                            definition.push(_item.DEFINITION)
                        })
                    }

                    count++;
                })

                // @dev create a pagination list Object
                for (let index = 0; index < numOfParts; index++) {

                    paginationList.push({
                        "MFG_SKU": MFG_SKU[index],
                        "NSN": PNSN[index],
                        "Item_Name": Item_name[index],
                        "Details": definition[index],
                        "Manufacturer_CAGE": Cage[index],
                    })

                }

                // @dev create a table
                setCurrentTable(
                    <>
                        {
                            paginationList.map((element, index) => {
                                return (
                                    <tr key={index + 1}>
                                        {
                                            element.Item_Name ?
                                                (
                                                    <>
                                                        <td style={{ textAlign: 'center' }}>{element.MFG_SKU}</td>
                                                        <td style={{ textAlign: 'center', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleNSNClick(element.NSN)}>{element.NSN}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Item_Name}</td>
                                                        <td>{element.Details}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Manufacturer_CAGE}</td>
                                                        <td className='subChild1' style={{ textAlign: 'center' }} /* id={"RFQ" + index} */>
                                                            <button className='rfqButton' /* onClick={() => redirectRfq(rfqArray[index])} */>RFQ</button>
                                                        </td>
                                                    </>
                                                ) :
                                                (
                                                    <></>
                                                )
                                        }
                                    </tr>
                                )
                            })
                        }
                    </>
                )

                // @dev create a navigation bar
                setNavigationBar(
                    <div className='scrollmenu'>
                        {

                            totalPages.map((element, index) => {

                                return (
                                    <>
                                        {
                                            totalPages ?
                                                (
                                                    <Link onClick={handleLink} to={`/web/itemSupply/${element + 1}/${part}`} ><a>{element + 1}</a></Link>
                                                ) : (<></>)
                                        }
                                    </>
                                )
                            })


                        }
                    </div>
                )
            }
            setLoadingState(false)
            history.push(`/web/itemSupply/${currentPage}/${part}`)

        }).catch(

            function (error) {
                console.log(error);
                setLoadingState(false)
            }
        )

    }

    const handleLink = (e) => {
        setCurrentTable([])
        currentPage()
    }



    return (

        <>
            {
                loadingState ? (
                    <div className='container'>
                        <div id='loading'>

                            {loadingState ? (<><img src={loading} alt="loading-image" /></>) : <div className='myDiv'></div>}

                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className='FederalSupplyGroup'>Item of Supply "{part}" Search Result</h2>
                        <div className='FilterResultsContent' >
                            <table className='tableParts'>
                                <thead>
                                    <tr>
                                        <th>MFG SKU</th>
                                        <th>NSN (NIIN)</th>
                                        <th>Item Name</th>
                                        <th>Details</th>
                                        <th>Manufacturer (CAGE)</th>
                                        <th>RFQ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingState ? (<tr><td><img src={loading} alt="loading-image" /></td></tr>) : currentTable}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }
            <div className='subChild1' style={{ textAlign: 'center', marginTop: '3vh' }} /* id={"RFQ" + index} */>
                <div className='myRow'>
                    <button className='rfqButton' onClick={() => previousPage()}>Previous</button>
                    {NavigationBar ? NavigationBar : <h1>No viene navegacion</h1>}
                    <button className='rfqButton' onClick={() => nextPage()}>Next</button>
                </div>
            </div>
        </>
    )
}

export default ItemSupply