/* eslint-disable no-unused-vars */
import React from 'react';
import './../contacUpload.css';
import axios from 'axios';
import AWN from 'awesome-notifications';
import { baseUrlContact } from '../../httpBaseUrl.js';
import { bslocalbk  } from '../../httpBaseUrl.js';
import UploadIcon from '../../../assets/img/UploadIcon.svg';

const FormUpload = () => {
  var glData = '';

  // email
  // if (localStorage.getItem("rfqInfo") === null || localStorage.getItem("rfqInfo") === "undefined") {
  //     localStorage.setItem("rfqInfo", JSON.stringify("rfqInfo"));
  // } else {
  //     var _rfqInfo = JSON.parse(localStorage.getItem("rfqInfo"));
  // }
  //   console.log("rfqInfo", _rfqInfo);


  let globalOptions = {
    positio: 'bottom- right',
    maxNotifications: 10,
    animationDuration: 200,
    durations: 100,
  };
  let notifier = new AWN(globalOptions);

  function onChange(e) {
    e.preventDefault();
    // let formData = new FormData()
    let files = e.target.files;
    // console.log('files: ',files)
    let reader = new FileReader();
    //[".xls", ".xlsx", ".csv", ".txt", ".pdf", ".doc", ".docx"]
    let nameFile = files[0].name;

    if(["xls", "xlsx", "csv", "txt", "pdf", "doc", "docx"].indexOf(nameFile.split(".")[1])>=0){
      document.getElementById("name-file-upload").innerHTML = nameFile;

      reader.readAsDataURL(files[0]);

      reader.onload = (e) => {
        glData = e.target.result;
      };
    }else{
      alert("Error. The file must be in either .XLS, .XLSX, .CSV, .TXT, .PDF, .DOC, or .DOCX, please check.");
    }
  }
  //--Phonemask
  setTimeout(() => {
    const phoneEl = document.getElementById('phoneInput');
    phoneEl.addEventListener('keypress', (e) => {
      if (e.keyCode != 9 && e.keyCode != 16) {
        let num = phoneEl.value.replace(/\D/g, '');
        phoneEl.value =
          num.substring(0, 3) +
          '-' +
          num.substring(3, 6) +
          '-' +
          num.substring(6, 9);
        if (phoneEl.value == '--') {
          phoneEl.value = '';
        }
      }
    });
  }, 2000);

  function sendContactForm(e) {
    var upl = glData;
    // console.log('glData: ',glData);

    const firstNameEl = document.getElementById('inputContactFirstName');
    const lastNameEl = document.getElementById('inputContactLastName');
    const emailEl = document.getElementById('inputContactEmail');
    const companyTypeEl = document.getElementById('inputContactCompanyType');
    const timeLineEl = document.getElementById('inputContactTimeline');
    const phoneEl = document.getElementById('phoneInput');
    const companyEl = document.getElementById('inputContactCompany');
    const commentEl = document.getElementById('inputContactComments');

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
      if (inputEl.value == '') {
        inputEl.classList.add('invalid');
      } else {
        inputEl.classList.remove('invalid');
      }
    });

    //Regex Validations
    const phoneRegex = /^\d{3}-?\d{3}-?\d{4}$/;
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;


    const valPhone = phoneRegex.test(phoneEl.value) ? true : false;
    if (valPhone == false) {
      phoneEl.classList.add('invalid');
    }
    

    const valEmail = emailRegex.test(emailEl.value) ? true : false;
    if (valEmail == false) {
      emailEl.classList.add('invalid');
    }

    const invalidExist = document.getElementsByClassName('invalid').length > 0;

    let contactForm = {
      first_name: firstNameEl.value,
      last_name: lastNameEl.value,
      email: emailEl.value,
      company_type: companyTypeEl.value,
      time_line: timeLineEl.value,
      phone: phoneEl.value,
      company: companyEl.value,
      comments: commentEl.value,
      uploadRFQ: upl,
    };

    if (!invalidExist) {
      e.preventDefault();
      axios
        // .post(baseUrlContact + 'rfq/uploadrfq', contactForm)
        .post(baseUrlContact + 'rfq/uploadrfq', contactForm)
        .then(function (response) {
          notifier.success('Request sent successfully', {
            durations: { success: 0 },
          });
            firstNameEl.value = ''
            lastNameEl.value = ''
            emailEl.value = ''
            companyTypeEl.value = ''
            timeLineEl.value = ''
            phoneEl.value = ''
            companyEl.value = ''
            commentEl.value = ''
        })
        .catch(function (error) {
          notifier.modal('<center>Error</center>');
        });
    } else {
      notifier.alert('Review Input Fields', { durations: { alert: 0 } });
    }
  }

  return (
    <div className='container'>
      <div className='row myrow'>
        <div className='col-md-3'>
          <div className='form-group myInput'>
            <label htmlFor='inputFile'>
              <img src={UploadIcon} alt='UploadIcon' />
              <span>Upload file</span>
              <input
                type='file'
                name='file'
                required
                id='inputFile'
                accept=".xls, .xlsx, .csv, .txt, .pdf, .doc, .docx"
                onChange={(e) => onChange(e)}
              />
            </label>
          </div>
          <div className='form-group mt-2'>
            <h6 id="name-file-upload"></h6>
            <h2>FAQ - Upload File </h2>
            <h3> Can I submit a file in any format?</h3>

            <p>
              The file must be in either .XLS, .XLSX, .CSV, .TXT, .PDF, .DOC, or
              .DOCX format Are there any file size limitations?
            </p>

            <p>
              All uploaded files must be less than 5MB in size. If your file
              exceeds this limit, feel free to contact us at info@part-miner.com
              and we will be more than happy to assist you.
            </p>
          </div>
        </div>

        <div class='col-md-9'>
          <div className='MyContactForm' style={{ width: '100%' }}>
            <div className='Contact'>
              <form onSubmit={(e) => sendContactForm(e)}>
                <div className='lastChild'>
                  <div className='contentInputs'>
                    <span>FIRST NAME *</span>
                    <input
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          'Please Enter Your First Name'
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity('')}
                      type='text'
                      required
                      id='inputContactFirstName'
                    />
                  </div>
                  <div className='contentInputs'>
                    <span>LAST NAME *</span>
                    <input
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          'Please Enter Your Last Name'
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity('')}
                      type='text'
                      required
                      id='inputContactLastName'
                    />
                  </div>
                  <div className='contentInputs'>
                    <span>EMAIL *</span>
                    <input
                      onInvalid={(e) =>
                        e.target.setCustomValidity('Please Enter Your Email')
                      }
                      onInput={(e) => e.target.setCustomValidity('')}
                      type='text'
                      required
                      id='inputContactEmail'
                    />
                  </div>
                  <div className='contentInputs'>
                    <span>COMPANY TYPE *</span>
                    <select required id='inputContactCompanyType'>
                      <option value='' disabled selected>
                        Select
                      </option>

                      <optgroup label='Manufacturer'>
                        <option value='OEM (US)'>OEM (US)</option>
                        <option value='Contract Manufacturer (US)'>
                          Contract Manufacturer (US)
                        </option>
                        <option value='Foreign Manufacturer'>
                          Foreign Manufacturer
                        </option>
                      </optgroup>
                      <option value='US Military'>US Military</option>
                      <optgroup label='Government'>
                        <option value='U.S. Federal Government'>
                          U.S. Federal Government
                        </option>
                        <option value='U.S State & Local Government'>
                          U.S State & Local Government
                        </option>
                        <option value='Foreign Government'>
                          Foreign Government
                        </option>
                      </optgroup>
                      <optgroup label='Service'>
                        <option value='Service Organization (MRO)'>
                          Service Organization (MRO)
                        </option>
                        <option value='Service Provider'>
                          Service Provider
                        </option>
                        <option value='Professional Organization'>
                          Professional Organization
                        </option>
                        <option value='Commercial Airline'>
                          Commercial Airline
                        </option>
                      </optgroup>
                      <optgroup label='Other'>
                        <option value='Bank or College'>Bank or College</option>
                        <option value='Retail Establishment'>
                          Retail Establishment
                        </option>
                      </optgroup>
                    </select>
                  </div>
                  <div className='contentInputs'>
                    <span>TIMELINE *</span>
                    <select required id='inputContactTimeline'>
                      <option value='' disabled selected>
                        Select
                      </option>
                      <option value='Immediate Purchase'>
                        Immediate Purchase
                      </option>
                      <option value='1-2 Weeks'>1-2 Weeks</option>
                      <option value='3 weeks+'>3 weeks+</option>
                      <option value='Bid'>Bid</option>
                    </select>
                  </div>
                  <div className='contentInputs'>
                    <span>PHONE *</span>
                    <input onInvalid={(e) =>
                    e.target.setCustomValidity('Please Enter your phone number')
                  }
                  onInput={(e) => e.target.setCustomValidity('')} required type='tel' id='phoneInput' />
                  </div>
                  <div className='contentInputs2'>
                    <span>COMPANY *</span>
                    <input
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          'Please Enter Your Company Name'
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity('')}
                      type='text'
                      required
                      id='inputContactCompany'
                    />
                  </div>
                  <div className='contentInputs3'>
                    <span>ADDITIONAL COMMENTS AND INSTRUCTION</span>
                    <textarea type='text' required id='inputContactComments' />
                  </div>
                  <div className='Submit' onClick={(e) => sendContactForm(e)}>
                    Submit
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUpload;
