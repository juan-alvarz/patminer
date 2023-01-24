import React, {useEffect} from "react";
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Search from "@material-ui/icons/Search";
import Delete from "@material-ui/icons/Delete";
import Create from "@material-ui/icons/Create";

import styles from "assets/jss/material-dashboard-react/views/partsDetailStyle.js";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, MenuItem, Select, TableCell, TableContainer, TableFooter, TablePagination} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";

import Loader from "react-js-loader";
/* mport TablePaginationActions from "../../components/Table/TablePaginationActions"; */

const useStyles = makeStyles(styles);

export default function List() {
  const classes = useStyles();

    const [fsg, setFsg] = React.useState('');
    const [fsc, setFsc] = React.useState('');
    const [parts, setParts] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [loader, setLoader] = React.useState(true);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 100 },
        { id: 'niin', label: 'NIIN', minWidth: 100 },
        { id: 'fsc', label: 'FSC', minWidth: 200 },
        { id: 'actions', label: 'Actions', minWidth: 100 },
    ];

    function createData(code, name, niin, fsc) {
        return { code, name, niin, fsc };
    }

    useEffect(() => {
        const fetchParts = async () => {
            const response = await axios('http://137.184.42.55:8000/stockn/st2?searchBy',{params: {fscCode:'1030'}});
            let rows = []
            response.data.forEach(function(it){
                rows.push(createData(it.code, it.itemName.name, it.niin, it.federalSupplyClass.code + " - " + it.federalSupplyClass.title))
            });
            setLoader(false)
            setParts(rows)
        };
        fetchParts();
    }, []);

    const handleFsgChange = (event) => {
        setFsg(event.target.value);
    };

    const handleFscChange = (event) => {
        setFsc(event.target.value);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, parts.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <FormControl className={classes.formControl}>
                <InputLabel id="fsg-select-label">Federal Supply Group</InputLabel>
                <Select
                    labelId="fsg-select-label"
                    id="fsg-select"
                    value={fsg}
                    onChange={handleFsgChange}
                >
                    <MenuItem value={1030}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="fsc-select-label">Federal Supply Class</InputLabel>
                <Select
                    labelId="fsc-select-label"
                    id="fsc-select"
                    value={fsc}
                    onChange={handleFscChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
            <div className={classes.searchWrapper}>
                <CustomInput
                    formControlProps={{
                        className: classes.margin + " " + classes.search,
                    }}
                    inputProps={{
                        placeholder: "Search",
                        inputProps: {
                            "aria-label": "Search",
                        },
                    }}
                />
                <Button color="white" aria-label="edit" justIcon round>
                    <Search />
                </Button>
            </div>
            </FormControl>
        </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info" className={classes.customHeader}>
            <h4 className={classes.cardTitleWhite}>Parts</h4>
          </CardHeader>
          <CardBody>
              <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="custom pagination table">
                      <TableHead>
                          <TableRow>
                              {columns.map((column) => (
                                  <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{ minWidth: column.minWidth }}
                                  >
                                      {column.label}
                                  </TableCell>
                              ))}
                          </TableRow>
                      </TableHead>
                      {loader === true ?
                          <Loader type="spinner-default" bgColor={"#00ACC2"} color={'#00ACC2'} size={75} />
                          :
                          <TableBody>
                              {(rowsPerPage > 0
                                      ? parts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                      : parts
                              ).map((row) => (
                                  <TableRow key={row.code}>
                                      <TableCell>
                                          {row.name}
                                      </TableCell>
                                      <TableCell>
                                          {row.niin}
                                      </TableCell>
                                      <TableCell>
                                          {row.fsc}
                                      </TableCell>
                                      <TableCell className={classes.tableCell} key={99}>
                                          <a href={"/admin/form/" + row.code}><Create className={classes.infoTableHeader}/></a>
                                          <Delete className={classes.dangerTableHeader}/>
                                      </TableCell>
                                  </TableRow>
                              ))}

                              {emptyRows > 0 && (
                                  <TableRow style={{ height: 53 * emptyRows }}>
                                      <TableCell colSpan={6} />
                                  </TableRow>
                              )}
                          </TableBody>
                      }
                      <TableFooter>
                          <TableRow>
                              <TablePagination
                                  rowsPerPageOptions={[5, 10, 25]}
                                  component="div"
                                  count={parts.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onChangeRowsPerPage={handleChangeRowsPerPage}
                                  onChangePage={handleChangePage}/>
                          </TableRow>
                      </TableFooter>
                  </Table>
              </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
