import React, {useEffect, useState} from "react";
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/navbar";
import TextField from "@mui/material/TextField"
import '../App.css'
import '../Register.css'
import Button from "react-bootstrap/Button";
import '../scripts/Register'
import { z } from "zod";

const schema = z.object({
    username: z.string().min(4).max(20),
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .max(32),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["confirm"],
});

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [valueOfPopup, setPopup] = useState("");
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);



    const data = {
        username: username,
        password: password,
        password_confirmation: password_confirmation,
        email: email
    }

    useEffect(() => {
        // This effect will run whenever valueOfPopup changes
        // It can be used to trigger any side effects or additional logic
        console.log('valueOfPopup changed:', valueOfPopup);
    }, [valueOfPopup]);

    function submit() {
        axios.post("http://localhost:8080/api/register", {
            email: email,
            password: password,
            username: username
        }).then((response) => {
            console.log(response.data);
            setOpen(o => !o);
            setPopup(response.data);
        });
    }

    function validate() {
        try {schema.parse(data);
        submit();
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                console.log(err.issues);

                let mes = err.issues.map((error) => error.message).join("\n");
                console.log(mes);
                let errorMes = changeMessage(mes);
                setPopup(errorMes);
                setOpen(true);
            }
        }
    }

    function changeMessage(input) {
        if (input.startsWith("String must contain at least 4 character(s)"))
            return ("Username must contain at least 4 characters")
        else if (input.startsWith("Invalid email"))
            return ("Invalid email")
        else if (input.startsWith("String must contain at least 8 character(s)"))
            return ("Password must contain at least 8 characters")
        else if (input.startsWith("Passwords don't match"))
            return ("Passwords don't match")
        else
            return ("An error occured")
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
                    <div className={"button"}><TextField className={"button"} id="password_confirmation" fullWidth label={"Confirm password"} type={'password'} onChange={(e) => { setConfirmPassword(e.target.value) }}/></div>
                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => { validate() }} id="submit" name="submit">Register</Button>
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

export default Register;