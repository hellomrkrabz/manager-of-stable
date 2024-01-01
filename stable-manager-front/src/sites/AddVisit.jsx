import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
//import ProfileComponent from "../components/ProfileComponent";
//import EditProfile from "../components/EditProfile";
import axios from "axios"
import findCookie from "../scripts/cookie";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";
import def from "../media/horsie.jpg";
import VisitComponent from "../components/VisitComponent";
import Dropdown from 'react-bootstrap/Dropdown';
import {encode as base64_encode} from "base-64";
import InputLabel from "@mui/material/InputLabel";

function getIdFromLink()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function AddVisit(props) {

    const [isEditing, setIsEditing] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [horse, setHorse] = useState({username:"", birthday:""})
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [ownerId, setOwnerId] = useState("")
    const [image, setImage] = useState("")
    const [dietaryDescription, setDietaryDescription] = useState("")
    const [turnoutDescription, setTurnoutDescription] = useState("")
    const [otherDetails, setOtherDetails] = useState("")
    const [id, setId] = useState("")
    const [avatar, setAvatar] = useState(def);
    var sessionUserUsername = findCookie("sessionUserUsername")
    var sessionUserKey = findCookie("sessionUserKey")
    const [visits, setVisits] = useState([])
    const [valueOfPopup, setPopup] = useState("");
    const [open, setOpen] = useState(false);
    const [visitDate, setVisitDate] = useState("");
    const [visitType, setVisitType] = useState("");
    const [details, setDetails] = useState("");
    const closeModal = () => setOpen(false);
    const [changingDetails, setChangingDetails] = useState(false);


    useEffect(() => {
        getData();
        getVisitData();
    }, []);

    useEffect(()=>{
        console.log(visits);
    },[visits])
    function getData() {

        axios.get("http://localhost:8080/horse/data/" + getIdFromLink()).then((response) => {
            console.log(response.data.name);
            setName(response.data.name);
            setBirthday(response.data.birthday);
            setTurnoutDescription(response.data.turnoutDescription);
            setDietaryDescription(response.data.dietaryDescription);
            setOtherDetails(response.data.otherDetails);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function changeDetails() {
        const url = "http://localhost:8080/horse/change/"+getIdFromLink();
        axios.post(url, {
            id: getIdFromLink(),
            turnoutDescription: turnoutDescription,
            dietaryDescription: dietaryDescription,
            otherDetails: otherDetails
        }).then((response) => {
            setChangingDetails(!changingDetails);
        });
    }
    function getVisitData() {

        axios.get("http://localhost:8080/visit/data/" + getIdFromLink()).then((response) => {
            console.log(response.data);
            setVisits([response.data]);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function submitVisit() {
        console.log(visitType);
        axios.post("http://localhost:8080/visit/add", {
            visitType: visitType,
            date: visitDate,
            horseId: getIdFromLink(),
            description: details
        }).then((response) => {
            window.location.replace("/HorseProfile/"+getIdFromLink());
        });
    }

    function addVisit() {
        setOpen(true);
        setPopup(<>
                <div className=" text-center mb-4 font-test">Add Visit</div>
                <Dropdown className={"test-testowy align-self-center"}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Visit type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => {setVisitType(1)}}>Deworming</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {setVisitType(2)}}>Vet visit</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {setVisitType(3)}}>Farrier visit</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className={"button test-testowy"}><TextField className={"button"} id="visitDate" fullWidth label={"Visit date"} type={'date'} onChange={(e) => {setVisitDate(e.target.value)
                }}/></div>

                <div className={"text-center test-testowy"}><TextField className={"button"} id="details" fullWidth label={"Details"} type={'text'} onChange={(e) => { setDetails(e.target.value) }}/></div>
                <Button variant="outline-info" className="me-2 mb-5" onClick={() => {submitVisit() }} id="submit" name="submit">Add visit</Button>
            </>
        );
    }
    if (changingDetails===false) {
        return (

            <>
                <div>
                    <Navbar site={"Register"}/>
                </div>
                <>
                    <div className="box-width d-flex flex-column align-items-center mx-auto ">
                    <div className="fs-1 text-center mt-2 mb-4">Add Visit</div>
                    <Dropdown className={"test-testowy align-self-center"}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Visit type
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => {setVisitType(1)}}>Deworming</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {setVisitType(2)}}>Vet visit</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {setVisitType(3)}}>Farrier visit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className={"button test-testowy"}><TextField className={"button"} id="visitDate" fullWidth label={"Visit date"} type={'date'} onChange={(e) => {setVisitDate(e.target.value)
                    }}/></div>

                    <div className={"text-center test-testowy"}><TextField className={"button"} id="details" fullWidth label={"Details"} type={'text'} onChange={(e) => { setDetails(e.target.value) }}/></div>
                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => {submitVisit() }} id="submit" name="submit">Add visit</Button>
                </div>
                    </>
                </>
        );
    }
}

export default AddVisit;