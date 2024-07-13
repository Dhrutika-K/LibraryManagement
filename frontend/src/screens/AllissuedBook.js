import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TableData from "../components/TableData";
import { getAllIssuedBook, filterallIssuedBook } from "../actions/Issue_action";

const AllIssuedBook = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllIssuedBook());
    }, [dispatch]);

    const [searchKey, setSearchKey] = useState("");
    const { all_IssuedBook } = useSelector(state => state.allIssuedBookReducer);

    const fetchDataAgain = () => {
        dispatch(getAllIssuedBook());
    };

    const handleSearch = () => {
        dispatch(filterallIssuedBook(searchKey));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Box
                    component="nav"
                    sx={{
                    width: '14%',
                    flexShrink: 0,
                    bgcolor: '#635c5b',
                    color: 'white',
                    height: 'auto',
                    marginTop:'60px',
                    marginLeft: 0
                    }}
                >
                    <Sidebar />
                </Box>
                <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Issued Books
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <TextField
                            type="text"
                            placeholder="Search book by Name"
                            variant="outlined"
                            sx={{ flex: 1, mr: 2 }}
                            onChange={(e) => setSearchKey(e.target.value)}
                            value={searchKey}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            }}
                        />
                        <Button variant="contained" color="primary" onClick={handleSearch} startIcon={<SearchIcon />}>
                            Search
                        </Button>
                        <IconButton color="primary" onClick={fetchDataAgain} sx={{ ml: 2 }}>
                            <RefreshIcon />
                        </IconButton>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, padding:'100px', }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell >Book</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Branch</TableCell>
                                    <TableCell>Issued Date</TableCell>
                                    <TableCell>Return Date</TableCell>
                                    <TableCell>Dues</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {all_IssuedBook && all_IssuedBook.map((book) => (
                                    <TableData key={book._id} book={book} fetchDataAgain={fetchDataAgain} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default AllIssuedBook;
