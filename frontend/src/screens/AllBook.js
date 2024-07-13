import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBook, filterBook, filterValues,bookDeletedByAdmin } from "../actions/book_action";
import { getAllIssuedBook, issueABook} from "../actions/Issue_action";
import SearchIcon from '@mui/icons-material/Search';
import BookReviews from './BookReviews';
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,Card,Divider,
  TablePagination,useTheme, useMediaQuery, Modal,IconButton,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AllBook = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchKey, setSearchKey] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [department, setDepartment] = useState("");
  const [publisher, setPublisher] = useState("");
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [bookTitle, setBookTitle] = useState(null);
  const [error, setError] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false); 
  const [page, setPage] = useState(0); // State for pagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for pagination
  const [refreshBooks, setRefreshBooks] = useState(false);
  const [name,setName]=useState("");
  const [copies,setCopies]=useState();
  const [status,setStatus]=useState("");
  const [showFilters, setShowFilters] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBookTitle, setSelectedBookTitle] = useState('');

  const handleReviewClick = (bookId, bookTitle) => {
    setSelectedBookId(bookId);
    setSelectedBookTitle(bookTitle);
    setReviewModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
    setSelectedBookId(null);
    setSelectedBookTitle('');
  };

  
  useEffect(() => {
    dispatch(getAllBook());
    dispatch(filterValues());
    dispatch(getAllIssuedBook());
  }, [dispatch, show, refreshBooks]);

  const { books } = useSelector(state => state.getAllBookReducer);
  const { authors, genres, departments, publishers } = useSelector(state => state.filterValuesReducer);
  const { all_IssuedBook } = useSelector(state => state.allIssuedBookReducer);
  const userRegister = useSelector(state => state.userRegisterReducer);
  const userLogin = useSelector(state => state.userLoginReducer);
  const currentUser = userRegister?.currentUser || userLogin?.currentUser;
  console.log(all_IssuedBook);
  const userId = currentUser.user._id;
  const userBranch = currentUser.user.branch;
  const userName = currentUser.user.name;
  
  const filteredBooks = all_IssuedBook && all_IssuedBook.filter(book => book.userId === userId );
  const newBooksId = filteredBooks && filteredBooks.map(book => book.bookId);
  console.log(newBooksId)
  const postData = (book) => {
    if (newBooksId && newBooksId.includes(book._id)) {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 3000);
        return;
    }

    if (book.copies < 1) {
      console.log("No copies available");
      return;
    }

    const { title, author, publisher, _id, copies } = book;
    const issueUser = {
      title, author, publisher, userId, bookId: _id, userBranch, userName, copies
    };

    if (book.copies) {
      dispatch(issueABook(issueUser));
      setBookTitle(title);
      setShow(true);
      dispatch(getAllBook());
    } else {
      alert("book not available");
    }

    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  const handleDelete=(postId)=>{
    console.log("delete book",postId)
    dispatch(bookDeletedByAdmin(postId));
    setRefreshBooks(!refreshBooks);
  }
  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
    dispatch(filterBook(searchKey, author, genre, department, publisher));
  };

  const handleFilterClose = () => setShowFilters(false);

  const handleFilterChange =  () => {
    dispatch(filterBook(searchKey, author, genre, department, publisher));
    handleFilterClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModal = (book) => {
    console.log("show");
    setDisplay(true);
    setName(book.title);
    setAuthor(book.author);
    setCopies(book.copies);
    const mssg=book.copies > 0 ? "AVAILABLE" : "NOT AVAILABLE";
    setStatus(mssg);
  };

  const handleClose = () => setDisplay(false);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage);


  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
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
        <Typography variant="h4" gutterBottom align="center" sx={{fontSize : isMobile ? '1rem' : '1.5rem'}}>
          All Available Books in Library
        </Typography>

        <Snackbar open={show} autoHideDuration={3000} onClose={() => setShow(false)}>
          <Alert onClose={() => setShow(false)} severity="success" sx={{ width: '100%' }}>
            You successfully sent an issue request for {bookTitle}
          </Alert>
        </Snackbar>

        {error && (
          <Snackbar open={true} autoHideDuration={3000} onClose={() => setShow(false)}>
            <Alert onClose={() => setShow(false)} severity="error" sx={{ width: '100%' }}>
              You have already requested this book
            </Alert>
          </Snackbar>
        )}

        { !isMobile ? (

          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search book by Name"
                  value={searchKey}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />,
                  }}
                />
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Serial No.</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Copies</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                      <TableCell>Reviews</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : books
                      ).map((book, index)=> (
                      <TableRow key={book._id}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.copies}</TableCell>
                        <TableCell>{book.copies > 0 ? "AVAILABLE" : "NOT AVAILABLE"}</TableCell>
                        <TableCell>
                          {currentUser.user.isAdmin ? (
                            <Button onClick={()=>handleDelete(book._id)}>Delete</Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => postData(book)}
                              disabled={book.copies <= 0}
                            >
                              Issue
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleReviewClick(book._id, book.title)}
                          >
                            Reviews
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={books.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Filters</Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Author</InputLabel>
                  <Select
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    label="Author"
                  >
                    <MenuItem value=""><em>All Authors</em></MenuItem>
                    {authors.map((author, index) => (
                      <MenuItem key={index} value={author}>{author}</MenuItem>
                      
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Genre</InputLabel>
                  <Select
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                    label="Genre"
                  >
                    <MenuItem value=""><em>All Genres</em></MenuItem>
                    {genres.map((genre, index) => (
                      <MenuItem key={index} value={genre}>{genre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    label="Department"
                  >
                    <MenuItem value=""><em>All Departments</em></MenuItem>
                    {departments.map((department, index) => (
                      <MenuItem key={index} value={department}>{department}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Publisher</InputLabel>
                  <Select
                    value={publisher}
                    onChange={e => setPublisher(e.target.value)}
                    label="Publisher"
                  >
                    <MenuItem value=""><em>All Publishers</em></MenuItem>
                    {publishers.map((publisher, index) => (
                      <MenuItem key={index} value={publisher}>{publisher}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleFilterChange} fullWidth> Search </Button>
                
              </Paper>
            </Grid>
            <BookReviews 
              open={reviewModalOpen} 
              handleClose={handleReviewModalClose} 
              bookId={selectedBookId}
              bookTitle={selectedBookTitle}
            />
          </Grid>
            
          ) : (
          <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search book by Name"
                  value={searchKey}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />,
                  }}
                />
              </Box>
              <IconButton onClick={() => setShowFilters(true)} sx={{ ml: 1 }}>
                <FilterListIcon />
              </IconButton>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Serial No.</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Actions</TableCell>
                      <TableCell>Details</TableCell>
                      <TableCell>Reviews</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : books
                      ).map((book, index)=> (
                      <TableRow key={book._id}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>
                          {currentUser.user.isAdmin ? (
                            <Button onClick={()=>handleDelete(book._id)}>Delete</Button>
                          ) : (
                            <Button
                              onClick={() => postData(book)}
                              disabled={book.copies <= 0}
                              sx={{height:1.5, width:1.5}}
                            >
                              Issue
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleModal(book)} sx={{height:1.5, width:1.5}}>
                            Details
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleReviewClick(book._id, book.title)}
                          >
                            Reviews
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={books.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
            <BookReviews 
              open={reviewModalOpen} 
              handleClose={handleReviewModalClose} 
              bookId={selectedBookId}
              bookTitle={selectedBookTitle}
            />
          </Grid>
          <Modal open={display} onClose={handleClose}>
            <Card sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: isMobile ? '90%' : 400, 
                maxHeight: '90vh',
                overflowY: 'auto',
                p: 4,
                borderRadius: 2 
            }}>
                <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main }}><b>Book Details</b></Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography sx={{ mb: 1 }}><b>Book Name:{name}</b> </Typography>
                <Typography sx={{ mb: 1 }}><b>Author:{author}</b> </Typography>
                <Typography sx={{ mb: 1 }}><b>Copies:{copies}</b> </Typography>
                <Typography sx={{ mb: 1 }}><b>Status:{status}</b> </Typography>
                <Button variant="contained" color="secondary" onClick={handleClose} fullWidth>
                    Close
                </Button>
            </Card>
          </Modal>
          <Modal open={showFilters} onClose={handleFilterClose}>
            <Card sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: isMobile ? '90%' : 400, 
              maxHeight: '90vh',
              overflowY: 'auto',
              p: 4,
              borderRadius: 2 
            }}>
              <Typography variant="h6" gutterBottom>Filters</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Author</InputLabel>
                <Select
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  label="Author"
                >
                  <MenuItem value=""><em>All Authors</em></MenuItem>
                  {authors.map((author, index) => (
                    <MenuItem key={index} value={author}>{author}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Genre</InputLabel>
                <Select
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  label="Genre"
                >
                  <MenuItem value=""><em>All Genres</em></MenuItem>
                  {genres.map((genre, index) => (
                    <MenuItem key={index} value={genre}>{genre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  label="Department"
                >
                  <MenuItem value=""><em>All Departments</em></MenuItem>
                  {departments.map((department, index) => (
                    <MenuItem key={index} value={department}>{department}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Publisher</InputLabel>
                <Select
                  value={publisher}
                  onChange={e => setPublisher(e.target.value)}
                  label="Publisher"
                >
                  <MenuItem value=""><em>All Publishers</em></MenuItem>
                  {publishers.map((publisher, index) => (
                    <MenuItem key={index} value={publisher}>{publisher}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" onClick={handleFilterChange} fullWidth>
                Apply Filters
              </Button>
            </Card>
          </Modal>
          </>
          )
          
        }
            
      </Box>
    </Box>
  );
};

export default AllBook;