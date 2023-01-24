import {
  whiteColor,
} from "assets/jss/material-dashboard-react.js";

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.js";
import { alpha } from "@material-ui/core/styles";

const categoryStyle = (theme) => ({
  ...dropdownStyle(theme),
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    padding: "5px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  actionButton: {
    fontSize: '20px'
  },
  searchButton: {
    [theme.breakpoints.down("md")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right",
    },
  },
  margin: {
    zIndex: "4",
    margin: "0",
  },
  // searchIcon: {
  //   width: "17px",
  //   zIndex: "4",
  // },
  searchWrapper: {
    [theme.breakpoints.down("lg")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0",
    },
    display: "inline-block",
    float: "right",
  },
  customHeader: {
    padding: "0px"
  },
  formControl: {
    minWidth: 200,
    color: "#FFFFFF",
    marginRight: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuItem: {
    fontSize: "1.4rem"
  },
  tableHeaderCell: {
    fontSize: "16px",
    color: "#8d8d8d"
  },
  tableCell: {
    fontSize: "1.2rem"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#FFFFFF",
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: "#FFFFFF",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #8d8d8d',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    color: '#8d8d8d'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8d8d8d'
  },
  inputRoot: {
    color: '#8d8d8d',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '17ch',
      '&:focus': {
        width: '25ch',
      },
    },
    color: 'black'
  },
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiTypography-root': {
      fontSize: '1.2rem',
    },
    '.MuiSelect-root':{
      fontSize: '1.1rem',
    },
    '.MuiFormLabel-root':{
      fontSize: '1.2rem',
    },
    '.MuiMenuItem-root':{
      fontSize: '1.2rem',
    },
    '.MuiTooltip-tooltip':{
      fontSize: '1.1rem',
    }
  },
});

export default categoryStyle;
