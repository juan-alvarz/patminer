import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import CardFooter from "../../components/Card/CardFooter";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function Form({match}) {
    const classes = useStyles();
    const history = useHistory();
    const [loader, setLoader] = React.useState(true);
    const [part, setPart] = React.useState();

    const routeChange = () =>{
        let path = `/admin/parts`;
        history.push(path);
    }

    useEffect(() => {
        const fetchPart = async () => {
            const response = await axios('http://137.184.42.55:8000/stockn/st2?searchBy=',{params: {code:match.params.code}});
            setLoader(false)
            setPart(response.data)
        };
        fetchPart();
    }, []);

    const handleItemNameChange = (event) => {
        part.name = event.target.value
        setPart(part);
    };

    return (
        <GridContainer>
            {part &&
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Edit Part {part.code}</h4>
                    </CardHeader>
                    <CardBody>

                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Item Name"
                                        id="item_name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            defaultValue: part.itemName.name
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="NIIN"
                                        id="niin"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            defaultValue: part.niin
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                    </CardBody>
                    <CardFooter>
                        <Button color="info" onClick={routeChange}>Update Part</Button>
                    </CardFooter>
                </Card>
            </GridItem>
            }
        </GridContainer>
    );
}
