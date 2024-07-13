import React, { useState, useEffect } from 'react';
import { getAllStudent, removeAStudent } from "../actions/user_action";
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Box, Container, Button, IconButton, useTheme, useMediaQuery,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AllStudent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(getAllStudent());
  }, [dispatch]);

  const { students } = useSelector(state => state.getAllStudentReducer);
  const filterStudent = students && students.filter(item => !item.isAdmin);

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedStudent) {
      dispatch(removeAStudent(selectedStudent._id));
      setDeleteConfirm(false);
    }
  };

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
            height: '940px',
            marginTop:'60px',
            marginLeft: 0
            }}
        >
            <Sidebar />
        </Box>
        <Container maxWidth="lg" sx={{ mt: 10, mb: 4, ml: isMobile ? 0 : '240px' }}>
            <Typography variant="h4" gutterBottom align="center">
            Manage Students
            </Typography>
            <TableContainer component={Paper} elevation={3}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Serial No.</TableCell>
                    <TableCell>Name</TableCell>
                    {!isMobile && <TableCell>Enrollment No</TableCell>}
                    {!isMobile && <TableCell>Branch</TableCell>}
                    {!isMobile && <TableCell>Join Year</TableCell>}
                    <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {filterStudent && filterStudent.map((student, index) => (
                    <TableRow key={student._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    {!isMobile && <TableCell>{student.roll_no}</TableCell>}
                    {!isMobile && <TableCell>{student.branch}</TableCell>}
                    {!isMobile && <TableCell>{student.addmission_year}</TableCell>}
                    <TableCell>
                        <IconButton color="error" onClick={() => handleDeleteClick(student)}>
                        <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Container>

        <Dialog
            open={deleteConfirm}
            onClose={() => setDeleteConfirm(false)}
        >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you want to remove this student?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setDeleteConfirm(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
                Delete
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
  );
};

export default AllStudent;