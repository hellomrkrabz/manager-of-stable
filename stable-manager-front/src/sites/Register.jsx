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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");

    function submit() {
        axios.post("http://localhost:8080/api/register", {
            email: email,
            password: password,
            username: username,
            confirmPassword: confirmPassword
        }).then((response) => {
            console.log(response.data.msg);
        });
    }

    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>

            <div className="box-width d-flex flex-column align-items-center mx-auto ">
                <div className="fs-1 text-center mb-4 font-test">Register</div>
                <div className="col align-items-center row gy-2">
                    <div className={"button"}><TextField className={"button"} id="email" fullWidth label={"Email"} type={'email'} onChange={(e) => { setEmail(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="username" fullWidth label={"Username"} type={'text'} onChange={(e) => { setUsername(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="password" fullWidth label={"Password"} type={'password'} onChange={(e) => { setPassword(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="password_confirm" fullWidth label={"Confirm password"} type={'password'} onChange={(e) => { setConfirmPassword(e.target.value) }}/></div>
                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => { submit() }} id="submit" name="submit">Register</Button>
                </div>
            </div>
        </>
    );
}

export default Register;