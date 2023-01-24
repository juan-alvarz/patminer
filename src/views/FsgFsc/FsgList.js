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
import Button from "../../components/CustomButtons/Button";
import EmptySearch from '@material-ui/icons/YoutubeSearchedFor';

import styles from "assets/jss/material-dashboard-react/views/categoryStyle.js";
import {
    AppBar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    InputBase,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination, TextField
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Tooltip from '@material-ui/core/Tooltip';

import Loader from "react-js-loader";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from '@material-ui/icons/EditOutlined';
import HiddenIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibleIcon from '@material-ui/icons/VisibilityOutlined';
import SubCategoryIcon from '@material-ui/icons/SubdirectoryArrowRightOutlined';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';

const useStyles = makeStyles(styles);

export default function FsgList() {
    const classes = useStyles();
    const history = useHistory();
    const [parts, setParts] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const [fclasses, setFclasses] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [totalGroups, setTotalGroups] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [loader, setLoader] = React.useState(false);
    const [keyword, setKeyword] = React.useState('');
    const [openForm, setOpenForm] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const columns = [
        { id: 'code', label: 'Code', align: "center"},
        { id: 'name', label: 'Name', align: "left" },
        { id: 'actions', label: 'Actions', align: "center" },
    ];

    function createData(code, name, hidden) {
        return { code, name, hidden };
    }

    const searchGroups = async (keyword, page, size) => {
        setLoader(true)
        setLoader(false)
    }

    const fetchGroups = async (page, size) => {
        const total = await axios('/api/totalGroups');
        setTotalGroups(total.data)
        const response = await axios('/api/listGroups',{params: {page:page, size:size}});
        let rows = []
        response.data.forEach(function(it){
            rows.push(createData(it.code, it.title, it.hidden))
        });
        setLoader(false)
        setGroups(rows)
    };

    const fetchClasses = async (fsg) => {
        const total = await axios('/api/totalClassesByFsg',{params: {fsgCode: fsg}});
        const response = await axios('/api/listClassesByFsg',{params: {fsgCode: fsg, page:0, size:total.data}});
        setFclasses(response.data)
    };

    useEffect(() => {
        fetchGroups(0, rowsPerPage);
    }, []);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalGroups - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        fetchGroups(newPage, rowsPerPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchParts = (event) => {
        setKeyword(document.getElementById('searchInput').value);
        setPage(0);
        fetchGroups(document.getElementById('searchInput').value, 0, rowsPerPage);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const goToFscList = (code) => {
        history.push("/admin/fscList/" + code);
    }

    const hideFsg = async (code) => {
        const response = await axios.post('/api/hideShowFsg',{code:code, flag:true})
        .catch(error => console.log("We are having issues with the server. Try again later"));;
        fetchGroups(page, rowsPerPage);
    }

    const showFsg = async (code) => {
        const response = await axios.post('/api/hideShowFsg',{code:code, flag:false})
        .catch(error => console.log("We are having issues with the server. Try again later"));;
        fetchGroups(page, rowsPerPage);
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="part" className={classes.customHeader}>
                        <h2 className={classes.cardTitleWhite}>Federal Supply Group List</h2>
                    </CardHeader>
                    <CardBody>
                        <AppBar position="static" style={{ backgroundColor:"#FDFDFD"}} className={classes.cardTitleWhite}>
                            <Toolbar>
                                <div style={{flexGrow: 1}}></div>
                                <Button variant="outlined" style={{backgroundColor: "white", color:"gray", border:"1px solid gray"}} onClick={handleClickOpenForm}>Add FSG</Button>
                            </Toolbar>
                        </AppBar>
                        <Dialog open={openForm} onClose={handleCloseForm} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title"><h3>Add Federal Supply Group</h3></DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To add a Federal Supply Group, please enter the code and the name here.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="code"
                                    label="Code"
                                    type="number"
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseForm} color="part">
                                    Cancel
                                </Button>
                                <Button onClick={handleCloseForm} color="part">
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this FSG?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Deleting this FSG means that the users can't see this FSG and related FSCs and NSNs anymore.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="part">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="part" autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
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
                                        {(groups
                                        ).map((row) => (
                                            <TableRow key={row.code}>
                                                <TableCell align={'center'} className={classes.tableCell}>
                                                    {row.code}
                                                </TableCell>
                                                <TableCell align={'left'} className={classes.tableCell}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell className={classes.tableCell} align={'center'} key={99}>
                                                    <Tooltip title="Edit FSG" placement="top">
                                                        <IconButton onClick={handleClickOpenForm}><EditIcon className={classes.actionButton}/></IconButton>
                                                    </Tooltip>
                                                    {row.hidden === false ?
                                                        <Tooltip title="Hide FSG" placement="top">
                                                            <IconButton onClick={() => hideFsg(row.code)}><VisibleIcon className={classes.actionButton}/></IconButton>
                                                        </Tooltip>
                                                    :
                                                        <Tooltip title="Show FSG" placement="top">
                                                            <IconButton onClick={() => showFsg(row.code)}><HiddenIcon className={classes.actionButton}/></IconButton>
                                                        </Tooltip>
                                                    }
                                                    <Tooltip title="See Federal Supply Classes" placement="top">
                                                        <IconButton onClick={() => goToFscList(row.code)}><SubCategoryIcon className={classes.actionButton}/></IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete FSG" placement="top">
                                                        <IconButton onClick={handleClickOpen}><DeleteIcon className={classes.actionButton}/></IconButton>
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
                                                            <h1 style={{ color:"#b5b5b5"}}>No groups found</h1>
                                                            <p style={{ fontSize:"12px", color:"#b5b5b5"}}>Add Federal Supply Groups with the + button.</p>
                                                        </div>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>

                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={3} >
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25]}
                                                    component="div"
                                                    count={totalGroups}
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