import React, { useState, useEffect, useRef } from 'react';
import loading from "./../../../assets/home/loading-loading-screen.gif";
import "./../fscLineCard.css";
import slider1 from "./../../../assets/rfq/3-1.jpg";
import slider2 from "./../../../assets/rfq/4-1.jpg";
import slider3 from "./../../../assets/rfq/7_720.jpg";
import Menu from "./../../home/menu/menu";
import Footer from "./../../home/footer/footer";
import { useHistory } from "react-router-dom";
import { Link, NavLink, useParams } from "react-router-dom";

import { baseUrlContact, SEARCH_ROUTE, localbk, bslocalbk } from "./../../httpBaseUrl.js";
import AWN from 'awesome-notifications';


import axios from "axios";

const SearchComponent = () => {

    var changePage='';


    let { part } = useParams();

    const [inputSearchValue, SetinputSearchValue] = useState(part||'')
    const [NSNInformation, setNSNInformation] = useState([])
    const [Features, setFeatures] = useState([])
    const [ItemDescription, setItemDescription] = useState([])
    const [ManufacturingPartNumbers, setManufacturingPartNumbers] = useState([])
    const [Manufacturer, setManufacturer] = useState([])
    const [FLISIdentification, setFLISIdentification] = useState([])
    const [FLISManagement, setFLISManagement] = useState([])
    const [DCodesManagement, setDCodesManagement] = useState([])
    const [loadingState, setLoadingState] = useState(false)
    const [loadingState2, setLoadingState2] = useState(false)
    const [PartElements, setPartElements] = useState([])
    const [MiscellaneousManagement, setMiscellaneousManagement] = useState([])
    const [NonConsumableItemSupport, setNonConsumableItemSupport] = useState([])
    const [Freight, setFreight] = useState([])
    const [MOERules, setMOERules] = useState([])

    const [TitlePart, setTitlePart] = useState('')
    const [TitleFeatures, setTitleFeatures] = useState('')
    const [TitleItemDescription, setTitleItemDescription] = useState('')
    const [TitleManufacturingPartNumbers, setTitleManufacturingPartNumbers] = useState('')
    const [TitleManufacturer, setTitleManufacturer] = useState('')
    const [TitleFLISIdentification, setTitleFLISIdentification] = useState('')
    const [TitleFLISManagement, setTitleFLISManagement] = useState('')
    const [TitleDCodesManagement, setTitleDCodesManagement] = useState('')
    const [TitleMiscellaneousManagement, setTitleMiscellaneousManagement] = useState('')
    const [TitleNonConsumableItemSupport, setTitleNonConsumableItemSupport] = useState('')
    const [TitleFreight, setTitleFreight] = useState('')
    const [TitleMOERules, setTitleMOERules] = useState('')

    const [rfqInput, setRfqInput] = useState('')
    
    const [rfqQuantity, setQuantity] = useState('')
    
    var [typeData, settypeData] = useState('')


//*PAGINATION
    const [NavigationBar, setNavigationBar] = useState([]);
    const [pageCounter, setPageCounter] = useState(1);


    let { codeFsc, codeFsg, page } = useParams();
    // const history = useHistory();
    var totalPages = [];


    //* text boton
    const [Text, setText] = useState('');
    const [Pages, setPages] = useState();

    //*Acordeon
    const [setActive, setActiveState] = useState("active");
    const [setDisplayAcordeon, setDisplayAcordeonState] = useState("block");
    const content = useRef(null);

    const toggleAccordion = () => {
        setActiveState(setActive == "" ? "active" : "");

        setDisplayAcordeonState(setActive == "" ? "none" : "block");

        //console.log(setDisplayAcordeon);
    }

    const handlePartNumberChange = (event) => {
        setRfqInput(event.target.value)
    };

    const handleQuantityChange = (event) => {
        // solo numeros positivos
        const regex = /^[0-9]*$/;
        const valQuantity = regex.test(event.target.value) ? true : false;
        //console.log('valQuantity', valQuantity)
        if (valQuantity === true) {
            setQuantity(event.target.value)
        }
    };
    //console.log('partINIT: ', part);

    let history = useHistory();


    // function accordion
    function acord(){
        var acc = arguments[0].target;

        acc.classList.toggle("accordion-active");

        /* Toggle between hiding and showing the active panel */
        var panel = acc.nextElementSibling;

        if (panel.style.display === "none") {
            panel.style.display = "block";
            // setText('Press to view less data => ')
        } else {
            panel.style.display = "none";
            // setText('Press to view more data => ')
        }

    }

    function acor(){
        //console.log('abrir');
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;

            if (panel.style.display === "none") {
            panel.style.display = "block";
            } else {
            panel.style.display = "block";
            }
        });
        }
    }

    // @dev redirect to serach view
    function redirectSearchView() {
        history.push('/web/search/' + inputSearchValue)
    }


    function fetchTasks(data) {
        //console.log('DatoPart: ',inputSearchValue);
        //console.log('Part: ',data);
        // const _ = require("lodash");
        var url = baseUrlContact + `api/1/search?searchBy=${data}`
        //console.log('url:',url)
        axios.get(url).then(function (response) {
            //console.log('new call: ',response.data)
            //console.log('Data:', data )

        const data1 = response.data[1]
        const data5 = response.data[5]
  
        //console.log('data1', data1)
        const struc1 = [];
        data1.map((e, index) => {
            struc1.push({
                item_name: e.ITEM_NAME,
                nsn: e.NSN,
                part_number: e.FSC,
            })
        })  

        //console.log('struc1:',struc1)
        
        data5.map((e, index) => {
            struc1[0].partn = e.PART_NUMBER
        })

        localStorage.removeItem('data3')
        localStorage.setItem('data3', JSON.stringify(struc1))

        history.push('/web/rfq')

        })
        .catch(error => console.log("We are having issues with the server. Try again later"));
       
    }

    function redirectRfq2(nsn, part) {
        //console.log('fGuardar:',data)
        // data.stopPropagation()
        // data.preventDefault()

        if (localStorage.getItem("rfqInfo") == null || localStorage.getItem("rfqInfo") == "undefined") {
            localStorage.setItem("rfqInfo", JSON.stringify("rfqInfo"));
        }
        
        localStorage.removeItem('tblRFQ');
        localStorage.setItem('tblRFQ', JSON.stringify({ nsn }))
        // history.push('/web/rfq')
        //fetchTasks(data)
        fetchRFQ(nsn, part)
    }

    function fetchRFQ(data,part) {
        //console.log('DatoPart: ',inputSearchValue);
        //console.log('Part: ',data);
        // const _ = require("lodash");
        //var url = baseUrlContact + `api/1/search?searchBy=${data}`
        var url = `https://api.part-miner.com/searchPart?searchBy=${data}${part}`

        //console.log('url:',url)
        axios.get(url).then(function (response) {
            //console.log('new call: ',response.data)
            //console.log('Data:', data )
            const data1 = response.data[1]
            //const data5 = response.data[5]
            //console.log('data1', data1)
            const struc1 = [];
            data1.map((e, index) => {
                struc1.push({
                    item_name: e.ITEM_NAME,
                    nsn: e.NSN,
                    part_number: e.FSC,
                })
            }) 
            struc1[0].partn = part;
            /*
             data5.map((e, index) => {
             struc1[0].partn = e.PART_NUMBER
            })  
            */
            localStorage.removeItem('data3')
            localStorage.setItem('data3', JSON.stringify(struc1))
            localStorage.setItem('rfqInfo', JSON.stringify({
                rfqHomeInfo: rfqInput ? rfqInput : "",
                rfqQuantity: "",
            }))
            history.push('/web/rfq')
        })
        .catch(error => console.log("We are having issues with the server. Try again later"));
    }

    // @dev format web search
    // var rfqdata = [];

    
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
        maxNotifications: 4,
        animationDuration: 200,
        durations: 0,
      };
    let notifier = new AWN(globalOptions);

    const invalidExist = document.getElementsByClassName('invalid').length > 0;



    function redirectRfq(e) {
        //console.log('E:',e)
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
        // }, 0);
      }
    }
    
    



    function searchParts(data, _page) {
        //console.log('changePage:',changePage)
        //console.log('viene: ',data);
        //console.log('NumPagina:',Pages)
        //console.log('PAge', _page)



        setLoadingState(true)
        setLoadingState2(true)

        setNavigationBar([])


          //*paginacion

        // if (localStorage.getItem("numPage") == null || localStorage.getItem("numPage") == "undefined") {
        //   localStorage.setItem("numPage", JSON.stringify("numPage"));
        //   } else {
        //       var _numPage = JSON.parse(localStorage.getItem(_page));
        //   }
        //   //console.log('numPage',_numPage)
       

        if(_page !== '' && _page != null && _page !== 'undefined'){
            if(_page.toString().indexOf("...")>=0){
                const queryString = window.location.pathname;
        
                let nextPage = parseInt(localStorage.getItem("currentPage"));
                    nextPage = nextPage+100;
        
                handleLink(nextPage);
                
                return;
            }else{
                localStorage.setItem("currentPage", _page);
                //console.log('Save_page:',_page)
                // var url = `https://api.part-miner.com/api/${_page}/search?searchBy=${part || data}`
                
            }
        }

        //obtener localstorage
        var _numPage = JSON.parse(localStorage.getItem("currentPage"));

        
        if (_page !== '' && _page != null && _page !== 'undefined') {
            //console.log('q1', _page)
            //console.log('q3', data)
            var url = `https://api.part-miner.com/api/${_page || 1}/search?searchBy=${part || data}`
            // var url = `http://localhost:8000/api/${_page || 1}/search?searchBy=${part || data}`
            //console.log('URLS',url)
        } else {
            var url = `https://api.part-miner.com/api/${_numPage || 1}/search?searchBy=${part || data}`
            // var url = `http://localhost:8000/api/${_numPage || 1}/search?searchBy=${part || data}`
            //console.log('URLS2',url)

            //console.log('Pq1', _page)
            //console.log('Pq3', data)

            //*seacrh parts
            axios.get(url).then(function (response) {
                //console.log('Tamaño: ',response.data)
                printContent(response)
    
            }).catch(
    
                function (error) {
                    setNSNInformation(
                        <h1 className='NotFoundItemText'>No data has been found</h1>
                    )
                    setTitlePart([])
                    setFeatures([])
                    setTitleFeatures([])
                    setItemDescription([])
                    setTitleItemDescription([])
                    setManufacturingPartNumbers([])
                    setTitleManufacturingPartNumbers([])
                    setManufacturer([])
                    setTitleManufacturer([])
                    setFLISIdentification([])
                    setTitleFLISIdentification([])
                    setFLISManagement([])
                    setTitleFLISManagement([])
                    setDCodesManagement([])
                    setTitleDCodesManagement([])
                    setNonConsumableItemSupport([])
                    setTitleNonConsumableItemSupport([])
                    setFreight([])
                    setTitleFreight([])
                    setMOERules([])
                    setTitleMOERules([])
                    setMiscellaneousManagement([])
                    setTitleMiscellaneousManagement([])
                    setLoadingState(false)
                    setLoadingState2(false)
                }
            )

        }

        

        var Url = window.location
        //console.log('URL NEW: ',Url.pathname)

    

        //* @dev remplazar la url
        if(data !== '' && data != null && data !== 'undefined'){

            Url.replace(`https://part-miner.com/web/search/${data}/1`) 
            // Url.replace(`http://localhost:3000/web/search/${data}/1`) 
            //console.log('URL NEW: ',Url.pathname)

        }

        //* dev Cambiar url seacrh part numeracion
        if(_page !== '' && _page != null && _page !== 'undefined'){
  
            //console.log('URL NEW: ',Url.pathname)
            //console.log('URL_page: ',_page)
            //console.log('part: ',part)
            Url.replace(`https://part-miner.com/web/search/${part}/${_page}`)
            // Url.replace(`http://localhost:3000/web/search/${part}/${_page}`)
        }
      

      //* api1 old
        
        // if (data !== '' && data != null && data !== 'undefined') {
        //     var url = SEARCH_ROUTE + data;
        //     // var url = localbk + data;
        //     //console.log('vieneIF: ',data);
            
        //     // var url = localbk + data;
        // } else {
        //     var url = SEARCH_ROUTE + part;
        //     // var url = localbk + part;
        //     //console.log('vieneElse: ',data);
        //     // var url = localbk + part;
        //     //console.log('Hey: ',url)
        //     //console.log('part: ',part)
        //     //console.log('partData: ',data)
        //     axios.get(url).then(function (response) {
        //     //console.log('Tamaño: ',response.data)
        //     printContent(response)

        //     }).catch(

        //         function (error) {
        //             setNSNInformation(
        //                 <h1 className='NotFoundItemText'>No data has been found</h1>
        //             )
        //             setTitlePart([])
        //             setFeatures([])
        //             setTitleFeatures([])
        //             setItemDescription([])
        //             setTitleItemDescription([])
        //             setManufacturingPartNumbers([])
        //             setTitleManufacturingPartNumbers([])
        //             setManufacturer([])
        //             setTitleManufacturer([])
        //             setFLISIdentification([])
        //             setTitleFLISIdentification([])
        //             setFLISManagement([])
        //             setTitleFLISManagement([])
        //             setDCodesManagement([])
        //             setTitleDCodesManagement([])
        //             setNonConsumableItemSupport([])
        //             setTitleNonConsumableItemSupport([])
        //             setFreight([])
        //             setTitleFreight([])
        //             setMOERules([])
        //             setTitleMOERules([])
        //             setMiscellaneousManagement([])
        //             setTitleMiscellaneousManagement([])
        //             setLoadingState(false)
        //             setLoadingState2(false)
        //         }
        //     )
        // }

    }

    





        
   

    // @dev post 
    // function fetchTasks() {
    //     var url = baseUrlContact + `stockn/part?searchBy=${rfqInput}`;
    //    //console.log('asd: ',rfqInput)
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             localStorage.removeItem('data3')
    //             localStorage.setItem('data3', JSON.stringify(data[3]))
    //             // history.push('/web/rfq')
    //         })
    // }

 




    // @dev print the content on HTML

   

    function printContent(res) {
        //console.log('function printl:',res.data.length)
        //console.log('function print:',res)
        // setPages()

        //console.log("URL", url)
        totalPages = [];




        var struct = [];
        
        //* tamaño = 18  ===> NSNS && NIIN
        if (res.data.length === 18) {
            settypeData(typeData = 'nsn')


            //console.log('hey you')

            if (res.data) {
                // @dev Creo un JSON con la data de respuesta
                var struct = [];
                var NSN_Information = [];
                var FeatureChateris = [];
                var ITEM_Description = [];
                var MANUFACTURING_Part_Number = [];
                var MANUFACTURE_data = [];
                var FLIS_Identification = [];
                var FLIS_Management = [];
                var Demilitarization_Codes_Management = [];
                var Miscellaneous_Management = [];
                var Non_Consumable_Item_Support = [];
                var Freight_data = [];
                var MOE_Rules = [];
    
                const data = res.data;
    
                // @dev identifico la respuesta del API con llaves
                struct = [
                    {
                        "pflisnsns": data[1] ? data[1] : null,
                        "vh6nameincs": data[3] ? data[3] : null,
                        "vflisparts": data[5] ? data[5] : null,
                        "pacages": data[7] ? data[7] : null,
                        "vflisidentifications": data[9] ? data[9] : null,
                        "vflismanagements": data[11] ? data[11] : null,
                        "vmoerules": data[13] ? data[13] : null,
                        "vfreights": data[15] ? data[15] : null,
                        "Vchatacteristic": data[17] ? data[17] : null,
                    }
                ]
    
                // @dev Create Object NSN_INFORMATION, ITEM_DESCRIPTION
                struct.forEach(element => {
    
                    // @dev push Stock_number data on array NSN_Information
                    if (element.pflisnsns) {
    
                        element
                            .pflisnsns
                            .forEach(_data => {
                                // @dev push Part_number data on array NSN_Information
                                NSN_Information.push(
                                    {
                                        "NSN": _data.NSN,
                                        "NIIN": _data.NIIN,
                                        "FSC_code": _data.FSC,
                                        "Item_name": _data.ITEM_NAME,
                                        "Item_name_code": _data.INC
                                    }
                                )
                            })
                    }
                    // @dev push Stock_number data on array NSN_Information
                    if (element.Vchatacteristic) {
    
                        element
                            .Vchatacteristic
                            .forEach(_data => {
                                // @dev push Part_number data on array NSN_Information
                                FeatureChateris.push(
                                    {
                                        "NIIN": _data.NIIN,
                                        "MRC": _data.MRC,
                                        "REQUIREMENTS_STATEMENT": _data.REQUIREMENTS_STATEMENT,
                                        "CLEAR_TEXT_REPLY": _data.CLEAR_TEXT_REPLY
                                    }
                                )
                            })
                    }
    
                    // @dev push FLIS Identification data on array FLIS_Identification
                    if (element.vflisidentifications) {
                        element
                            .vflisidentifications
                            .forEach(_data => {
    
                                FLIS_Identification.push(
                                    {
                                        "PMIC": _data.PMIC,
                                        "ADPE_CODE": _data.ADP,
                                        "CRITL_CODE": _data.CRIT_CD,
                                        "DEMIL_CODE": _data.DMIL,
                                        "DEMIL_INTG": _data.DMIL_INT_CD,
                                        "NIIN_ASGMT": _data.NIIN_ASGMT,
                                        "ESD": _data.ESD_EMI,
                                        "HMIC": _data.HMIC,
                                        "ENAC": " - ",
                                        "SCHEDULE_B": _data.SCHEDULE_B,
                                        "INC": _data.INC,
                                    }
                                )
                            })
                    }
    
                    // @dev push ITEM_Description data on array
                    if (element.vh6nameincs) {
                        element
                            .vh6nameincs
                            .forEach(_data => {
    
                                ITEM_Description.push({
                                    "Item_Name_Definition_Delimitation": _data.DEFINITION,
                                    "Item_Name_Type_Code": _data.TYPE_CODE,
                                    "Applicability_Key_Code": _data.APP_KEY,
                                    "Status_Code_Name_Federal_Supply_Class": _data.INC_STATUS,
                                    "Related_Item_Names_Codes": " - ",
                                    "Data_Record_Numbers": " - ",
                                    "FSC_Condition_Code": _data.COND_CODE,
                                    "Concept_Number": _data.CONCEPT_NO ? _data.CONCEPT_NO : " - ",
                                    "Federal_Item_Identification_Guide": _data.FIIG,
                                })
                            })
                    }
    
                    // @dev push MANUFACTURING_Part_Number data on array NSN_Information
                    if (element.vflisparts) {
    
                        element
                            .vflisparts
                            .forEach(_data => {
    
                                MANUFACTURING_Part_Number.push({
                                    "MFG_SKU": _data.PART_NUMBER,
                                    "CAGE": _data.CAGE_CODE,
                                    "Status": _data.CAGE_STATUS,
                                    "Manufacturer": _data.COMPANY,
                                    "Type": " - ",
                                    "Service_Agency_Designator_Code": " - ",
                                    "RNCC": _data.RNCC,
                                    "RNVC": _data.RNVC,
                                    "Document_Availability_Code": _data.DAC,
                                    "Hazardous_Characteristics_Code": " - ",
                                    "Reference_Number_Action_Activity_Code": _data.RNAAC,
                                })
                            })
                    }
    
                    // @dev push MANUFACTURE_data  
                    if (element.vflisparts) {
    
                        element
                            .vflisparts
                            .forEach(_data => {
    
                                MANUFACTURE_data.push({
    
                                    "MFG_SKU": _data.PART_NUMBER,
                                    "CAGE": _data.CAGE_CODE,
                                    "Manufacturer": _data.COMPANY,
                                    "Type": _data.CAGE_STATUS,
                                    "Status": _data.CAGE_STATUS,
                                    "Role": " - "
                                })
    
                            })
                    }
    
                    // @dev push FLIS_Management data on array FLIS_Management
                    if (element.vflismanagements) {
                        element
                            .vflismanagements
                            .forEach(_data => {
    
                                FLIS_Management.push({
                                    "MOE": _data.MOE,
                                    "REC_REP_CODE": _data.REP_REC_CODE,
                                    "MGMT_CTL": _data.MGMT_CTL,
                                    "USC": _data.USC,
                                    "Phrase_Codes": " - ",
                                    "Phrase_Code_Statement": " - ",
                                })
                            })
                    }
    
                    // @dev push Demilitarization Codes Management data on array Demilitarization_Codes_Management
                    if (element.vflisidentifications) {
                        element
                            .vflisidentifications
                            .forEach(_data => {
                                Demilitarization_Codes_Management.push({
                                    "DML": _data.DMIL,
                                    "PMIC": _data.PMIC,
                                    "HMIC": _data.HMIC,
                                    "ADPEC": _data.ADP,
                                    "Criticality": _data.CRIT_CD,
                                    "ESDC": _data.ESD_EMI,
                                })
                            })
                    }
    
                    // @dev push Miscellaneous Management data on array Miscellaneous_Management
                    if (element.vflismanagements) {
                        element
                            .vflisidentifications
                            .forEach(_data => {
                                Miscellaneous_Management.push({
                                    "MOE": _data.MOE,
                                    "SOS": _data.SOS,
                                    "AAC": _data.AAC,
                                    "QUP": _data.QUP,
                                    "UI": _data.UI,
                                    "SLC": _data.SLC,
                                    "CIIC": _data.CIIC,
                                    "RC": _data.REP_REC_CODE,
                                    "MCC": _data.MGMT_CTL,
                                    "SVC": _data.USC,
                                })
                            })
                    }
    
                    if (element.vmoerules) {
                        element
                            .vmoerules
                            .forEach(_data => {
                                Non_Consumable_Item_Support.push({
                                    "MOE_Rule": _data.MOE_RL,
                                    "NIMSC": _data.NIMSC,
                                    "DSOR": _data.DSOR,
                                })
                            })
                    }
    
                    // @dev push Freight data on array Freight
                    if (element.vfreights) {
                        element
                            .vfreights
                            .forEach(_data => {
                                Freight_data.push({
                                    "NMFC": _data.NMFC,
                                    "NMFC_SUB": _data.NMFC_SUB,
                                    "UFC": _data.UFC,
                                    "HMC": " - ",
                                    "LTL": _data.LTL,
                                    "LCL": _data.LCL,
                                    "WCC": _data.WCC,
                                    "TCC": _data.TCC,
                                    "SHC": _data.SHC,
                                    "ADC": _data.ADC,
                                    "ACC": _data.ACC,
                                    "ASH": _data.ASH,
                                    "NMF_DESC": _data.NMF_DESC,
    
                                })
                            })
                    }
    
                    // @dev push MOE Rules data on array MOE Rules
                    if (element.vmoerules) {
                        element
                            .vmoerules
                            .forEach(_data => {
                                // MOE Rules
                                MOE_Rules.push({
                                    "Acquisition_Method_Suffix_Code": _data.AMSC,
                                    "Item_Management_Coding_Activity": _data.IMCA,
                                    "Acquisition_Method_Code": _data.AMC,
                                    "Date_Effective_Logistics_Action": _data.DT_ASGND,
                                    "Nonconsumable_Item_Material_Support_Code": _data.NIMSC,
                                    "Acquisition_Advice_Code": _data.AAC,
                                    "Supplementary_Receivers": _data.SUBMTR,
                                    "Supplementary_Collaborators": _data.SUPP_COLLAB,
                                    "Item_Management_Code": _data.IMC,
                                    "MOE_Rule": _data.MOE_RL,
                                    "Former_MOE_Rule": _data.FMR_MOE_RL,
                                    "Depot_Source_Repair_Codes": _data.DSOR,
                                })
                            })
                    }
                })
    
                // @dev Create Object NSN_INFORMATION
                if (NSN_Information[0]) {
                    setNSNInformation(
                        <>
                            <button aria-label="read less" class="accordion accordion-active" id="nsn" onClick={acord}> <b> NSN Information</b>  
                               
                                {/* <span className="text-press">{Text}</span> */}
                            </button>
                            <div class="panel">
                            <table className='tableParts' >
                                    <thead>
                                        <tr key="0">
                                        <td style={{ width: '190px' }} >NSN</td>
                                        <td style={{ width: '190px' }}>FSC</td>
                                        <td style={{ width: '190px' }} >NIIN</td>
                                        <td style={{ width: '190px' }} >Item Name</td>
                                        <td style={{ width: '190px' }} >INC</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        NSN_Information.map((element, index) => {
                                            return (
                                                <tr key={index + 1}>
                                                    <td style={{ textAlign: 'center' }}>{element.NSN}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.FSC_code}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.NIIN}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.Item_name}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.Item_name_code}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    setTitlePart('NSN:' + formatNSN(NSN_Information[0].NSN) + " (" + NSN_Information[0].NSN + ") " + ' - NSN Information')
    
                }
                // @dev Create Object NSN_INFORMATION
                if (FeatureChateris[0]) {
                    setFeatures(
                        <>
                            <button class="accordion accordion-active" onClick={acord} ><b>Features</b></button>
                            <div class="panel">
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <td style={{ width: '190px' }} >MRC</td>
                                            <td style={{ width: '190px' }}>Parameter</td>
                                            <td>Characteristics</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            FeatureChateris.map((element, index) => {
                                                return (
                                                    <tr >
                                                        <td style={{ textAlign: 'center' }}>{element.MRC}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.REQUIREMENTS_STATEMENT}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.CLEAR_TEXT_REPLY}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    setTitleFeatures('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Features')
    
                }
    
                // @dev Create Object ITEM_Description
                if (ITEM_Description[0]) {
                    setItemDescription(
                        <>
                            <button class="accordion accordion-active" onClick={acord} ><b>Item Description</b></button>
                            <div class="panel">
                                <table className='tableITEM_Description'>
                                    {
                                        ITEM_Description.map((element, index) => {
                                            
                                            return (
    
                                                <tbody>
                                                    <tr>
                                                        <th>Item Name Definition/Delimitation</th>
                                                        <td>{element.Item_Name_Definition_Delimitation}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Item Name Type Code</th>
                                                        <td>{element.Item_Name_Type_Code}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Applicability Key Code</th>
                                                        <td>{element.Applicability_Key_Code}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status Code Name/Federal Supply Class</th>
                                                        <td>{element.Status_Code_Name_Federal_Supply_Class}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Related Item Names Codes</th>
                                                        <td>{element.Related_Item_Names_Codes}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Data Record Numbers</th>
                                                        <td>
                                                            {element.Data_Record_Numbers[0]["Federal Supply Group"] ? "Federal Supply Group - " + element.Data_Record_Numbers[0]["Federal Supply Group"] : ''} <br />
                                                            {element.Data_Record_Numbers[0]["Assigned FSC within Federal Supply Group"] ? "Assigned FSC within Federal Supply Group -" + element.Data_Record_Numbers[0]["Assigned FSC within Federal Supply Group"] : ''} <br />
                                                            {element.Data_Record_Numbers[0]["FSC Modifier"] ? "FSC Modifier - " + element.Data_Record_Numbers[0]["FSC Modifier"] : ''} <br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>FSC Condition Code</th>
                                                        <td>{element.FSC_Condition_Code}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Concept Number</th>
                                                        <td>{element.Concept_Number}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Federal Item Identification Guide</th>
                                                        <td>{element.Federal_Item_Identification_Guide}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                    }
                                </table>
                            </div>
                        </>
                    )
                    setTitleItemDescription('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Item Description')
                }
    
                 // @dev Create Object Manufacturer
                 if (MANUFACTURE_data) {
                    setManufacturer(
                        <>
                            <button class="accordion accordion-active" onClick={acord} ><b>Manufacturer</b></button>
                            <div class="panel">
                            <table className='tableParts'>
                                <thead>
                                    <tr key="0">
                                        <td style={{ width: '190px' }} >MFG SKU</td>
                                        <td style={{ width: '190px' }}>CAGE</td>
                                        <td>Manufacturer</td>
                                        <td>Type</td>
                                        <td>Status</td>
                                        <td>Role</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        MANUFACTURE_data.map((element, index) => {
                                            return (
                                                <tr key={index + 1}>
                                                    <td style={{ textAlign: 'center' }}>{element.MFG_SKU}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.CAGE}</td>
                                                    <td style={{ textAlign: 'left' }}>{element.Manufacturer}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.Type}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.Status}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.Role}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
    
                            </div>
                            
                        </>
                    )
                    setTitleManufacturer('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Manufacturer')
                }

                // @dev Create Object MANUFACTURING_Part_Number
                if (MANUFACTURING_Part_Number) {
                    setManufacturingPartNumbers(
                        <>
                            <button class="accordion" onClick={acord} ><b>Manufacturing Part Numbers (SKUs)</b></button>
                            <div class="panel" style={{display: 'none'}}>
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <td style={{ width: '190px' }} >MFG SKU</td>
                                            <td style={{ width: '190px' }}>CAGE</td>
                                            <td>Status</td>
                                            <td>ISC</td>
                                            <td>RNVC</td>
                                            <td>RNCC</td>
                                            <td>SADC</td>
                                            <td>DAC</td>
                                            <td>HCC</td>
                                            <td>RNAAC</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            MANUFACTURING_Part_Number.map((element, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td style={{ textAlign: 'center' }}>{element.MFG_SKU}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.CAGE}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Status}</td>
                                                        <td style={{ textAlign: 'center' }}>-</td>
                                                        <td style={{ textAlign: 'center' }}>{element.RNVC}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.RNCC}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Service_Agency_Designator_Code}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Document_Availability_Code}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Hazardous_Characteristics_Code}</td>
                                                        <td style={{ textAlign: 'center' }}>{element.Reference_Number_Action_Activity_Code}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                           
                        </>
                    )
                    setTitleManufacturingPartNumbers('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Manufacturing Part Numbers (SKUs)')
                }
    
                // @dev Create Object FLIS_Identification
                if (FLIS_Identification) {
                    setFLISIdentification(
                        <>
                            <button class="accordion" onClick={acord} ><b>FLIS Identification</b></button>
                            <div class="panel" style={{display: 'none'}}>
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <td valign="middle">PMIC</td>
                                            <td valign="middle">ADPE <br />CODE</td>
                                            <td valign="middle">CRITL <br />CODE</td>
                                            <td valign="middle">DEMIL <br />CODE</td>
                                            <td valign="middle">DEMIL <br />INTG</td>
                                            <td valign="middle">NIIN <br />ASGMT</td>
                                            <td valign="middle">ESD</td>
                                            <td valign="middle">HMIC</td>
                                            <td valign="middle">ENAC</td>
                                            <td valign="middle">SCHEDULE_B</td>
                                            <td valign="middle">INC</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            FLIS_Identification.map((element, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td style={{ textAlign: 'center' }} data-title="PMIC">{element.PMIC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ADPE CODE">{element.ADPE_CODE}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="CRITL CODE">{element.CRITL_CODE}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="DEMIL CODE">{element.DEMIL_CODE}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="DEMIL INTG">{element.DEMIL_INTG}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="NIIN ASGMT">{element.NIIN_ASGMT}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ESD">{element.ESD}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="HMIC">{element.HMIC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ENAC">{element.ENAC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="SCHEDULE_B">{element.SCHEDULE_B}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="INC">{element.INC}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    setTitleFLISIdentification('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - FLIS Identification')
    
                }
    
                // @dev Create Object FLIS_Management
                if (FLIS_Management) {
                    setFLISManagement(
                        <>
                            <button class="accordion" onClick={acord} ><b>FLIS Management</b></button>
                            <div class="panel" style={{display: 'none'}}>
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <th>MOE</th>
                                            <th>REC REP CODE</th>
                                            <th>MGMT CTL</th>
                                            <th>USC</th>
                                            <th>Phrase Code</th>
                                            <th>Phrase Statement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            FLIS_Management.map((element, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td style={{ textAlign: 'center' }} data-title="PMIC">{element.MOE}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ADPE CODE">{element.REC_REP_CODE}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="DEMIL CODE">{element.MGMT_CTL}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="DEMIL INTG">{element.USC}</td>
                                                        {(<td style={{ textAlign: 'center' }} data-title="Phrase Code">{element.Phrase_Codes.Phrase_Code}</td>)}
                                                        {(<td style={{ textAlign: 'center' }} data-title="Phrase Code Statement">{element.Phrase_Code_Statement.Phrase_Code_Statement}</td>)}
    
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    setTitleFLISManagement('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - FLIS Management')
                }
    
                // @dev Create Object Demilitarization_Codes_Management
                if (Demilitarization_Codes_Management) {
                    setDCodesManagement(
                        <>
                            <button class="accordion" onClick={acord} ><b>Demilitarization Codes & Management</b></button>
                            <div class="panel" style={{display: 'none'}}>
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <th>DML</th>
                                            <th>PMIC</th>
                                            <th>HMIC</th>
                                            <th>ADPEC</th>
                                            <th>Criticality</th>
                                            <th>ESDC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Demilitarization_Codes_Management.map((element, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td style={{ textAlign: 'center' }} data-title="DML">{element.DML}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="PMIC">{element.PMIC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="HMIC">{element.HMIC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ADPEC">{element.ADPEC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Criticality">{element.Criticality}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ESDC">{element.ESDC}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    setTitleDCodesManagement('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Demilitarization Codes & Management')
                }
    
                // @dev Create Object Miscelleaneous Managment
                if (Miscellaneous_Management) {
                    setMiscellaneousManagement(
                        <>
                            <button class="accordion" onClick={acord} ><b>Miscellaneous Management</b></button>
                            <div class="panel" style={{display: 'none'}}>
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <th valign="middle">MOE (S_A)</th>
                                            <th valign="middle">SOS</th>
                                            <th valign="middle">AAC</th>
                                            <th valign="middle">QUP</th>
                                            <th valign="middle">QUP</th>
                                            <th valign="middle">SLC</th>
                                            <th valign="middle">CIIC</th>
                                            <th valign="middle">RC</th>
                                            <th valign="middle">MCC</th>
                                            <th valign="middle">SVC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Miscellaneous_Management.map((element, index) => {
    
                                                return (
                                                    <tr key={index + 1}>
                                                        <td style={{ textAlign: 'center' }} data-title="MOE (S_A)">{element.MOE}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="SOS">{element.SOS}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="AAC">{element.AAC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="QUP">{element.QUP}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="UI">{element.UI}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="SLC">{element.SLC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="CIIC">{element.CIIC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="RC">{element.RC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="MCC">{element.MCC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="SVC">{element.SVC}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
    
                        </>   // @dev End of Object Miscelleaneous Managment
                    )
                    setTitleMiscellaneousManagement('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Miscellaneous Management')
                }
    
                // @dev Create Object Non_Consumable_Item_Support
                if (Non_Consumable_Item_Support) {
    
                    setNonConsumableItemSupport(
                        <>
                            <button class="accordion" onClick={acord} ><b>Non-consumable Item Support</b></button>
                            <div class="panel" style={{display: 'none'}}>
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <th valign="middle">MOE Rule</th>
                                            <th valign="middle">NIMSC</th>
                                            <th valign="middle">DSOR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Non_Consumable_Item_Support.map((element, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td style={{ textAlign: 'center' }} data-title="MOE Rule">{element.MOE_Rule}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="NIMSC">{element.NIMSC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="DSOR">{element.DSOR}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
    
                    setTitleNonConsumableItemSupport('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Non-consumable Item Support')
                }
    
                // @dev Create Object Freight
                if (Freight_data) {
                    setFreight(
                        <>
                            <button class="accordion" onClick={acord} ><b>Freight</b></button>
                            <div class="panel" style={{display: 'none'}}>
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <th valign="middle">NMFC</th>
                                            <th valign="middle">NMFC Sub-Item</th>
                                            <th valign="middle">UFC</th>
                                            <th valign="middle">HMC</th>
                                            <th valign="middle">LTL</th>
                                            <th valign="middle">LCL</th>
                                            <th valign="middle">WCC</th>
                                            <th valign="middle">TCC</th>
                                            <th valign="middle">SHC</th>
                                            <th valign="middle">ADC</th>
                                            <th valign="middle">ACC</th>
                                            <th valign="middle">ASH</th>
                                            <th valign="middle">NMF DESC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Freight_data.map((element, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td style={{ textAlign: 'center' }} data-title="NMFC">{element.NMFC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="NMFC Sub-Item">{element.NMFC_SUB}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="UFC">{element.UFC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="HMC">{element.HMC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="LTL">{element.LTL}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="LCL">{element.LCL}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="WCC">{element.WCC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="TCC">{element.TCC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="SHC">{element.SHC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ADC">{element.ADC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ACC">{element.ACC}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="ASH">{element.ASH}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="NMF DESC">{element.NMF_DESC}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    setTitleFreight('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Freight')
                }
    
                if (MOE_Rules) {
                    setMOERules(
                        <>
                            <button class="accordion" onClick={acord} ><b>MOE Rules</b></button>
                            <div class="panel" style={{display: 'none'}}>
                                <table className='tableParts'>
                                    <thead>
                                        <tr key="0">
                                            <th valign="middle">Acquisition Method Suffix Code</th>
                                            <th valign="middle">Item Management Coding Activity</th>
                                            <th valign="middle">Acquisition Method Code</th>
                                            <th valign="middle">Date, Effective, Logistics Action</th>
                                            <th valign="middle">Nonconsumable Item Material Support Code</th>
                                            <th valign="middle">Acquisition Advice Code</th>
                                            <th valign="middle">Supplementary Receivers</th>
                                            <th valign="middle">Supplementary Collaborators</th>
                                            <th valign="middle">Item Management Code</th>
                                            <th valign="middle">MOE Rule</th>
                                            <th valign="middle">Former MOE Rule</th>
                                            <th valign="middle">Depot Source of Repair Codes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            MOE_Rules.map((element, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td style={{ textAlign: 'center' }} data-title="Acquisition Method Suffix Code">{element.Acquisition_Method_Suffix_Code}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Item Management Coding Activity">{element.Item_Management_Coding_Activity}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Acquisition Method Code">{element.Acquisition_Method_Code}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Date, Effective, Logistics Action">{element.Date_Effective_Logistics_Action}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Nonconsumable Item Material Support Code">{element.Nonconsumable_Item_Material_Support_Code}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Acquisition Advice Code">{element.Acquisition_Advice_Code}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Supplementary Receivers">{element.Supplementary_Receivers}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Supplementary Collaborators">{element.Supplementary_Collaborators}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Item Management Code">{element.Item_Management_Code}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="MOE Rule">{element.MOE_Rule}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Former MOE Rule">{element.Former_MOE_Rule}</td>
                                                        <td style={{ textAlign: 'center' }} data-title="Depot Source of Repair Codes">{element.Depot_Source_Repair_Codes}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    setTitleMOERules('NSN:' + formatNSN(NSN_Information[0].NSN) + ' - Rules')
                }
    
                setLoadingState(false)
                setLoadingState2(false)


                
    
            } else {
    
                setNSNInformation(
                    <h1 className='NotFoundItemText'>No data has been found</h1>
                )
    
                setLoadingState(false)
    
            }
//*  tamaño = 11 ===> PARTS
        }else if (res.data.length === 4) {
            //console.log('ift4:',res)


            settypeData(typeData = 'parts')

                const vparts = res.data[1]
                // const VfliParts = res.data[3]
                // const vh6nameincs = res.data[7]
                // const vcha = res.data[5]
                // const vps = res.data[7]
                const pagination = res.data[3]
                const title = []
                var struc = [];
                let struc2 = [];

                 //* @dev list of all pages

               

                 //*  nuevo arreglo con PART_NUMBER ITEM_NAME NSN FSC CLEAR_TEXT_REPLY de vparts llamado struct2
                //console.log('this is:', vparts.map(e=>e))
                 for (let index = 0; index < vparts.length; index++) {
                    const element = vparts[index];
                    struc.push({
                        partn: element.PART_NUMBER,
                        item_name: element.ITEM_NAME,
                        nsn: element.NSN,
                        fsc: element.FSC,
                        vchars: element.CLEAR_TEXT_REPLY,
                        // PAGINATION: totalPages[index]
                    })
                }
                //console.log('struc2',struc)


                


                //* crear un nuevo arreglo con PART_NUMBER de vps, ITEM_NAME NSN FSC INC DE vparts y CLEAR_TEXT_REPLY de vcha y luego unirlo en un nuevo arreglo llamado struc2
                // for (let i = 0; i < vps.length; i++) {
                //     let element = vps[i];
                //     let element2 = vcha[i];
                //     let element3 = vparts[i];
                    // const element4 = VfliParts[i];
                    // const element5 = pagination[i];
                    // struc2 = [
                    //     {
                    //         "partn": element.PART_NUMBER,
                    //         "item_name": element3.ITEM_NAME,
                    //         "nsn": element3.NSN,
                    //         "fsc": element3.FSC,
                    //         "inc": element3.INC,
                    //         "vchars": element2.CLEAR_TEXT_REPLY,
                    //         // PAGINATION: element5.PAGINATION
                    //     }
                    // ]
                  
                    // guardar struc2 en un array para recorrer cada elemento en una tabla
                    // struc2.forEach(element => {
                    //     struc.push(element)
                    // })
                    // struc.push(struc2)
                    //console.log(' structureL: ', struc) //este funciona
                

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
                                                    <tr key={index + 1} className="search-Part">
                                                        <td style={{ textAlign: 'center' }}> {_data.item_name} </td>
    
                                                        <td className='linkNSNS' style={{ textAlign: 'center' }}>
                                                            {/* <Link to={'/web/search/' + _data.nsn + '/1'} >{_data.nsn}</Link> */}
                                                            <Link to={'/web/search/' + _data.nsn + '/1' } onClick={() =>(window.location.href = `/web/search/${_data.nsn}/1`)}>{_data.nsn}</Link>
                                                        </td>
                                                        
                                                        <td style={{ textAlign: 'center' }}>
                                                            {_data.fsc}
                                                        </td>
                                                            
                                                        <td>
                                                           <b>General Characteristics Item Description:</b> {_data.vchars}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }} id={"Part" + index}>
                                                            {_data.partn}
                                                        </td>
                                                        <td className='subChild1' style={{ textAlign: 'center' }} id={"RFQ" + index}>
                                                           <button className='rfqButton' onClick={() => redirectRfq2(_data.nsn,_data.partn)}>RFQ</button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    ) : <tr><td style={{textAlign:'center'}} colSpan={5}>This query no contain more rows</td></tr>
                            }
                        </tbody>
                    )

                    //*mostrar la Paginacion

                    let paginationCounter = Math.ceil(pagination.pages/100),currentPagesNumber = 0;
                        
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
                                                        <NavLink onClick={() => handleLink(element === "..."?currentPage:_page)} to={`/web/search/${inputSearchValue || part }/${(element === "..."?currentPage:_page)}` } key={"linkPagination"+(element === "..."?currentPage:_page)} >
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

                    setLoadingState2(false)
                    //console.log('final part:',loadingState2)
    
    
                    // @dev Create Object NSN_INFORMATION
                    //  //console.log('PartElements: ', PartElements)
                    
                // }
                //console.log(' struct: ', struct)
                //console.log(' struc2L: ', struc2.length)


                


                //** old */
                    //? aqui

                //** old */

                


              

        }else {
            setPartElements(
                <h1 className='NotFoundItemText'>No data has been found</h1>
            )

            // setLoadingState2(false)
            //console.log(setLoadingState2)
        }

        
    }

    // @dev Formating NSN Code
    function formatNSN(NSN) {

        var _NSN = NSN.toString()
        var code = _NSN.slice(0, 4) + '-' + _NSN.slice(4, 6) + '-' + _NSN.slice(6, 9) + '-' + _NSN.slice(9,);

        return code
    }

    useEffect(() => {
        searchParts()
        fetchTasks();
    }, [])

    // @dev PAGINATION
    const previousPage = (_totalPages) => {
        if ((page - 1) <= 1) {
            setPageCounter(1)
            var currentPage = 1;
        } else {
            var currentPage = parseInt(page) - 1;
        }
        // history.push(`/web/fsgs/${codeFsg}/fsc/${codeFsc}/${currentPage}`)
        // searchParts(currentPage)
        //console.log('currentPage',currentPage)
        searchParts(part, currentPage) 

    }
    const nextPage = (_totalPages) => {
        if ((page + 1) <= 1) {
            setPageCounter(page + 2)
            var currentPage = 1;
        } else {
            setPageCounter(page + 1);
            var currentPage = parseInt(page) + 1;
        }
        // history.push(`/web/fsgs/${codeFsg}/fsc/${codeFsc}/${currentPage}`)
        // searchParts(currentPage)
        //console.log('currentPage2',currentPage)
        searchParts(part, currentPage) 


    }

    const handleLink = (_page) => {
        history.push(`/web/search/${inputSearchValue || part}/${_page}`)
        changePage = _page
        //console.log('_PagesN:',_page)
        // setPages(_page)
        //console.log('setPages:',Pages)
        
        // guardar _page en localstorage
        localStorage.setItem("numPage", _page)


        // var url = `https://api.part-miner.com/api/${_page}/search?searchBy=${inputSearchValue || part}`
        //console.log('url', url)
        
        searchParts(part, _page) 
    }



    //console.log('loa1',loadingState)
    //console.log('loa2',loadingState2)
    //console.log('typeData',typeData)

    //console.log("inputSearchValue: ",part);
    
    if(typeData=='nsn'){
        return (
            <>
                {
                    loadingState ?
                        (
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
                                            <input type="text" placeholder='Search part' onChange={event => SetinputSearchValue(event.target.value)} onKeyPress={() => searchParts(inputSearchValue)} />
                                            <button onClick={() => searchParts(inputSearchValue)}>SEARCH</button>
                                        </div>
                                    </div>
                                    <div className='child2'>
                                        <div className='subChild1'>
                                            <h1>Request For Quote</h1>
                                            <span>ENTER PART NUMBER</span>
                                            <input require type="text" onChange={handlePartNumberChange} />
                                            <span>ENTER QUANTITY</span>
                                            <input require type="text" onChange={handleQuantityChange} />
                                            <button onClick={() => redirectRfq()}>SUBMIT</button>
                                        </div>
                                    </div>
                                </div>

                                <br /><br /><br /><br /><br /><br /><br />

                                <div className='container'>
                                    <div id='loading'>

                                        {loadingState ? (<><img src={loading} alt="loading-image" /></>) : <div className='myDiv'></div>}

                                    </div>
                                </div>
                                <Footer></Footer>
                            </>
                        )
                        :
                        (
                            <>
                                <br /><br />
                                <div className='menuFixMargin' role="main">
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

                                                        <input type="text" placeholder='Search part' value={inputSearchValue} onChange={event => SetinputSearchValue(event.target.value)}  />

                                                        <button type='submit' onClick={() => searchParts(inputSearchValue)}>SEARCH</button>
                                                        <h5 className="mb-1 text-white ">
                                                            <span className="">Search by NSN, NIIN or Part Number</span>
                                                        </h5>
                                                    </div>
                                            </form>
                                        </div>


                                        <form onSubmit={(e) => redirectRfq(e)}>
                                            <div className='child2' >
                                                <div className='subChild1'>
                                                    <h1>Request For Quote</h1>
                                                    <label for="enterpartnumer">ENTER PART NUMBER</label>
                                                    <input 
                                                        onInvalid={(e) =>
                                                            e.target.setCustomValidity('Please Enter Part Number')
                                                        }
                                                        onInput={(e) => e.target.setCustomValidity('')}
                                                        // name='rfq'
                                                        id="enterpartnumer"
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

                                <br /><br /><br /><br /><br /><br /><br />

                                <div className='container'>
                                    {(NSNInformation) ? (
                                        <div className='row'>
                                            <h1 className='FederalSupplyGroup'>{(TitlePart) ? (TitlePart) : <></>}</h1>
                                            <div className='FilterResultsContent' >
                                                {NSNInformation}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    {(Features) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleFeatures) ? (TitleFeatures) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {Features}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    {(ItemDescription) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleItemDescription) ? (TitleItemDescription) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {ItemDescription}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    
                                    {(Manufacturer) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleManufacturer) ? (TitleManufacturer) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {Manufacturer}
                                            </div>
                                        </div>
                                    ) : <></>}

                                    {(ManufacturingPartNumbers) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleManufacturingPartNumbers) ? (TitleManufacturingPartNumbers) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {ManufacturingPartNumbers}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    
                                    {(FLISIdentification) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleFLISIdentification) ? (TitleFLISIdentification) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {FLISIdentification}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    {(FLISManagement) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleFLISManagement) ? (TitleFLISManagement) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {FLISManagement}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    {(DCodesManagement) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleDCodesManagement) ? (TitleDCodesManagement) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {DCodesManagement}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    {(MiscellaneousManagement) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleMiscellaneousManagement) ? (TitleMiscellaneousManagement) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {MiscellaneousManagement}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    {(NonConsumableItemSupport) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleNonConsumableItemSupport) ? (TitleNonConsumableItemSupport) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {NonConsumableItemSupport}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    {(Freight) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleFreight) ? (TitleFreight) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {Freight}
                                            </div>
                                        </div>
                                    ) : <></>}
                                    {(MOERules) ? (
                                        <div className='row'>
                                            <h2 className='FederalSupplyGroup'>{(TitleMOERules) ? (TitleMOERules) : <></>}</h2>
                                            <div className='FilterResultsContent' >
                                                {MOERules}
                                            </div>
                                        </div>
                                    ) : <></>}
                                </div>
                                <Footer></Footer>
                            </>
                        )
                }
            </>
        )
    }else{
        return (
            <>
                {
                    loadingState2 ?
                        (
                            <>
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
                                <br /><br /><br /><br /><br /><br />
                                <div className='headerContentFsc'>
                                    <div className='child1'>
                                        <div className='contentBtnHeaderFsc'>
                                            <input type="text" placeholder='Search part' onChange={event => SetinputSearchValue(event.target.value)} />
                                            <button onClick={() => searchParts(inputSearchValue)}>SEARCH</button>
                                        </div>
                                    </div>
                                    <div className='child2'>
                                        <div className='subChild1'> 
                                            <h1>Request For Quote</h1>
                                            <span>ENTER PART NUMBER</span>
                                            <input require type="text" onChange={(e) => setRfqInput(e.nativeEvent.srcElement.value)} />
                                            <span>ENTER QUANTITY</span>
                                            <input require type="text" onChange={(e) => setQuantity(e.nativeEvent.srcElement.value)} />
                                            <button onClick={() => redirectRfq()} >SUBMIT</button>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className='navigateSmall navigateSmallFix2'>
                                    <div className='row'>
                                        {/* <h1><span>Home/</span> <Link to={'/web/fsg/1'}><span>FSGs/</span></Link>  <Link to={'/web/fsg/1/' + codeFsg}><span>FSG {codeFsg}/</span></Link> {TitlePart} </h1> */}
                                    </div>
                                </div>
                                    <h1 className='FederalSupplyGroup'>{part}</h1>
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
                                                            <input  type="text" placeholder='Search part' value={inputSearchValue} onChange={event => SetinputSearchValue(event.target.value)} />
                                                            <button type='submit' onClick={() => searchParts(inputSearchValue)}>SEARCH</button>
                                                            <h5 className="mb-1 text-white ">
                                                                <span className="">Search by NSN, NIIN or Part Number</span>
                                                            </h5>
                                                        </div>
                                                </form>
                                            </div>

                                            <form onSubmit={(e) => redirectRfq(e)}>
                                                <div className='child2'>
                                                    <div className='subChild1 request_container'>
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
                                    <br />
                                    <div className='navigateSmall navigateSmallFix2'>
                                        <div className='row'>
                                            {/* <h1><span>Home/</span> <Link to={'/web/fsg/1'}><span>FSGs/</span></Link>  <Link to={'/web/fsg/1/' + codeFsg}><span>FSG {codeFsg}/</span></Link> {TitlePart} </h1> */}
                                        </div>
                                    </div>
                                    <h1 className='FederalSupplyGroup'>Results Found For <b> MFG SKU</b> : <b>{inputSearchValue || part }</b></h1>
                                    <div className='FilterResultsContent FilterResultsContentMovil' >
                                        <div className='container-fluid'>
                                            <table className='tableParts-tbl2'>
                                                <thead>
                                                    <tr key="0">
                                                        <td style={{ width: '190px' }} >Name</td>
                                                        <td style={{ width: '190px' }}>NSN</td>
                                                        <td style={{ width: '190px' }}>FSC</td>
                                                        <td>Details</td>
                                                        <td>MFG SKU</td>
                                                        <td>RFQ</td>
                                                    </tr>
                                                </thead>
                                                {PartElements}
                                            </table>
                                        </div>

                                        {
                                            inputSearchValue.length>5 || part.length>5 ?
                                                (<></>)
                                            :
                                                (window.innerWidth <= 500 ? 
                                                    (<div className='subChild1' style={{ textAlign: 'center', marginTop: '3vh',width: "95%" }} /* id={"RFQ" + index} */>
                                                        {NavigationBar ? NavigationBar : <h1>No viene navegacion</h1>}
                                                        <br />
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

}

export default SearchComponent