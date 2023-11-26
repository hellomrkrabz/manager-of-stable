import React, { useState } from "react";
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/navbar";
import TextField from "@mui/material/TextField"
import Logo from "../components/logo";
import Button from "react-bootstrap/Button";



function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [valueOfPopup, setPopup] = useState("");
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    function submit() {
        axios.post("http://localhost:8080/api/register", {
            password: password,
            username: username
        }).then((response) => {
            console.log(response.data);
            setOpen(o => !o);
            setPopup(response.data);
        });
    }
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
                    <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                        <div className="modal">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="col-7">
                                    {valueOfPopup}
                                </div>
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>
        </>
    );
}

export default Login;