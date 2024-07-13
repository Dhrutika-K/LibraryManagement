import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../actions/user_action";
import { useDispatch, useSelector } from 'react-redux'
import SignInForm from "../components/Form/Register"

const Register = () => {

    return (
        <div >
               <div className="LoginPage"></div>
            <div className="login_container">
            <div style={{marginLeft:"44%"}}>
                        <div id="circle"></div>
                          <h3 className="LMS_R">LMS</h3>
                        </div>
            <p style={{color:"white",fontWeight:"800",textAlign:"center"}}>Welcome to Libary Management System</p>

                <SignInForm   />
            </div>
        </div>
    );
};



export default Register;