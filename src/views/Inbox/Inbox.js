import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from '@material-ui/core/colors';
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {
  Avatar,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary, Paper,
  Typography
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardHeader from "../../components/Card/CardHeader";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";

const styles = (theme) => ({
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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    height: '100%',
    verticalAlign: 'middle',
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: '10px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
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

const useStyles = makeStyles(styles);

export default function Inbox() {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const items = [
    {id: 1, avatar: 'User1', from: 'Andres Hernandez', subject: 'testing subject', content: 'testing content'},
    {id: 2, avatar: 'User2', from: 'Carolina Ocana', subject: 'testing subject', content: 'testing content'},
    {id: 3, avatar: 'User3', from: 'Michael Scott', subject: 'testing subject', content: 'testing content'},
    {id: 4, avatar: 'User4', from: 'Jim Halpert', subject: 'testing subject', content: 'testing content'},
    {id: 5, avatar: 'User5', from: 'Pam Beesly', subject: 'testing subject', content: 'testing content'}
  ];

  return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Inbox</h4>
              </CardHeader>
              <CardBody>
                <Paper className={classes.root}>
                  <div className={classes.boxHeader}>
                    <span className={classes.fillRemainingSpace}/>
                    <Button>Mark All As Read</Button>
                    <Button>Delete all</Button>
                  </div>
                  {items.map((item) =>
                      <Accordion key={item.id} expanded={expanded === item.id} onChange={handleChange(item.id)} >
                      <AccordionSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
                        <Avatar variant="square" className={classes.square} src={item.avatar} />
                        <Typography className={classes.heading}>{item.from}</Typography>
                        <Typography className={classes.secondaryHeading}>{item.subject}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {item.content}
                        </Typography>
                      </AccordionDetails>
                      <Divider />
                      <AccordionActions>
                        <Button size="small">Cancel</Button>
                        <Button size="small" color="primary">Delete</Button>
                      </AccordionActions>
                    </Accordion>
                  )}
                </Paper>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
  );
}
