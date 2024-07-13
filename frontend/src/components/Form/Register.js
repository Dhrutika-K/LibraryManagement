import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "yup-phone";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../actions/user_action";
import { useNavigate } from 'react-router-dom';
import { 
  Snackbar, TextField, Button, Typography, Container, Box, 
  CssBaseline, Avatar, Grid
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const signInSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
        .min(3, "Name is too short - should be 3 chars minimum"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password is too short - should be 4 chars min"),
});

const initialValues = {
    name: "",
    email: "",
    password: "",
    branch: "",
    roll_no: "",
    year: "",
    phone_no: ""
};

const theme = createTheme();

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [mssg, setMssg] = useState("");
    const { error } = useSelector(state => state.userRegisterReducer);

    // useEffect(() => {
    //     if (error) {
    //         setSnackbarOpen(true);
    //         setMssg(error);
    //     } else {
    //         setSnackbarOpen(false);
    //     }
    // }, [error]);
    
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
                        Welcome to Library Management System
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signInSchema}
                        onSubmit={(values, { resetForm }) => {
                            dispatch(registerUser(values, navigate));
                            resetForm();
                            if (error) {
                                setSnackbarOpen(true);
                                setMssg(error);
                            } else {
                                setSnackbarOpen(false);
                            }
                        }}
                    >
                        {({ errors, touched, isValid, dirty, handleChange, handleBlur }) => (
                            <Form>
                                <Grid container spacing={2} sx={{ mt: 3 }}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="name"
                                            label="Name"
                                            error={touched.name && errors.name}
                                            helperText={touched.name && errors.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            error={touched.email && errors.email}
                                            helperText={touched.email && errors.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            error={touched.password && errors.password}
                                            helperText={touched.password && errors.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="branch"
                                            label="Branch"
                                            error={touched.branch && errors.branch}
                                            helperText={touched.branch && errors.branch}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="roll_no"
                                            label="Roll No"
                                            error={touched.roll_no && errors.roll_no}
                                            helperText={touched.roll_no && errors.roll_no}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="year"
                                            label="Admission Year"
                                            type="number"
                                            error={touched.year && errors.year}
                                            helperText={touched.year && errors.year}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            as={TextField}
                                            fullWidth
                                            name="phone_no"
                                            label="Phone Number"
                                            error={touched.phone_no && errors.phone_no}
                                            helperText={touched.phone_no && errors.phone_no}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={!(dirty && isValid)}
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {mssg}
                    </MuiAlert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default SignInForm;