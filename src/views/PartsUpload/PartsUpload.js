import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import HeaderUpload from "components/Grid/headerUpload/headerUpload";
import FormUpload from "components/Grid/formUpload/FormUpload";
import Button from "components/CustomButtons/Button";
import Menu from "./../../components/home/menu/menu";
import Footer from "./../../components/home/footer/footer";

import { DropzoneArea } from 'material-ui-dropzone';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  previewChip: {
    minWidth: 160,
    maxWidth: 210
  },

  form: {
    display: "flex"
  }
};

const useStyles = makeStyles(styles);

export default function PartsUpload() {
  const classes = useStyles();
  return (
    <div>
      {/* Navbar */}

        <div className='menuColor2'>
            <Menu />
        </div>
          
        <div>
          <HeaderUpload />
        </div>
      {/* Contend */}

       
      {/* Form */}
      <div >
        <FormUpload />
      </div>
    
      {/* <div className='Footer'> */}
          <Footer />
       {/* </div> */}

    </div>
  );
}
