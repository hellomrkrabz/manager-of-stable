import React, { useState } from "react";
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/navbar";
import TextField from "@mui/material/TextField"
import Logo from "../components/logo";
import Button from "react-bootstrap/Button";



function Login() {
    return (

        <>
            <div>
                <Navbar site={"Login"}/>
            </div>

            <div className="box-width d-flex flex-column align-items-center mx-auto ">
                <div className="fs-1 text-center mt-2 mb-4">Login</div>
                <div className="col align-items-center row gy-4">
                    <div className={"button"}><TextField className={"button"} id="username" fullWidth label={"Username"} type={'text'}/></div>
                    <div className={"button"}><TextField className={"button"} id="password" fullWidth label={"Password"} type={'password'}/></div>
                    <Button variant="outline-info" className="me-2 mb-4">Login</Button>
                </div>
            </div>
        </>
    );
}

export default Login;