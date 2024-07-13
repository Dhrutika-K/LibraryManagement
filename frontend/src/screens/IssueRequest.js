import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookIssueReq, issuedReq, issuedReqDeletedByAdmin } from "../actions/Issue_action";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  IconButton 
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const IssueRequest = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllBookIssueReq());
  }, [dispatch]);
  
  const { issuebooks } = useSelector(state => state.getAllIssueBookReqReducer);
  const newIssuedBook = issuebooks?.filter(item => !item.isIssue && !item.isRecom);

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
          height: '940px',
          marginTop:'60px',
          marginLeft: 0
        }}
      >
        <Sidebar />
      </Box>
        <Box sx={{ flexGrow: 1, p: 3, mt: { xs: 2, sm: 8 }, width: { xs: '100%', sm: '86%' } }}>
          <Typography variant="h4" align="center" gutterBottom>
            Student Requested to Admin to Issue These Books
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Student Branch</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newIssuedBook?.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.userName}</TableCell>
                    <TableCell>{book.userBranch}</TableCell>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item>
                          <IconButton 
                            color="success" 
                            onClick={() => dispatch(issuedReq(book._id, book.bookId))}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton 
                            color="error" 
                            onClick={() => dispatch(issuedReqDeletedByAdmin(book._id))}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default IssueRequest;
