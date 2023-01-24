import React from 'react'
import "./../fscLineCard.css";
import arrowLeft from "./../../../assets/fscLineCard/arrowLeft.jpg";
import slider1 from "./../../../assets/rfq/3-1.jpg";
import slider2 from "./../../../assets/rfq/4-1.jpg";
import slider3 from "./../../../assets/rfq/7_720.jpg";
import { Link } from "react-router-dom";
import { baseUrl } from "./../../httpBaseUrl.js";
import { Redirect } from "react-router-dom";

class FilterResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            styleModal: 'modalInfoFsc',
            classArray: [],
            inputSearchValue: '',
            modalInfoClass: {
                titleModal: "",
                listGroup: [],

            },
            partsListGroup: {
                indexClass: '',
                contentGroup: []
            },
            printModalSearchHome: {
                showModalShome: { display: 'none' },
                contentModal: []
            },
            rfqInput: '',
            rfqAdress: '',
            rfqQuantity: '',
            redirect: null
        };
    }

    httpGet(urlApi) {
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

    GetGroups() {
/*         this.httpGet(FSG_Group).then(res => {
            this.setState({
                classArray: res
            })
        }) */
        this.httpGet("https://api.part-miner.com/api/fsg/").then(res => {
            console.log(res)
            this.setState({
                classArray: res
            })
        }) 
    }

    componentDidMount() {
        this.GetGroups()
        window.scrollTo(0, 0)
    }

    handleClick() {
        if (this.state.rfqInput && this.state.rfqAdress && this.state.rfqQuantity) {
            localStorage.setItem('rfqHomeInfo', this.state.rfqInput)
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        /* var _this = this; */
        if (this.state.redirect) {
            return <Redirect to={'/web/rfq'} />
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
                        <div className='contentBtnHeaderFsc'>
                            <input type="text" placeholder='Search part' onChange={event => this.setState({ inputSearchValue: event.target.value })} />
                            <Link to={"/web/search/" + this.state.inputSearchValue}><button>SEARCH</button></Link>
                        </div>
                    </div>
                    <div className='child2'>
                        <div className='subChild1'>
                            <h1>Request For Quote</h1>
                            <span>ENTER PART NUMBER</span>
                            <input type="text" onChange={(e) => this.setState({ rfqInput: e.nativeEvent.srcElement.value })} />
                            <span>ENTER EMAIL ADDRES</span>
                            <input type="text" onChange={(e) => this.setState({ rfqAdress: e.nativeEvent.srcElement.value })} />
                            <span>ENTER QUANTITY</span>
                            <input type="text" onChange={(e) => this.setState({ rfqQuantity: e.nativeEvent.srcElement.value })} />
                            <button onClick={() => { this.handleClick() }} >SUBMIT</button>
                        </div>
                    </div>
                </div>
                <br /> <br /> <br /> <br /> <br /><br />
                <div className='navigateSmall'>
                    <h1><span>Home/</span> FSGs</h1>
                </div>
                <h1 className='FederalSupplyGroup'>Federal Supply Group (FSG) Glossary</h1>
                <div className='FilterResultsContent' >
                    {
                        this.state.classArray.map((el, index) => {
                            let elementTitle = () => {
                                if (el.FSC_TITLE.length > 30) {
                                    return <h2 className='titleSmall1'>{el.FSC_TITLE}</h2>
                                } else {
                                    return <h2>{el.FSC_TITLE}</h2>
                                }
                            }


                            if (el) {
                                if (el.FSG_TITLE !== "Live Animals" && el.FSG_TITLE !== "Toiletries") {
                                    return (<div key={index} className='contentResults' id={'contentResultsIndex' + index}>
                                        <h1>FSG {el.FSC}</h1>
                                        {elementTitle()}
                                        <Link to={"/web/fsg/1/" + el.FSG}><button> <img src={arrowLeft} alt="arrow" /></button></Link>
                                    </div>)
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
}
export default FilterResults