// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import AWN from "awesome-notifications";
// eslint-disable-next-line no-unused-vars
import "./../rfq.css";

const PartInformation = () => {
  let globalOptions = {
    positio: "bottom- right",
    maxNotifications: 3,
    animationDuration: 200,
    durations: 100,
  };
  let notifier = new AWN(globalOptions);

  const validateQuantity = (e) => {
    console.log(e);
    const quantityRegex = /^[0-9]*$/;
    if (e.target.value < 0) {
      e.target.value = e.target.value * -1;
    }
  };

  if (
    localStorage.getItem("rfqInfo") === null ||
    localStorage.getItem("rfqInfo") === "undefined"
  ) {
    localStorage.setItem("rfqInfo", JSON.stringify("rfqInfo"));
  } else {
    var _rfqInfo = JSON.parse(localStorage.getItem("rfqInfo"));
  }
  // console.log("rfqInfo", _rfqInfo);

  // const _rfqInfo = JSON.parse(localStorage.getItem('rfqInfo'));
  let data3Ini = JSON.parse(localStorage.getItem("data3"));
  data3Ini = data3Ini == null ? [] : data3Ini;

  let componentstbodyContent = [];

  data3Ini.forEach((componentB, kCB) => {
    componentstbodyContent.push(
      <tr key={kCB} className="bodyTable" id={"bodyTable" + kCB}>
        <td>
          <input type="text" placeholder="" value={componentB.NSN} />
        </td>
        <td>
          <input
            type="text"
            placeholder=""
            value={componentB.PART_NUMBER || _rfqInfo.rfqHomeInfo}
          />
        </td>
        <td>
          <input type="text" placeholder="" value={componentB.ITEM_NAME} />
        </td>
        <td>
          <input
            type="number"
            placeholder=""
            min={1}
            onChange={validateQuantity}
            defaultValue={_rfqInfo.rfqQuantity}
          />
        </td>
        <td>
          <svg
            style={{ cursor: "pointer" }}
            onClick={() => {
              removeParts(kCB);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="21"
            viewBox="0 0 18 21"
          >
            {" "}
            <g id="delete" transform="translate(-4.5 -2.25)">
              {" "}
              <path
                id="Trazado_1"
                data-name="Trazado 1"
                d="M13.5,13.5H15v9H13.5Z"
                transform="translate(-3 -3.75)"
                fill="#e94a35"
              />{" "}
              <path
                id="Trazado_2"
                data-name="Trazado 2"
                d="M20.25,13.5h1.5v9h-1.5Z"
                transform="translate(-5.25 -3.75)"
                fill="#e94a35"
              />{" "}
              <path
                id="Trazado_3"
                data-name="Trazado 3"
                d="M4.5,6.75v1.5H6v15a1.5,1.5,0,0,0,1.5,1.5h12a1.5,1.5,0,0,0,1.5-1.5v-15h1.5V6.75Zm3,16.5v-15h12v15Z"
                transform="translate(0 -1.5)"
                fill="#e94a35"
              />{" "}
              <path
                id="Trazado_4"
                data-name="Trazado 4"
                d="M13.5,2.25h6v1.5h-6Z"
                transform="translate(-3)"
                fill="#e94a35"
              />{" "}
            </g>{" "}
          </svg>
        </td>
      </tr>
    );
  });

  if (componentstbodyContent.length == 0) {
    componentstbodyContent.push(
      <tr key={"11-11"} className="bodyTable" id={"bodyTable-11-11"}>
        <td>
          <input type="text" placeholder="" />
        </td>
        <td>
          <input type="text" placeholder="" />
        </td>
        <td>
          <input type="text" placeholder="" />
        </td>
        <td>
          <input min={1} type="number" placeholder="" />
        </td>
        <td></td>
      </tr>
    );
  }

  const [tbodyNew, SetbodyNew] = useState([]);
  const [data, setData] = useState([]);
  // const [tblRfq, settblRfq] = useState([])
  const [rfqInfo, setrfqInfo] = useState([]);
  const [tblRfq, settblRfq] = useState([]);
  const [tbodyContentNew, SetbodyContentNew] = useState([]);
  const [defaultQuantity, setDefaultQuantity] = useState("1");
  const [quantity, setQuantity] = useState("");
  const [tbodyContent, SetbodyContent] = useState(componentstbodyContent);

  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  function loadTbodyContent() {
    const _data = localStorage.getItem("data3");
    // console.log("_data3", _data);

    const _rfqInfo = JSON.parse(localStorage.getItem("rfqInfo"));
    // const _tblRfq = localStorage.getItem("tblRFQ")
    var _tblRfq = JSON.parse(localStorage.getItem("tblRFQ"));

    setData(_data ? _data : []);
    setrfqInfo(_rfqInfo ? _rfqInfo : []);
    settblRfq(tblRfq ? tblRfq : []);

    if (_rfqInfo !== "undefined" && _data != null) {
      if (_data !== "undefined" && _data != null) {
        if (_tblRfq !== "undefined" && _tblRfq != null) {
          SetbodyContent(
            <>
              {JSON.parse(_data).map((element, index) => {
                // console.log("elements: ",element);
                //_rfqInfo.rfqQuantity
                return (
                  <tr
                    key={index + 1}
                    className="bodyTable"
                    id={"bodyTable" + index}
                  >
                    <td>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        placeholder=""
                        value={element.NSN || element.nsn}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        placeholder=""
                        value={element.PART_NUMBER || element.partn}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ textAlign: "center" }}
                        placeholder=""
                        value={element.ITEM_NAME || element.item_name}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        style={{ textAlign: "center" }}
                        placeholder=""
                        defaultValue={_rfqInfo.rfqQuantity}
                      />
                    </td>
                    <td>
                      <svg
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          removeParts(index);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="21"
                        viewBox="0 0 18 21"
                      >
                        {" "}
                        <g id="delete" transform="translate(-4.5 -2.25)">
                          {" "}
                          <path
                            id="Trazado_1"
                            data-name="Trazado 1"
                            d="M13.5,13.5H15v9H13.5Z"
                            transform="translate(-3 -3.75)"
                            fill="#e94a35"
                          />{" "}
                          <path
                            id="Trazado_2"
                            data-name="Trazado 2"
                            d="M20.25,13.5h1.5v9h-1.5Z"
                            transform="translate(-5.25 -3.75)"
                            fill="#e94a35"
                          />{" "}
                          <path
                            id="Trazado_3"
                            data-name="Trazado 3"
                            d="M4.5,6.75v1.5H6v15a1.5,1.5,0,0,0,1.5,1.5h12a1.5,1.5,0,0,0,1.5-1.5v-15h1.5V6.75Zm3,16.5v-15h12v15Z"
                            transform="translate(0 -1.5)"
                            fill="#e94a35"
                          />{" "}
                          <path
                            id="Trazado_4"
                            data-name="Trazado 4"
                            d="M13.5,2.25h6v1.5h-6Z"
                            transform="translate(-3)"
                            fill="#e94a35"
                          />{" "}
                        </g>{" "}
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </>
          );
        }
      }
    }
  }

  var id = new Date().toLocaleTimeString() + new Date().getUTCMilliseconds();
  function addMoreParts() {
    let validInputs = true;
    let elements = document.getElementsByClassName("bodyTable");
    for (let i = 0; i < elements.length; i++) {
      let inputs = elements[i].querySelectorAll("input");
      for (let j = 0; j < inputs.length; j++) {
        inputs[j].classList.remove("invalid");
        if (inputs[j].value == "") {
          validInputs = false;
          inputs[j].classList.add("invalid");
        }
      }
    }

    if (validInputs === true) {
      let _id =
        new Date().toLocaleTimeString() + new Date().getUTCMilliseconds();
      SetbodyNew(
        <tr key={_id} className="bodyTable" id={"bodyTable" + _id}>
          <td>
            <input type="text" placeholder="" />
          </td>
          <td>
            <input type="text" placeholder="" />
          </td>
          <td>
            <input type="text" placeholder="" />
          </td>
          <td>
            <input type="number" min={1} placeholder="" />
          </td>
          <td>
            <svg
              style={{ cursor: "pointer" }}
              onClick={() => {
                removeParts(_id);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="21"
              viewBox="0 0 18 21"
            >
              {" "}
              <g id="delete" transform="translate(-4.5 -2.25)">
                {" "}
                <path
                  id="Trazado_1"
                  data-name="Trazado 1"
                  d="M13.5,13.5H15v9H13.5Z"
                  transform="translate(-3 -3.75)"
                  fill="#e94a35"
                />{" "}
                <path
                  id="Trazado_2"
                  data-name="Trazado 2"
                  d="M20.25,13.5h1.5v9h-1.5Z"
                  transform="translate(-5.25 -3.75)"
                  fill="#e94a35"
                />{" "}
                <path
                  id="Trazado_3"
                  data-name="Trazado 3"
                  d="M4.5,6.75v1.5H6v15a1.5,1.5,0,0,0,1.5,1.5h12a1.5,1.5,0,0,0,1.5-1.5v-15h1.5V6.75Zm3,16.5v-15h12v15Z"
                  transform="translate(0 -1.5)"
                  fill="#e94a35"
                />{" "}
                <path
                  id="Trazado_4"
                  data-name="Trazado 4"
                  d="M13.5,2.25h6v1.5h-6Z"
                  transform="translate(-3)"
                  fill="#e94a35"
                />{" "}
              </g>{" "}
            </svg>
          </td>
        </tr>
      );

      tbodyContentNew.push(tbodyNew);
      SetbodyContentNew(tbodyContentNew);
    } else {
      notifier.alert("Review Empty Fields", { durations: { alert: 0 } });
    }
  }

  function removeParts(el) {
    // eliminar el elemento de tbodyContent

    if (document.getElementById("bodyTable" + el)) {
      document.getElementById("bodyTable" + el).remove();

      //eliminar elemnto de localstorage data3
      const _data = localStorage.getItem("data3");
      var _data3 = JSON.parse(_data);
      _data3.splice(el, 1);
      localStorage.setItem("data3", JSON.stringify(_data3));
    }

    // window.location.href = window.location.href;
  }

  useEffect(() => {
    loadTbodyContent();
  }, []);

  return (
    <div>
      <div className="PartInformation">
        <h1 className="title">
          Part <span>Information</span>
        </h1>
        <table className="tableInfo">
          {/* titulo --------- */}
          <thead>
            <tr className="titlesTable">
              <td>NSN</td>
              <td>MFG SKU</td>
              <td>ITEM NAME</td>
              <td>QTY</td>
              <td>REMOVE</td>
            </tr>
          </thead>
          {/* cuerpo --------------- */}
          <tbody id="tableContent">
            {tbodyContent}
            {tbodyContentNew ? (
              <>{tbodyContentNew.map((el) => el)}</>
            ) : (
              "No results found"
            )}
          </tbody>
        </table>
        <div className="contentBtn">
          <button
            onClick={() => {
              addMoreParts();
            }}
          >
            Add More Parts <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartInformation;
