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

import styles from "assets/jss/material-dashboard-react/views/partEditStyle.js";
import CardFooter from "../../components/Card/CardFooter";
import axios from "axios";
import Loader from "react-js-loader";

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

    const fetchPart = async () => {
        setLoader(true)
        const response = await axios('/api/getPart',{params: {code:match.params.code}});
        let part = response.data;
        part.stockNumberDocObject = JSON.parse(response.data.stockNumberDoc)
        part.itemNameDocObject = JSON.parse(response.data.itemNameDoc)
        part.skus.forEach(function (sku, index) {
            sku.docObject = JSON.parse(sku.doc)
        });
        part.manufacturers.forEach(function (manufacturer, index) {
            manufacturer.docObject = JSON.parse(manufacturer.doc)
        });
        setLoader(false)
        setPart(response.data)
    };

    useEffect(() => {
        fetchPart();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/updatePart', {nsn: part.nsn, name: event.target.item_name.value})
            .then(response => console.log(response.data))
            .catch(error => console.log("We are having issues with the server. Try again later"));;
    };

    return (
        <form onSubmit={handleSubmit}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="part">
                        <h2 className={classes.cardTitleWhite}>Edit NSN</h2>
                    </CardHeader>
                    {loader === true ?
                        <Loader type="spinner-default" bgColor={"#00ACC2"} color={'#00ACC2'} size={75}/>
                        :
                        <>
                        {part &&
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <h3 style={{color:"#00ACC2", fontWeight:"bold"}}> NSN: {part.nsn}</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Item Name"
                                        id="item_name"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            defaultValue: part.name
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
                                {part.stockNumberDocObject && (
                                    <>
                                        {(Object.keys(part.stockNumberDocObject)).map((key) => (
                                            <>
                                                {(key !== 'MOE Rules' && key !== 'Packaging Data' && key !== 'Management Data') && (
                                                    <GridItem xs={12} sm={12} md={12}>

                                                        <CustomInput
                                                            labelText={key}
                                                            id={key}
                                                            formControlProps={{
                                                                fullWidth: true,
                                                            }}
                                                            inputProps={{
                                                                defaultValue: part.stockNumberDocObject[key]
                                                            }}
                                                        />
                                                    </GridItem>
                                                )}
                                            </>
                                        ))}
                                    </>
                                )}
                                {part.itemNameDocObject && (
                                    <>
                                        {(Object.keys(part.itemNameDocObject)).map((key) => (
                                            <>
                                                {(key !== 'Data Record Numbers' && key !== 'Related Item Names Codes') && (
                                                    <GridItem xs={12} sm={12} md={12}>

                                                        <CustomInput
                                                            labelText={key}
                                                            id={key}
                                                            formControlProps={{
                                                                fullWidth: true,
                                                            }}
                                                            inputProps={{
                                                                defaultValue: part.itemNameDocObject[key]
                                                            }}
                                                        />
                                                    </GridItem>
                                                )}
                                            </>
                                        ))}
                                    </>
                                )}
                            </GridContainer>

                        </CardBody>
                    }
                        </>
                    }
                    <CardFooter>
                        <Button color="part" onClick={routeChange}>Back</Button>
                        <Button color="part" type="submit">Update Part</Button>
                    </CardFooter>

                </Card>
            </GridItem>

        </GridContainer>
        </form>
    );
}
