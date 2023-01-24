import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./manofacturer.css";
import Menu from "./../home/menu/menu";
import Footer from "./../home/footer/footer";
import { useParams } from "react-router-dom";
import { baseUrl, FSC_DETAIL } from "./../httpBaseUrl.js";

const Manofacturer = () => {

    const [titlePart, setTitlePart] = useState([])
    const [nsInformation, setNsInformation] = useState([])
    const [manofacturer, setManofacturer] = useState([])
    const [initTableMano, setInitTableMano] = useState([])

    let { part } = useParams();

    function manofacturerGet() {

        var url = `https://api.part-miner.com/stockn/search?searchBy=${part}`;
        var NSN_Information = [];

        console.log(url)

        axios.get(url).then(function (response) {
            console.log(response.data)

            const data = response.data;

            // @dev identifico la respuesta del API con llaves
            var struct = [
                {
                    "Stock_number": data[0] ? data[0] : null,
                    "Part_number": data[1] ? data[1] : null,
                    "Concept_number": data[2] ? data[2] : null,
                    "Reference_number": data[3] ? data[3] : null,
                    "Entity_code": data[4] ? data[4] : null,
                    "Item_name": data[5] ? data[5] : null,
                }
            ]

            struct.forEach(element => {
                // @dev push Stock_number data on array NSN_Information
                if (element.Stock_number) {

                    element.Stock_number.forEach(_data => {
                        NSN_Information.push(
                            {
                                "NSN": _data.code,
                                "NIIN": _data.niin,
                                "FSC_code": _data.fsc,
                                "Item_name": element.Part_number.name,
                                "Item_name_code": _data.item_name_code
                            }
                        )
                    })
                }

            })

            setInitTableMano(response.data)

            setTitlePart(
                <h1>{response.data.name}</h1>
            )

            setNsInformation(
                <h3>{response.data.nsn} NSN Information</h3>
            )


            setManofacturer(
                <>
                    <div className='contentTables'>
                        <table>
                            <tbody>
                                <tr className='trHead'>
                                    <th>NSN</th>
                                    <th>FSC</th>
                                    <th>NIIN</th>
                                    <th>ITEM NAME</th>
                                    <th>INC</th>
                                </tr>
                                {

                                    NSN_Information.map((element, index) => {
                                        return (
                                            <>
                                                <tr className='tdBody'>
                                                    <td style={{ textAlign: 'center' }}>{element.NSN}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.FSC_code}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.NIIN}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.Item_name}</td>
                                                    <td style={{ textAlign: 'center' }}>{element.Item_name_code}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }

                            </tbody>
                        </table>


                    </div>
                </>
            )
        })
        .catch(error => console.log("We are having issues with the server. Try again later"));
    }

    useEffect(() => {
        manofacturerGet()
    }, [])

    return (
        <>
            <Menu></Menu>
            <br /><br /><br /><br /><br />
            <div className='manofacturer'>
                {titlePart}
                {nsInformation}
                {manofacturer}
            </div>
            <Footer></Footer>
        </>
    )
}

export default Manofacturer