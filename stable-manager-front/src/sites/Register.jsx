import React, { useState } from "react";
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/navbar";
import TextField from "@mui/material/TextField"
import Logo from "../components/logo";
import '../App.css'
import  '../Register.css'
import Button from "react-bootstrap/Button";


function Register() {
    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>

            <div className="box-width d-flex flex-column align-items-center mx-auto ">
                <Logo></Logo>
                <div className="fs-1 text-center mb-4">Register</div>
                <div className="col align-items-center row gy-2">
                    <div className={"button"}><TextField className={"button"} id="email" fullWidth label={"Email"} type={'email'}/></div>
                    <div className={"button"}><TextField className={"button"} id="username" fullWidth label={"Username"} type={'text'}/></div>
                    <div className={"button"}><TextField className={"button"} id="password" fullWidth label={"Password"} type={'password'}/></div>
                    <div className={"button"}><TextField className={"button"} id="password_confirm" fullWidth label={"Confirm password"} type={'password'}/></div>
                    <Button variant="outline-info" className="me-2 mb-5">Register</Button>
                </div>
            </div>
        </>
    );
}

export default Register;