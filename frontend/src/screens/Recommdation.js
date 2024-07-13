import {getAllBookReturnReq} from "../actions/Issue_action"
import {recomBook} from "../actions/book_action"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIssuedBook, issueABook} from "../actions/Issue_action";
import {
  Typography,
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
  Grid,Card,Divider,
  TablePagination,useTheme, useMediaQuery, Modal
} from '@mui/material';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const RecomBook = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [bookTitle, setBookTitle] = useState(null);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState();
  const [status, setStatus] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { all_IssuedBook } = useSelector(state => state.allIssuedBookReducer);
  const { returnbooks } = useSelector(state => state.getAllReturnBookReqReducer);
  const { books } = useSelector(state => state.getRecomBookReducer);
  const userRegister = useSelector(state => state.userRegisterReducer);
  const userLogin = useSelector(state => state.userLoginReducer);
  const currentUser = userRegister?.currentUser || userLogin?.currentUser;
  const userId = currentUser.user._id;
  const userBranch = currentUser.user.branch;
  const userName = currentUser.user.name;

  useEffect(() => {
      dispatch(getAllIssuedBook());
      dispatch(getAllBookReturnReq());
  }, [dispatch]);

  useEffect(() => {
      if (returnbooks.length > 0) {
          const userBooks = returnbooks.filter(book => book.userId === userId);
          const authors = Array.from(new Set(userBooks.map(book => book.author)));
          const genres = Array.from(new Set(userBooks.map(book => book.genre)));
          const departments = Array.from(new Set(userBooks.map(book => book.department)));
          dispatch(recomBook(authors, genres, departments));
      }
  }, [dispatch, returnbooks, userId]);

  const filteredBooks = all_IssuedBook.filter(book => book.userId === userId);
  const newBooksId = filteredBooks.map(book => book.bookId);
  console.log(returnbooks)
  console.log(books)
  const postData = (book) => {
      if (newBooksId.includes(book._id)) {
          setError(true);
          setTimeout(() => setError(false), 3000);
          return;
      }

      if (book.copies < 1) {
          console.log("No copies available");
          return;
      }

      const { title, author, publisher, _id, copies } = book;
      const issueUser = { title, author, publisher, userId, bookId: _id, userBranch, userName, copies };

      dispatch(issueABook(issueUser));
      setBookTitle(title);
      setShow(true);
      setTimeout(() => setShow(false), 5000);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const handleModal = (book) => {
      setDisplay(true);
      setName(book.title);
      setAuthor(book.author);
      setCopies(book.copies);
      setStatus(book.copies > 0 ? "AVAILABLE" : "NOT AVAILABLE");
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
          All Recommend Books 
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
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => postData(book)}
                              disabled={book.copies <= 0}
                            >
                              Issue
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
          </Grid>
            
          ) : (
          <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Serial No.</TableCell>
                      <TableCell>Title</TableCell>                   
                      <TableCell>Actions</TableCell>
                      <TableCell>Details</TableCell>
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
                            <Button
                              onClick={() => postData(book)}
                              disabled={book.copies <= 0}
                              sx={{height:1.5, width:1.5}}
                            >
                              Issue
                            </Button>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleModal(book)} sx={{height:1.5, width:1.5}}>
                            Details
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
          </>
          )
          
        }
            
      </Box>
    </Box>
    );
};

export default RecomBook;