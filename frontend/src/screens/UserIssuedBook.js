import React, { useEffect, useState } from 'react';
import { getUserIssuedBook, singleissueABook, issueABookReturn } from "../actions/Issue_action";
import { useDispatch, useSelector } from 'react-redux';
import { 
  Modal, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, 
  Box, Container, Grid, Card, CardContent, CardActions, Divider, useTheme, useMediaQuery,
  IconButton, Tooltip,Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Moment from 'react-moment';
import moment from 'moment';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const UserIssuedBook = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [show, setShow] = useState(false);
    const [error,setError] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [date, setDate] = useState(null);
    const [dateFrom, setDateFrom] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [mssg, setMssg] = useState("");
    const handleClose = () => setShow(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { userIssuedBook } = useSelector(state => state.userIssuedBookReducer);
    const { singleIsBook } = useSelector(state => state.singleIssuedBookReducer);

    const issuedBook = userIssuedBook && userIssuedBook.filter(item => item.isIssue);

    useEffect(() => {
        dispatch(getUserIssuedBook());
    }, [dispatch, refresh]);

    const handleModal = (postId, cDate) => {
        setDate(cDate);
        const result = new Date(cDate);
        result.setDate(result.getDate() + 7);
        setDateFrom(result);
        setShow(true);
        dispatch(singleissueABook(postId));
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const hanndleReqandReturn = async(book,date) => {
        const today=new Date().getDate();
        const result = new Date(date);
        const end=result.getDate() + 7;
        var amount=0;
        if(today>end)
            amount=(today-end-1)*15;
        console.log(amount)
        if(amount>0){
            var options = {
                key: "rzp_test_1yjL3ej0hbRyeh",
                key_secret: "oesZquD2xvq24P8hQBxiovjo",
                amount: parseInt(amount) * 100,
                currency: "INR",
                name: "Web Mastery",
                description: "for testing purpose",
                handler: async function (response) {
                    const paymentId = response.razorpay_payment_id;
                    console.log("paymant id", paymentId);
                    if (response.razorpay_payment_id) {
                        console.log("Payment successful. Payment ID:", response.razorpay_payment_id);
                        dispatch(issueABookReturn(book.bookId));
                        setRefresh(!refresh);
                        setSnackbarOpen(true);
                        setMssg("The book has been returned")
                    } else {
                        console.log("Payment failed");
                        setSnackbarOpen(true);
                        setMssg("The payment failed so book is not returned");
                        setError(true);
                    }
                },
                theme: {
                  color: "#07a291db",
                },
            };
            var pay = new window.Razorpay(options);
            pay.open();
            
        }
        else{
            console.log("returned")
            dispatch(issueABookReturn(book.bookId));
            setRefresh(!refresh);
            setSnackbarOpen(true);
            setMssg("The book has been returned")
        }
    };

    let dayDiff;
    if (date) {
        const today = moment(new Date());
        const end = moment(dateFrom);
        const duration = moment.duration(today.diff(end));
        dayDiff = duration.asDays();
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.grey[100] }}>
            <Navbar />
            <Box
                component="nav"
                sx={{
                    width: '14%',
                    flexShrink: 0,
                    bgcolor: '#635c5b',
                    color: 'white',
                    height: '940px',
                    position: 'fixed',
                    left: 0,
                    top: 64,
                }}
            >
                <Sidebar />
            </Box>
            <Container maxWidth="lg" sx={{ mt: 10, mb: 4, ml: isMobile ? '100px' : '240px', flexGrow: 1 }}>
                {!issuedBook.length ? (
                    <Card sx={{ bgcolor: theme.palette.success.light, p: 4, textAlign: 'center', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ fontFamily: "sans-serif", color: theme.palette.success.contrastText }}>
                            You haven't issued any books yet
                        </Typography>
                    </Card>
                ) : (
                    <>
                        <Typography variant="h4" sx={{ textAlign: "center", fontFamily: "sans-serif", mb: 4, color: theme.palette.primary.main }}>
                            My Issued Books
                        </Typography>
                        <Grid container spacing={3}>
                            {issuedBook.map(book => (
                                <Grid item xs={12} sm={6} md={4} key={book._id}>
                                    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                {book.title}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Author: {book.author}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Publisher: {book.publisher}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Tooltip title="Return">
                                                <IconButton color="secondary" onClick={() => hanndleReqandReturn(book, book.updatedAt)}>
                                                    <KeyboardReturnIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Details">
                                                <IconButton color="primary" onClick={() => handleModal(book.bookId, book.updatedAt)}>
                                                    <InfoIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Modal open={show} onClose={handleClose}>
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
                                <Typography sx={{ mb: 1 }}><b>Book Name:</b> {singleIsBook && singleIsBook.title}</Typography>
                                <Typography sx={{ mb: 1 }}><b>Author:</b> {singleIsBook && singleIsBook.author}</Typography>
                                <Typography sx={{ mb: 1 }}><b>Publisher:</b> {singleIsBook && singleIsBook.publisher}</Typography>
                                <Typography sx={{ mb: 1 }}><b>Originally published:</b> {singleIsBook && singleIsBook.year}</Typography>
                                <Typography sx={{ mb: 1 }}><b>Issued Date:</b> {date && <Moment format="YYYY-MM-DD">{date}</Moment>}</Typography>
                                <Typography sx={{ mb: 1 }}><b>Return Date:</b> {dateFrom && <Moment format="YYYY-MM-DD">{dateFrom}</Moment>}</Typography>
                                {Math.floor(dayDiff) > 0 && (
                                    <Typography sx={{ mb: 1 }}><b>Days Overdue:</b> {Math.floor(dayDiff)}</Typography>
                                )}
                                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.secondary.main }}>Fine: ₹{Math.floor(dayDiff) > 0 ? Math.floor(dayDiff) * 15 : 0}</Typography>
                                <Button variant="contained" color="secondary" onClick={handleClose} fullWidth>
                                    Close
                                </Button>
                            </Card>
                        </Modal>
                    </>
                )}
            </Container>
            {
                error ? (
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                            {mssg}
                        </MuiAlert>
                    </Snackbar>
                ):(
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                            {mssg}
                        </MuiAlert>
                    </Snackbar>
                )
            }
            
        </Box>
    );
};

export default UserIssuedBook;