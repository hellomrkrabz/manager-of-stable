import React, {useEffect, useState} from "react";
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Navbar from "../components/navbar";
import TextField from "@mui/material/TextField"
import '../App.css'
import '../Register.css'
import Button from "react-bootstrap/Button";
import '../scripts/cookie'
import '../AddHorse.css'
import def from '../media/horsie.jpg'
import getCookie from "../scripts/cookie";
import { z } from "zod";
function AddHorse() {
    const [name, setName] = useState("");
    const [dietaryDescription, setDietaryDescription] = useState("");
    const [turnoutDescription, setTurnoutDescription] = useState("");
    const [otherDetails, setOtherDetails] = useState("");
    const [birthday, setBirthday] = useState("");
    const [valueOfPopup, setPopup] = useState("");
    const [open, setOpen] = useState(false);
    const [avatar, setAvatar] = useState(def);
    const base64 ='';
    const closeModal = () => setOpen(false);

    const idKey = getCookie("idKey");

    const data = {
        name: name,
        birthday: birthday,
        dietaryDescription: dietaryDescription,
        turnoutDescription: turnoutDescription,
        otherDetails: otherDetails,
        avatar: avatar
    }

    const schema = z.object({
        name: z.string().min(2),
        birthday:z.string().regex(new RegExp('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')),
        dietaryDescription: z.string().min(2),
        turnoutDescription: z.string().min(2),
        otherDetails: z.string().min(2),
        avatar: z.string().min(5)
    });



    function validate() {
        if (avatar !== "/static/media/horsie.f6355596ea3d9ab63fd9.jpg"){
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
        }}
        else {
            let errorMes = changeMessage("No image provided");
            setPopup(errorMes);
            setOpen(true);
        }
    }

    function changeMessage(input) {
        if (input.startsWith("Expected number"))
            return ("Expected number")
        else if (input.startsWith("String must contain at least 2 character(s)"))
            return ("String must contain at least 2 character(s)")
        else if (input.startsWith("Expected date"))
            return ("Expected date")
        else if (input.startsWith("Invalid date format. Please use YYYY-MM-DD"))
            return ("Invalid date format. Please use YYYY-MM-DD.")
        else if (input.startsWith("Number must be greater than 0"))
            return ("Number must be greater than 0")
        else if (input.startsWith("Invalid"))
            return ("No date provided")
        else
            return (input)
    }


    useEffect(() => {
        console.log('valueOfPopup changed:', valueOfPopup);
    }, [valueOfPopup]);


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageUrl = reader.result;
            setAvatar(imageUrl);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    function submit() {
        axios.post("http://localhost:8080/horse/add", {
            name: name,
            birthDate: birthday,
            image: avatar,
            ownerId: idKey,
            dietaryDescription: dietaryDescription,
            turnoutDescription: turnoutDescription,
            otherDetails: otherDetails
        }).then((response) => {
            console.log(response.data);
            setOpen(o => !o);
            setPopup(response.data);
        });
    }

    function getDate(birthday) {
        const dateObject = new Date(birthday);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const day = dateObject.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        setBirthday(formattedDate);
    }

    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>

            <div className="horse-box-width d-flex flex-column align-items-center mx-auto ">
                <div className="fs-1 text-center mb-4 font-test">Add Horse</div>

                <div className="wrapper">
                    <div className="btnimg">
                        <img
                        src={avatar}
                        style={{width: 200, height: 200, borderRadius: 200/ 2, marginBottom: 20}
                        }
                        alt="Horse"
                    /></div>
                    <input type="file" onChange={(e) => handleFileUpload(e)}/>
                </div>
                <div className="col align-items-center row gy-2">
                    <div className={"button"}><TextField className={"button"} id="name" fullWidth label={"Name"} type={'text'} onChange={(e) => { setName(e.target.value) }}/></div>
                    <div>Birthday</div>
                    <div className={"button"}><TextField className={"button"} id="birthday" fullWidth type={'date'} onChange={(e) => { getDate(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="dietaryDescription" fullWidth label={"Diet"} type={'text'} onChange={(e) => { setDietaryDescription(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="turnoutDescription" fullWidth label={"Turnout"} type={'text'} onChange={(e) => { setTurnoutDescription(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="otherDetails" fullWidth label={"Details"} type={'text'} onChange={(e) => { setOtherDetails(e.target.value) }}/></div>
                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => { validate() }} id="submit" name="submit">Add horse</Button>
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

export default AddHorse;