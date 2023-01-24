import React, {useEffect} from "react";
import axios from 'axios'
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Create from "@material-ui/icons/Create";
import EmptySearch from '@material-ui/icons/YoutubeSearchedFor';

import styles from "assets/jss/material-dashboard-react/views/partsDetailStyle.js";
import FormControl from "@material-ui/core/FormControl";
import {
    AppBar,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";

import Loader from "react-js-loader";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditIcon from '@material-ui/icons/EditOutlined';
import SubCategoryIcon from "@material-ui/icons/SubdirectoryArrowRightOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(styles);

export default function List() {
    const classes = useStyles();
    const history = useHistory();
    const [fsg, setFsg] = React.useState('');
    const [fsc, setFsc] = React.useState('');
    const [parts, setParts] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [fclasses, setFclasses] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [totalParts, setTotalParts] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [loader, setLoader] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [keyword, setKeyword] = React.useState('');

    const columns = [
        { id: 'niin', label: 'NIIN' },
        { id: 'name', label: 'Name' },
        { id: 'fsc', label: 'FSC' },
        { id: 'actions', label: 'Actions' },
    ];

    function createData(code, niin, name, fsc) {
        return { code, niin, name, fsc };
    }

    const searchParts = async (keyword, page, size) => {
        setLoader(true)
        setSearch("byKeyword");
        const total = await axios('/api/totalSearchParts',{params: {key:keyword}});
        setTotalParts(total.data)
        const response = await axios('/api/searchParts',{params: {key:keyword, page:page, size:size}});
        let rows = []
        response.data.forEach(function(it){
            rows.push(createData(it.nsn, it.niin, it.name, it.fscCode + " - " + it.fscTitle))
        });
        setLoader(false)
        setParts(rows)
    }

    const fetchParts = async (fsc, page, size) => {
        setLoader(true)
        setSearch("byClass");
        const total = await axios('/api/totalPartsByFsc',{params: {fscCode:fsc}});
        setTotalParts(total.data)
        const response = await axios('/api/listParts',{params: {fscCode:fsc, page:page, size:size}});
        let rows = []
        response.data.forEach(function(it){
            rows.push(createData(it.code, it.niin, it.itemName.name, it.federalSupplyClass.code + " - " + it.federalSupplyClass.title))
        });
        setLoader(false)
        setParts(rows)
    };

    const fetchGroups = async () => {
        const total = await axios('/api/totalGroups');
        const response = await axios('/api/listGroups',{params: {page:0, size:total.data}});
        setGroups(response.data)
    };

    const fetchClasses = async (fsg) => {
        const total = await axios('/api/totalClassesByFsg',{params: {fsgCode: fsg}});
        const response = await axios('/api/listClassesByFsg',{params: {fsgCode: fsg, page:0, size:total.data}});
        setFclasses(response.data)
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleFsgChange = (event) => {
        setFsg(event.target.value);
        fetchClasses(event.target.value);
    };

    const handleFscChange = (event) => {
        setFsc(event.target.value);
        setPage(0);
        fetchParts(event.target.value, 0, rowsPerPage);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalParts - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        if(search === 'byClass'){
            fetchParts(fsc, newPage, rowsPerPage);
        }else{
            searchParts(keyword, newPage, rowsPerPage)
        }
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchParts = (event) => {
        setKeyword(document.getElementById('searchInput').value);
        setPage(0);
        searchParts(document.getElementById('searchInput').value, 0, rowsPerPage);
    };

    const goToEdit = (code) => {
        history.push("/admin/form/" + code);
    }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="part" className={classes.customHeader}>
              <h2 className={classes.cardTitleWhite}>NSN List</h2>
          </CardHeader>
          <CardBody>
              <AppBar position="static" style={{ backgroundColor:"#FDFDFD"}} className={classes.cardTitleWhite}>
                  <Toolbar>
                      <FormControl className={classes.formControl}>
                          <InputLabel id="fsg-select-label" >Federal Supply Group</InputLabel>
                          <Select
                              labelId="fsg-select-label"
                              id="fsg-select"
                              value={fsg}
                              onChange={handleFsgChange}
                          >
                              {groups.map((group) => (
                                  <MenuItem value={group.code}>{group.title}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                      <FormControl className={classes.formControl} >
                          <InputLabel id="fsc-select-label">Federal Supply Class</InputLabel>
                          <Select
                              labelId="fsc-select-label"
                              id="fsc-select"
                              value={fsc}
                              onChange={handleFscChange}
                          >
                              {fclasses.map((fclass) => (
                                  <MenuItem value={fclass.code}>{fclass.title}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                      <div style={{flexGrow: 1}}></div>
                      <div className={classes.search}>
                          <InputBase
                              placeholder="Search…"
                              classes={{
                                  root: classes.inputRoot,
                                  input: classes.inputInput,
                              }}
                              inputProps={{ 'aria-label': 'search', 'id': 'searchInput' }}
                          />
                      </div>
                      <IconButton onClick={handleSearchParts} style={{marginLeft:'5px'}}><SearchIcon /></IconButton>
                  </Toolbar>
              </AppBar>
              <TableContainer component={Paper}>
                  {loader === true ?
                      <Loader type="spinner-default" bgColor={"#00ACC2"} color={'#00ACC2'} size={75} />
                      :
                      <Table className={classes.table} aria-label="parts table">
                          <TableHead>
                              <TableRow>
                                  {columns.map((column) => (
                                      <TableCell key={column.id} align={column.align} className={classes.tableHeaderCell} >
                                          {column.label}
                                      </TableCell>
                                  ))}
                              </TableRow>
                          </TableHead>

                          <TableBody>
                              {(parts
                              ).map((row) => (
                                  <TableRow key={row.code}>
                                      <TableCell className={classes.tableCell}>
                                          {row.niin}
                                      </TableCell>
                                      <TableCell className={classes.tableCell}>
                                          {row.name}
                                      </TableCell>
                                      <TableCell className={classes.tableCell}>
                                          {row.fsc}
                                      </TableCell>
                                      <TableCell className={classes.tableCell} key={99}>
                                          <Tooltip title="Edit NSN" placement="top">
                                              <IconButton onClick={() => goToEdit(row.code)}><EditIcon className={classes.actionButton}/></IconButton>
                                          </Tooltip>
                                          <Tooltip title="Delete NSN" placement="top">
                                              <IconButton><DeleteIcon className={classes.actionButton}/></IconButton>
                                          </Tooltip>
                                      </TableCell>
                                  </TableRow>
                              ))}

                              {emptyRows > 0 && (
                                  <TableRow style={{ height: 40 * emptyRows }}>
                                      <TableCell colSpan={4} >
                                          {parts.length === 0 && (
                                          <div style={{ width:"100%", textAlign:"center"}}>
                                              <EmptySearch style={{ fontSize:"200px", color:"#b5b5b5"}}/>
                                              <h1 style={{ color:"#b5b5b5"}}>No parts found</h1>
                                              <p style={{ fontSize:"12px", color:"#b5b5b5"}}>Please choose a Federal Supply Group and then a Federal Supply Class or search by keyword to see the list of parts.</p>
                                          </div>
                                          )}
                                      </TableCell>
                                  </TableRow>
                              )}
                          </TableBody>

                          <TableFooter>
                              <TableRow>
                                  <TableCell colSpan={4} >
                                      <TablePagination
                                          rowsPerPageOptions={[5, 10, 25]}
                                          component="div"
                                          count={totalParts}
                                          rowsPerPage={rowsPerPage}
                                          page={page}
                                          onChangeRowsPerPage={handleChangeRowsPerPage}
                                          onChangePage={handleChangePage}
                                          />
                                  </TableCell>
                              </TableRow>
                          </TableFooter>
                    </Table>
                  }
              </TableContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
