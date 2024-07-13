import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/user_action";
import { useDispatch, useSelector } from 'react-redux'
import AdminIMage from "../Images/admin2.jpg"
import { useNavigate } from 'react-router-dom';
import { Snackbar, TextField, Button, Box, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


const AdminLogin = () => {
    const [password, setPassword] = useState();
    const [show, setShow] = useState("password");
    const [roll_no, setRoll_no] = useState();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [mssg, setMssg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {error}=useSelector(state => state.userLoginReducer);

    const handleShow = () => {
        setShow(show === "password" ? "text" : "password");
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const PostData = () => {
        const user = { password, roll_no, type: "admin" };
        dispatch(loginUser(user, navigate));
    };

    React.useEffect(() => {
        if (error) {
            setSnackbarOpen(true);
            setMssg(error);
        } else {
            setSnackbarOpen(false);
        }
    }, [error]);

    return (
        <div>
            <div className="LoginPage"></div>
            <div className="login_container">
                <div className="col-md-6 m-auto" style={{ opacity: 1 }}>
                    <div style={{ marginLeft: "37%" }}>
                        <div id="circle"></div>
                        <h3 className="LMS" style={{ fontFamily: "sans-serif" }}>LMS</h3>
                    </div>
                    <p style={{ color: "white", fontWeight: "800", textAlign: "center" }}>Welcome to Library Management System</p>
                    <img src={AdminIMage} alt="StudentImage" style={{ height: "220px", width: "220px", borderRadius: "50%" }} />
                    <div style={{ marginTop: "20px", color:"white" }}>
                        <TextField
                            type="text"
                            className="form-control"
                            style={{
                                height: "60px",
                                borderRadius: "20px",
                                color: "white",
                                borderColor: "white",
                            }}
                            placeholder="Roll Number"
                            value={roll_no}
                            onChange={(e) => setRoll_no(e.target.value)}
                            fullWidth
                            InputProps={{
                                style: { color: "white", borderColor:"white", }
                            }}
                        />
                    </div>
                    <br />
                    <div style={{color:"white"}}>
                        <TextField
                            style={{ height: "60px", borderRadius: "20px", color:"white",borderColor: "white", }}
                            className="form-control"
                            type={show ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            InputProps={{
                                style: { color: "white", borderColor: "white" }
                            }}
                        />
                    </div>
                    <br />
                    <Button
                        style={{ width: "100%", height: "60px", color: "white", borderRadius: "20px", backgroundColor: "red" }}
                        onClick={PostData}
                        fullWidth
                    >
                        Login
                    </Button>
                </div>
                <br />
                <Typography variant="body2" align="center" style={{ fontFamily: "sans-serif", color: "white" }}>
                 <Link to="/register" style={{ textDecoration: "none", color: "white" }}>If you don't have an account,register here</Link>.
                </Typography>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {mssg}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};


export default AdminLogin;