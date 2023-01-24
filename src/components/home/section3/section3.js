import React, { useEffect, useState } from 'react'
import './../home.css';
import "./../../../assets/plugins/landing.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SectionThree = () => {
    const [GroupInfo, setGroupInfo] = useState([])

    function GetGroups() {
        axios.get('https://api.part-miner.com/api/fsg/groups').then(function (res) {
            //console.log("Res es: ", res.data)
            setGroupInfo(res.data)
        })
        .catch(error => console.log("We are having issues with the server. Try again later"));
    }

    let history = useHistory();
    function OurLineCardRedirect(param1, param2) {
        history.push('/web/fsgs/' + param1 + '/fsc/' + param2 + '/1')
    }

    useEffect(() => {
        GetGroups()
    }, [])

    return (
        <>
            <div className='ContentAllFSC'>
                <div className='content3'>
                    {/* <h1>About <span>PartMiner</span></h1> */}
                    <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '110px', fontSize: '30px' }}>About PartMiner</h2>
                    <p>
                        PartMiner Industries is a global provider of NSN parts.  Whether you’re a member of our military, a buyer for the aerospace or defense industry, a contractor or small business , the process is very simple:
                        <br /><br />
                        <ul>
                            <li>Request a quote and complete the short form</li>
                            <li>Receive an immediate confirmation e-mail</li>
                            <li>Your sales representative will determine product availability within 24 to 48 hours</li>

                        </ul><br />
                       
                        Our sales and procurement staff is made up of experienced, highly knowledgeable industry experts. We want to become your ‘go to’ source for parts and materials. Think of us as an extension of your purchasing team.
                        
                       <br /><br />
                        We hope you enjoy using our site and look forward to working with you.</p>
                </div>
                <div className='FSCHome'>
                    <h1 className='LineCardText'>Our Line Card</h1>
                    <div className='acordeonNsNs'>
                        <div className="row">
                            <div className="col">
                                <div className="tabs">
                                    {
                                        (GroupInfo) ?
                                            (GroupInfo.map((el, index) => {
                                                return (
                                                    <div tabIndex={index} key={"info:"+index} className="tab mytab" >
                                                        <input type="checkbox" id={'check1' + index} />
                                                        <label className="tab-label" htmlFor={'check1' + index}>
                                                            <div className='divContentLetter'>
                                                                <h2>{el.FSG_TITLE}</h2>
                                                            </div>
                                                        </label>
                                                        <div className="tab-content">
                                                            
                                                            {
                                                                (el.FSC_GROUP) ?
                                                                    (el.FSC_GROUP.map((el2, index2) => {
                                                                        return (
                                                                           
                                                                            <ul key={"FSC "+index2}>
                                                                                <li>
                                                                                    <h2  className='ItemClass' onClick={() => OurLineCardRedirect(el.FSG, el2.FSC)}>{el2.FSC_TITLE}</h2>
                                                                                </li>
                                                                            </ul>
                                                                            
                                                                        )
                                                                    })) : (<h2>No Data founded</h2>)
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })) :
                                            (<h1>Loading...</h1>)
                                    }
                                </div>
                            </div>
                        </div>
                        <br /> <br /> <br /> <br /> <br />
                    </div>
                </div>
            </div>
        </>
    )
}


export default SectionThree