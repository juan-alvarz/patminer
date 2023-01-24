import React from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

export default function Logout() {

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Our Application.
                </div>
            </GridItem>
        </GridContainer>
    );
}
