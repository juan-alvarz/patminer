// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import "./../rfq.css";

const PartInformation = () => {
    
    const _rfqInfo = JSON.parse(localStorage.getItem('rfqInfo'));
    const data3Ini = JSON.parse(localStorage.getItem('data3'));
    let componentstbodyContent = [];

    data3Ini.forEach((componentB, kCB) => {
        componentstbodyContent.push(
            <tr key={kCB} className='bodyTable' id={'bodyTable' + kCB}>
                <td><input type="text" placeholder='' value={componentB.NSN} /></td>
                <td><input type="text" placeholder='' value={_rfqInfo.rfqHomeInfo} /></td>
                <td><input type="text" placeholder='' value={componentB.ITEM_NAME} /></td>
                <td><input type="text" placeholder='' value={_rfqInfo.rfqQuantity} /></td>
                <td></td>
            </tr>
        );
    });

    const [tbodyNew, SetbodyNew] = useState([])
    const [data, setData] = useState([])
    // const [tblRfq, settblRfq] = useState([])
    const [rfqInfo, setrfqInfo] = useState([])
    const [tblRfq, settblRfq] = useState([])
    const [tbodyContentNew, SetbodyContentNew] = useState([])
    const [quantity, setQuantity] = useState('')
    const [tbodyContent, SetbodyContent] = useState(componentstbodyContent)

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
    };


    function loadTbodyContent() {

        const _data = localStorage.getItem('data3')
      
        const _rfqInfo = JSON.parse(localStorage.getItem('rfqInfo'))
        // const _tblRfq = localStorage.getItem("tblRFQ")
        var _tblRfq = JSON.parse(localStorage.getItem("tblRFQ"));

        setData(_data ? _data : []);
        setrfqInfo(_rfqInfo ? _rfqInfo : []);
        settblRfq(tblRfq ? tblRfq : []);

        if (_rfqInfo !== "undefined" && _data != null) {
            if (_data !== "undefined" && _data != null) {
                if(_tblRfq !== "undefined" && _tblRfq != null){

                    SetbodyContent(
                        <>
                            {                            
                                JSON.parse(_data).map((element, index) => {
                                    console.log("elements: ",element);
                                    return (
                                        
                                        <tr key={index + 1} className='bodyTable' id={'tableContent' + index}>
                                            <td><input type="text" style={{ textAlign:'center' }} placeholder='' value={element.nsn} /></td>
                                            <td><input type="text" style={{ textAlign:'center' }} placeholder='' value={element.partn} /></td>
                                            <td><input type="text" style={{ textAlign:'center' }} placeholder='' value={element.item_name} /></td>
                                            <td><input type="text" style={{ textAlign:'center' }} placeholder='' onChange={handleQuantity} /></td>
                                            <td><svg style={{ cursor: 'pointer' }} onClick={() => { removeParts(index + 1) }} xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21"> <g id="delete" transform="translate(-4.5 -2.25)"> <path id="Trazado_1" data-name="Trazado 1" d="M13.5,13.5H15v9H13.5Z" transform="translate(-3 -3.75)" fill="#e94a35" /> <path id="Trazado_2" data-name="Trazado 2" d="M20.25,13.5h1.5v9h-1.5Z" transform="translate(-5.25 -3.75)" fill="#e94a35" /> <path id="Trazado_3" data-name="Trazado 3" d="M4.5,6.75v1.5H6v15a1.5,1.5,0,0,0,1.5,1.5h12a1.5,1.5,0,0,0,1.5-1.5v-15h1.5V6.75Zm3,16.5v-15h12v15Z" transform="translate(0 -1.5)" fill="#e94a35" /> <path id="Trazado_4" data-name="Trazado 4" d="M13.5,2.25h6v1.5h-6Z" transform="translate(-3)" fill="#e94a35" /> </g> </svg></td>
                                        </tr>
                                    )
                                })
                            }
                        </>
                    )
                }
            }
            
        }
      
    }

    var id = new Date().toLocaleTimeString() + new Date().getUTCMilliseconds()
    function addMoreParts() {

        let _id = new Date().toLocaleTimeString() + new Date().getUTCMilliseconds()
        SetbodyNew(
            <tr key={_id} className='bodyTable' id={'bodyTable' + _id}>
                <td><input type="text" placeholder='' /></td>
                <td><input type="text" placeholder='' /></td>
                <td><input type="text" placeholder='' /></td>
                <td><input type="text" placeholder='' /></td>
                <td><svg style={{ cursor: 'pointer' }} onClick={() => { removeParts(_id) }} xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21"> <g id="delete" transform="translate(-4.5 -2.25)"> <path id="Trazado_1" data-name="Trazado 1" d="M13.5,13.5H15v9H13.5Z" transform="translate(-3 -3.75)" fill="#e94a35" /> <path id="Trazado_2" data-name="Trazado 2" d="M20.25,13.5h1.5v9h-1.5Z" transform="translate(-5.25 -3.75)" fill="#e94a35" /> <path id="Trazado_3" data-name="Trazado 3" d="M4.5,6.75v1.5H6v15a1.5,1.5,0,0,0,1.5,1.5h12a1.5,1.5,0,0,0,1.5-1.5v-15h1.5V6.75Zm3,16.5v-15h12v15Z" transform="translate(0 -1.5)" fill="#e94a35" /> <path id="Trazado_4" data-name="Trazado 4" d="M13.5,2.25h6v1.5h-6Z" transform="translate(-3)" fill="#e94a35" /> </g> </svg></td>
            </tr>
        )

        tbodyContentNew.push(tbodyNew)
        SetbodyContentNew(tbodyContentNew)
    }

    function removeParts(el) {

        if (document.getElementById('bodyTable' + el)) {
            document.getElementById('bodyTable' + el).remove()
        }
    }


    useEffect(() => {
        loadTbodyContent()
        var _id = new Date().toLocaleTimeString() + new Date().getUTCMilliseconds()
        var _key = new Date().toLocaleTimeString() + new Date().getUTCMilliseconds()

        SetbodyContentNew(
            [
                <tr key={_key + 1} className='bodyTable' id={'bodyTable' + _id}>
                    <td><input type="text" placeholder='' /></td>
                    <td><input type="text" placeholder='' /></td>
                    <td><input type="text" placeholder='' /></td>
                    <td><input type="text" placeholder='' /></td>
                    <td><svg style={{ cursor: 'pointer' }} onClick={() => { removeParts(_id) }} xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21"> <g id="delete" transform="translate(-4.5 -2.25)"> <path id="Trazado_1" data-name="Trazado 1" d="M13.5,13.5H15v9H13.5Z" transform="translate(-3 -3.75)" fill="#e94a35" /> <path id="Trazado_2" data-name="Trazado 2" d="M20.25,13.5h1.5v9h-1.5Z" transform="translate(-5.25 -3.75)" fill="#e94a35" /> <path id="Trazado_3" data-name="Trazado 3" d="M4.5,6.75v1.5H6v15a1.5,1.5,0,0,0,1.5,1.5h12a1.5,1.5,0,0,0,1.5-1.5v-15h1.5V6.75Zm3,16.5v-15h12v15Z" transform="translate(0 -1.5)" fill="#e94a35" /> <path id="Trazado_4" data-name="Trazado 4" d="M13.5,2.25h6v1.5h-6Z" transform="translate(-3)" fill="#e94a35" /> </g> </svg></td>
                </tr>
            ]
        )

    }, [])

    return (
        <div>
            <div className='PartInformation'>
                <h1 className='title'>Part <span>Information</span></h1>
                <table className='tableInfo'>
                    {/* titulo --------- */}
                    <thead>
                        <tr className='titlesTable'>
                            <td>NSN</td>
                            <td>PART NUMBER</td>
                            <td>ITEM NAME</td>
                            <td>QTY</td>
                            <td>REMOVE</td>
                        </tr>
                    </thead>
                    {/* cuerpo --------------- */}
                    <tbody id='tableContent'>
                        {tbodyContent}
                        {(tbodyContentNew) ? (
                            <>
                                {
                                    tbodyContentNew.map(el => el)
                                }
                            </>
                        ) : "No results found"}
                    </tbody>
                </table>
                <div className='contentBtn'>
                    <button onClick={() => { addMoreParts() }}>Add More Parts <span>+</span></button>
                </div>
            </div>
        </div>
    )
}

export default PartInformation