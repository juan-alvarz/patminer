import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button";

import { DropzoneArea } from 'material-ui-dropzone';

import styles from "assets/jss/material-dashboard-react/views/uploaderStyle.js";
import CardHeader from "../../components/Card/CardHeader";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

const useStyles = makeStyles(styles);

export default function Uploader() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="part">
              <h2 className={classes.cardTitleWhite}>Upload NSN</h2>
            </CardHeader>
            <CardBody>
              <DropzoneArea
                  onChange={(files) => console.log('Files:', files)}
                  showPreviews={true}
                  showPreviewsInDropzone={false}
                  useChipsForPreview
                  previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                  previewChipProps={{classes: { root: classes.previewChip } }}
                  previewText="Selected files"
                  filesLimit={1}
                  acceptedFiles={["text/csv","text/plain"]}
              />
            </CardBody>
            <CardFooter>
              <Button color="part">Upload</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
