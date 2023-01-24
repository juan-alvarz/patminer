import {
    defaultFont,
    dangerColor,
    whiteColor, grayColor, infoColor,
} from "assets/jss/material-dashboard-react.js";

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.js";
import {deepOrange,blueGrey,grey} from "@material-ui/core/colors";

const inboxStyle = (theme) => ({
    ...dropdownStyle(theme),
    root: {
        width: '100%',
    },
    boxHeader: {
        width: '100%',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    boxHeaderTitle: {
        padding: '5px 10px',
        fontSize: 35,
    },
    fillRemainingSpace: {
        flex: '1 1 auto',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    avatar: {
        marginRight: 5
    },
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    summary: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: grey[100],
    },
    heading: {
        fontSize: "14px",
        height: '100%',
        verticalAlign: 'middle',
        flexBasis: '33.33%',
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: '10px'
    },
    secondaryHeading: {
        fontSize: "14px",
    },
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
    }
});

export default inboxStyle;
