import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import Button from "components/CustomButtons/Button";


import AuthenticationService from '../AuthenticationService';

import styles from "assets/jss/material-dashboard-react/views/loginStyle.js";

const useStyles = makeStyles(styles);

export default function Login({history}) {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const handleLogin = () => {
        AuthenticationService
            .executeBasicAuthenticationService(username, password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(username, password)
                history.push(`/admin`)
            }).catch(() => {
            setShowSuccessMessage(false)
            setHasLoginFailed(true)
        })
    };

    return (
        <div className="loginContainer">
        <GridContainer>
            <GridItem xs={4} sm={4} md={4}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Login</h4>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <div className="container">
                                {hasLoginFailed && <div color="danger">Invalid Credentials</div>}
                                {showSuccessMessage && <div>Login Sucessful</div>}
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="my-input">Username:</InputLabel>
                                    <Input
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={username}
                                        color="info"
                                        onChange={handleUsernameChange}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="my-input">Password</InputLabel>
                                    <Input
                                        fullWidth={true}
                                        id={"password"}
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </FormControl>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button color="info" onClick={handleLogin}>Login</Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
        </div>
    );
}
