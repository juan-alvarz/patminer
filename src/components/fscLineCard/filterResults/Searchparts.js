import React, { useState, useEffect } from 'react';
import loading from "./../../../assets/home/loading-loading-screen.gif";
// import "./../fscLineCard.css";
// import slider1 from "./../../../assets/rfq/3-1.jpg";
// import slider2 from "./../../../assets/rfq/4-1.jpg";
// import slider3 from "./../../../assets/rfq/7_720.jpg";
// import Menu from "./../../home/menu/menu";
import Footer from "./../../home/footer/footer";
import { useParams, useHistory } from "react-router-dom";
import { baseUrlContact, SEARCH_ROUTE, localbk } from "./../../httpBaseUrl.js";
import axios from "axios";



function SearchPartsC() {
    let { part } = useParams();
    let history = useHistory();
    const [loadingState, setLoadingState] = useState(false)
 

    function searchPart(data) {
        setLoadingState(true)
        console.log(data)

        if (data != '' && data != null && data != 'undefined') {
            var url = localbk + data;
            // var url = localbk + data;
        } else {
            console.log('Error')
            var url = localbk + part;
            // var url = localbk + part;
        }

        axios.get(url).then(function (response) {
            console.log('esto es: ',response)
            // printContent(response)

        })
        .catch(error => console.log("We are having issues with the server. Try again later"));
    }

    useEffect(() => {
        searchPart()
        // fetchTasks();
    }, [])






  return (
    <div>SearchPartsC</div>
    // <h1>Hello </h1>
  )
}

export default SearchPartsC

