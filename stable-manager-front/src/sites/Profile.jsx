import React, {useEffect, useState} from "react";
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/navbar";
import TextField from "@mui/material/TextField"
import Button from "react-bootstrap/Button";
import getCookie from "../scripts/cookie";
import InputLabel from '@mui/material/InputLabel';

function Profile() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [id, setId] = useState("");
    const [valueOfPopup, setPopup] = useState("");
    const [open, setOpen] = useState(false);
    const [changingDetails, setChangingDetails] = useState(false);
    const closeModal = () => setOpen(false);

    var usernameKey = getCookie("usernameKey");
    var idKey = getCookie("idKey");


    useEffect(() => {
        getData();
    }, []);
    function getData() {
        const url = "http://localhost:8080/api/data/"+usernameKey;
        axios.get(url)
            .then((response) => {
                setUsername(response.data.username);
                setPassword(response.data.password);
                setEmail(response.data.email);
                setId(response.data.id);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function submit() {
        const url = "http://localhost:8080/api/change/"+username;
        console.log(password);
        axios.post(url, {
            id: id,
            username: username,
            email: email,
            password: password
        }).then((response) => {
            document.cookie = "usernameKey="+username+"; SameSite=None; Secure";
            setOpen(o => !o);
            setPopup(response.data);
            setChangingDetails(!changingDetails);
        });
    }

if (changingDetails === false) {
    return (
        <>
            <div>
                <Navbar site={"Profile"}/>
            </div>
            <div className="box-width d-flex flex-column align-items-center mx-auto ">
                <div className="fs-1 text-center mt-2 mb-4">Profile</div>
                <div className="col align-items-center row gy-4">
                    <div className={"button"}><InputLabel htmlFor="username">Username</InputLabel><TextField className={"button"} id="username" fullWidth type={'text'} value={username}/></div>
                    <div className={"button"}><InputLabel htmlFor="email">Email</InputLabel><TextField className={"button"} id="email" fullWidth type={'text'} value={email}/></div>
                    <div className={"button"}><InputLabel htmlFor="Password">Password</InputLabel><TextField className={"button"} id="password" fullWidth type={'password'} value={password}/></div>
                    <Button variant="outline-info" className="me-2 mb-4"onClick={() => { setChangingDetails(!changingDetails);}}>Change details</Button>
                </div>
            </div>

        </>
    );}
else {
    return (
        <>
            <div>
                <Navbar site={"Profile"}/>
            </div>
            <div className="box-width d-flex flex-column align-items-center mx-auto ">
                <div className="fs-1 text-center mt-2 mb-4">Editing profile</div>
                <div className="col align-items-center row gy-4">
                    <div className={"button"}><InputLabel htmlFor="username">Username</InputLabel><TextField className={"button"} id="username" fullWidth type={'text'} value={username} onChange={(e) => { setUsername(e.target.value) }}/></div>
                    <div className={"button"}><InputLabel htmlFor="email">Email</InputLabel><TextField className={"button"} id="email" fullWidth type={'text'} value={email} onChange={(e) => { setEmail(e.target.value) }}/></div>
                    <div className={"button"}><InputLabel htmlFor="Password">Password</InputLabel><TextField className={"button"} id="password" fullWidth type={'password'} value={password} onChange={(e) => { setPassword(e.target.value) }}/></div>

                    <Button variant="outline-info" className="me-2 mb-4" onClick={() => { submit(); }}>Save details</Button>

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
}

export default Profile;