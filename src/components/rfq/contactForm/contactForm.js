import React, { useState, useEffect } from "react";
import "./../rfq.css";
import AWN from "awesome-notifications";
import axios from "axios";
import { baseUrlContact, bslocalbk } from "./../../httpBaseUrl.js";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Button from "@mui/material/Button";

const ContactForm = () => {
  const [rfqInfo, setRfqInfo] = useState("");
  const [prefixPhone, setPrefixPhone] = useState();

  //*  email
  if (
    localStorage.getItem("rfqInfo") === null ||
    localStorage.getItem("rfqInfo") === "undefined"
  ) {
    localStorage.setItem("rfqInfo", JSON.stringify("rfqInfo"));
  } else {
    var _rfqInfo = JSON.parse(localStorage.getItem("rfqInfo"));
  }

  let globalOptions = {
    positio: "bottom- right",
    maxNotifications: 3,
    animationDuration: 200,
    durations: 100,
  };

  let notifier = new AWN(globalOptions);

  // eslint-disable-next-line no-unused-vars
  function httpGet(urlApi, body) {
    // eslint-disable-next-line no-unused-vars
    let headers = new Headers();

    return new Promise((responseAll, rejecteAll) => {
      let url = urlApi;

      var user = "admin";
      var pass = "admin";
      var basicAuth = "Basic " + (user + ":" + pass);

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: +basicAuth,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((response) => {
          responseAll(response);
        })
        .catch((err) => rejecteAll(err));
    });
  }

  //--Phonemask
  setTimeout(() => {
    const phoneEl = document.getElementById("phoneInput");
    if (phoneEl) {
      phoneEl.addEventListener("keypress", (e) => {
        if (e.keyCode != 9 && e.keyCode != 16) {
          let num = phoneEl.value.replace(/\D/g, "");
          phoneEl.value =
            num.substring(0, 3) +
            "-" +
            num.substring(3, 6) +
            "-" +
            num.substring(6, 9);
          if (phoneEl.value === "--") {
            phoneEl.value = "";
          }
        }
      });
    }
  }, 3000);

  let rfqDataValidation = true;
  function sendRfqData(e) {
    setRfqInfo(JSON.parse(localStorage.getItem("rfqInfo")));

    let dataParts = [];
    let elements = document.getElementsByClassName("bodyTable");
    let firstError = true;
    for (let i = 0; i < elements.length; i++) {
      let inputs = elements[i].querySelectorAll("input");
      // console.log('NSN: ',inputs[0].value)
      // dataParts.push([inputs[0].value])

      for (let j = 0; j < inputs.length; j++) {
        inputs[j].classList.remove("invalid");
        if (inputs[j].value == 0 || inputs[j].value == null) {
          rfqDataValidation = false;
          inputs[j].classList.add("invalid");

          if (firstError) {
            inputs[j].focus();
            firstError = false;
          }
        }
      }

      if (rfqDataValidation) {
        dataParts.push({
          nsn: inputs[0].value,
          mfgsku: inputs[1].value,
          item_name: inputs[2].value,
          quantity: Number(inputs[3].value),
        });
      }
    }

    const firstNameEl = document.getElementById("firstNameInput");
    const lastNameEl = document.getElementById("lastNameInput");
    const emailEl = document.getElementById("emailInput");
    const companyTypeEl = document.getElementById("companyTypeinput");
    const timeLineEl = document.getElementById("timelineInput");
    const phoneEl = document.getElementById("phoneInput");
    const companyEl = document.getElementById("companyInput");
    const commentEl = document.getElementById("commentsInput");

    const inputFormEl = [
      firstNameEl,
      lastNameEl,
      emailEl,
      phoneEl,
      companyTypeEl,
      timeLineEl,
      companyEl,
    ];

    inputFormEl.map((inputEl) => {
      if (inputEl.value == "") {
        inputEl.classList.add("invalid");
      } else {
        inputEl.classList.remove("invalid");
      }
    });

    //Regex Validations
    const phoneRegex = /^\d{3}-?\d{3}-?\d{4}$/;
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const valPhone = phoneRegex.test(phoneEl.value) ? true : false;
    if (valPhone == false) {
      phoneEl.classList.add("invalid");
    }

    const valEmail = emailRegex.test(emailEl.value) ? true : false;
    if (valEmail == false) {
      emailEl.classList.add("invalid");
    }

    const invalidExist = document.getElementsByClassName("invalid").length > 0;
    let phoneToSend = prefixPhone.toString().slice(1);
    let dataInputs = {
      first_name: firstNameEl.value,
      last_name: lastNameEl.value,
      email: emailEl.value,
      company_type: companyTypeEl.value,
      time_line: timeLineEl.value,
      // phone: phoneEl.value,
      phone: phoneToSend,
      company: companyEl.value,
      comments: commentEl.value,
      quoteDetail: dataParts,
    };

    // eslint-disable-next-line no-unused-vars
    var url = baseUrlContact + "/rfq/newrfq";
    // var url = bslocalbk + '/rfq/newrfq';

    if (!rfqDataValidation) {
      e.preventDefault();
      notifier.alert("Review Input Fields", { durations: { alert: 0 } });
    }

    if (!invalidExist) {
      e.preventDefault();
      console.log(dataInputs);
      notifier.success("Request sent successfully", {
        durations: { success: 0 },
      });
      firstNameEl.value = "";
      lastNameEl.value = "";
      emailEl.value = "";
      companyTypeEl.value = "";
      timeLineEl.value = "";
      phoneEl.value = "";
      companyEl.value = "";
      commentEl.value = "";
      axios
        .post(baseUrlContact + "rfq/newrfq", dataInputs)
        // .post(bslocalbk + 'rfq/newrfq', dataInputs)
        .then(function (response) {
          /*  notifier.modal("<center>Data sent successfully</center>");
          setTimeout(() => {
            document.getElementById("awn-popup-wrapper").style.display = "none";
          }, 1000); */
        })
        .catch(function (error) {
          notifier.modal("<center>Error</center>");
        });
    } else if (rfqDataValidation) {
      notifier.alert("Review Input Fields", { durations: { alert: 0 } });
    }
  }

  return (
    <div>
      <div className="ContactFormComp">
        <h1 className="contactTitle">Contact Information</h1>
        <div className="Contact">
          <div className="firstChild">
            <p>
              Please enter your contact details, and we will provide you with a
              quotation for pricing and delivery within 24 to 48 hours in most
              cases. <br />
              <br /> If you have any target pricing, certification levels, or
              any other information that would be helpful to us in providing you
              a quote, please use the comments & instructions section of our
              submission form.
              <br />
              <br /> Every opportunity to quote our clients is valued by our
              team. Please alert us of the urgency and timeline of your intent
              to purchase, so that we may prioritize your request accordingly.
              <br />
              <br />
              <br /> Your sales representative will contact you if we need any
              other information. <br />
              <br />
              Thank you for the opportunity!
            </p>
          </div>
          <form onSubmit={(e) => sendRfqData(e)} style={{ width: "100%" }}>
            <div className="lastChild">
              <div className="contentInputs">
                <span>FIRST NAME *</span>
                <input
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Please Enter Your First Name")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  type="text"
                  required
                  id="firstNameInput"
                />
              </div>
              <div className="contentInputs">
                <span>LAST NAME *</span>
                <input
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Please Enter Your Last Name")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  type="text"
                  required
                  id="lastNameInput"
                />
              </div>
              <div className="contentInputs">
                <span>EMAIL *</span>
                <input
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Please Enter Your Email")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  type="email"
                  required
                  id="emailInput"
                  value={_rfqInfo.rfqAdress}
                />
              </div>
              <div className="contentInputs">
                <span>COMPANY TYPE *</span>
                <select required id="companyTypeinput">
                  <option value="" disabled selected>
                    Select
                  </option>

                  <optgroup label="Manufacturer">
                    <option value="OEM (US)">OEM (US)</option>
                    <option value="Contract Manufacturer (US)">
                      Contract Manufacturer (US)
                    </option>
                    <option value="Foreign Manufacturer">
                      Foreign Manufacturer
                    </option>
                  </optgroup>
                  <option value="US Military">US Military</option>
                  <optgroup label="Government">
                    <option value="U.S. Federal Government">
                      U.S. Federal Government
                    </option>
                    <option value="U.S State & Local Government">
                      U.S State & Local Government
                    </option>
                    <option value="Foreign Government">
                      Foreign Government
                    </option>
                  </optgroup>
                  <optgroup label="Service">
                    <option value="Service Organization (MRO)">
                      Service Organization (MRO)
                    </option>
                    <option value="Service Provider">Service Provider</option>
                    <option value="Professional Organization">
                      Professional Organization
                    </option>
                    <option value="Commercial Airline">
                      Commercial Airline
                    </option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="Bank or College">Bank or College</option>
                    <option value="Retail Establishment">
                      Retail Establishment
                    </option>
                  </optgroup>
                </select>
              </div>
              <div className="contentInputs">
                <span>TIMELINE *</span>
                <select required id="timelineInput">
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="Immediate Purchase">Immediate Purchase</option>
                  <option value="1-2 Weeks">1-2 Weeks</option>
                  <option value="3 weeks+">3 weeks+</option>
                  <option value="Bid">Bid</option>
                </select>
              </div>
              <div className="contentInputs">
                <span>PHONE *</span>
                <PhoneInput
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  value={prefixPhone}
                  onChange={setPrefixPhone}
                />
                {/* <span>PHONE *</span>
                <input onInvalid={(e) =>
                    e.target.setCustomValidity('Please Enter your phone number')
                  }
                  onInput={(e) => e.target.setCustomValidity('')} required type='tel' id='phoneInput' /> */}
              </div>
              <div className="contentInputs2">
                <span>COMPANY *</span>
                <input
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Please Enter Your Company Name")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  type="text"
                  required
                  id="companyInput"
                />
              </div>
              <div className="contentInputs3">
                <span>ADDITIONAL COMMENTS AND INSTRUCTION</span>
                <textarea type="text" id="commentsInput" />
              </div>
              <button
                type="submit"
                className="Submit"
                onClick={(e) => sendRfqData(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
