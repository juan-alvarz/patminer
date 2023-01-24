import React, {useEffect } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-dashboard-react/layouts/webStyle";
import Home from "./../views/Home/Home";
import Rfq from "./../views/rfq/rfq";
import Nsns from "./../views/nsns/nsns";
import FscLineCard from "./../views/fscLineCard/fscLineCard";
import ContactUs from "./../views/contactUs/contactUs";
import Grid from "./../views/PartsUpload/PartsUpload";
import SearchpartsV from "./../views/Searchparts/Searchparts";

import FilterResultClass from "./../components/fscLineCard/filterResults/filterResultClass";
import FilterResultParts from "./../components/fscLineCard/filterResults/filterResultParts";
import SearchComponent from "./../components/fscLineCard/filterResults/search";
import SearchPartsC from "./../components/fscLineCard/filterResults/Searchparts";
import Terms from "./../views/termsConditions/terms";

import Manofacturer from "./../components/manofacturer/manofacturer";
import ItemSupply from "./../components/ItemSupply/index";
// import Grid from "./../components/Grid";
import ReactGA from 'react-ga';
const TRACKING_ID = "AW-11020047735";
ReactGA.initialize(TRACKING_ID);

const useStyles = makeStyles(styles);

export default function Web() {
    // styles
    const classes = useStyles();
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA.event({ send_to: "AW-11020047735/_gIxCNuuqYEYEPeq4oYp",});
      }, []);
    return (
        <div className={classes.wrapper}>
            <div className={classes.mainPanel} >
                <Switch>
                    <Route path="/web/home" component={Home} key={0} />
                    <Route path="/web/rfq" component={Rfq} key={1} />
                    <Route path="/web/nsns" component={Nsns} key={2} />
                    <Route exact path="/web/fsg/:page" component={FscLineCard} key={3} />
                    <Route path="/web/fsg/:page/:codeFsg" component={FilterResultClass} key={4} />
                    <Route path="/web/fsgs/:codeFsg/fsc/:codeFsc/:page" component={FilterResultParts} key={5} />
                    <Route path="/web/contactUs" component={ContactUs} key={6} />
                    <Route path="/web/search/:part/:page" component={SearchComponent} key={7} />
                    <Route path="/web/manofacturer/:part" component={Manofacturer} key={8} />
                    <Route path="/web/uploadrfq" component={Grid} key={9} />
                    <Route path="/web/itemSupply/:page/:part" component={ItemSupply} key={10} />
                    <Route path="/web/search/parts/:part" component={SearchPartsC} key={11} />
                    <Route path="/web/search/parts/:part" component={SearchpartsV} key={12} />
                    <Route path="/web/terms" component={Terms} key={13} />
                    <Redirect from="/web" to="/web/home" />
                </Switch>
            </div>
        </div>
    );
}