/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <div>
              <ListItem className={classes.inlineBlock}>
                <a href="#dashboard" className={classes.block}>
                  Dashboard
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="#parts" className={classes.block}>
                  Parts
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="#inbox" className={classes.block}>
                  Inbox
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="#glossary" className={classes.block}>
                  Glossary
                </a>
              </ListItem>
            </div>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            PartMiner Industries. All Rights Reserved.
          </span>
        </p>
      </div>
    </footer>
  );
}
