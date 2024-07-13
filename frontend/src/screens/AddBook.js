import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addOneBook } from "../actions/book_action";
import {
  Snackbar,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publisher_id, setPublisherId] = useState("");
  const [year, setYear] = useState("");
  const [copies, setCopies] = useState("");
  const [genre, setGenre] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDesciption] = useState("");
  const [vendor, setVendor] = useState("");
  const [vendor_id, setVendorId] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const PostData = () => {
    const book = { title, author, publisher, copies, department, genre, description, vendor, vendor_id, publisher_id };
    dispatch(addOneBook(book));
    setShow(true);
    setTitle("");
    setAuthor("");
    setPublisher("");
    setCopies("");
    setYear("");
  };

  const handleClose = () => setShow(false);

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
          <Card sx={{ maxWidth: 800, mx: 'auto', p: 3, boxShadow: 3 }}>
            <CardContent>
              <Snackbar open={show} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  One Book Added
                </MuiAlert>
              </Snackbar>
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                Add a New Book
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Book Title"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Author Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Publisher"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPublisher(e.target.value)}
                    value={publisher}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Number of Copies"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCopies(e.target.value)}
                    value={copies}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setDepartment(e.target.value)}
                    value={department}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Genre"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setDesciption(e.target.value)}
                    value={description}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Vendor"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setVendor(e.target.value)}
                    value={vendor}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Vendor ID"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setVendorId(e.target.value)}
                    value={vendor_id}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Publisher ID"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPublisherId(e.target.value)}
                    value={publisher_id}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={PostData} fullWidth>
                    Add Book
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBook;
