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

function getIdFromLink()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function HorseProfile(props) {

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
    const [details, setDetails] = useState("");
    const closeModal = () => setOpen(false);


    useEffect(() => {
        getData();
    }, []);
    function getData() {

        axios.get("http://localhost:8080/horse/data/" + getIdFromLink()).then((response) => {
            console.log(response.data.name);
            setName(response.data.name);
            //setPassword(response.data.password);
            //setEmail(response.data.email);
            //setId(response.data.id);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function addVisit() {
            setOpen(o => !o);
            setPopup(<>
            <div className=" text-center mb-4 font-test">Add Visit</div>
                <Dropdown className={"test-testowy align-self-center"}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Visit type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Deworming</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Vet visit</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Farrier visit</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            <div className={"button test-testowy"}><TextField className={"button"} id="birthday" fullWidth label={"Birth date"} type={'date'} onChange={(e) => {setBirthday(e.target.value)
            }}/></div>

                <div className={"text-center test-testowy"}><TextField className={"button"} id="otherDetails" fullWidth label={"Details"} type={'text'} onChange={(e) => { setOtherDetails(e.target.value) }}/></div>
            </>
    );
    }

    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>
        <div className="d-flex justify-content-between">
            <div className="horse-box-left d-flex flex-column align-items-center" style={{ height: '94vh' }}>
                <div className="fs-1 text-center mb-4 font-test">Add Horse</div>

                <div className="wrapper">
                    <div className="btnimg">
                        <img
                            src={avatar}
                            style={{width: 200, height: 200, borderRadius: 200/ 2, marginBottom: 20}
                            }
                            alt="Horse"
                        /></div>
                </div>
                <div className="col align-items-center row gy-2">
                    <div className={"button"}><TextField className={"button"} id="name" fullWidth label={"Name"} type={'text'} onChange={(e) => { setName(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="birthday" fullWidth label={"Birth date"} type={'date'} onChange={(e) => { setBirthday(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="dietaryDescription" fullWidth label={"Diet"} type={'text'} onChange={(e) => { setDietaryDescription(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="turnoutDescription" fullWidth label={"Turnout"} type={'text'} onChange={(e) => { setTurnoutDescription(e.target.value) }}/></div>
                    <div className={"button"}><TextField className={"button"} id="otherDetails" fullWidth label={"Details"} type={'text'} onChange={(e) => { setOtherDetails(e.target.value) }}/></div>
                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => { }} id="submit" name="submit">Add horse</Button>
                </div>
            </div>
            <div className="col-9 mt-5"  style={{ justifyContent: 'flex-end' }}>
                <div className="container-fluid d-flex flex-column align-items-center">
                    <div className="row row col-11 py-3">
                        <Button variant="outline-info" className="me-2 mb-5" onClick={() => {addVisit() }} id="submit" name="submit">Add visit</Button>

                        <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                            <div className="modal-visit">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="col-7 popup">
                                        {valueOfPopup}
                                    </div>
                                </div>
                            </div>
                        </Popup>

                        {visits.map((r)=><VisitComponent report={{...r}}/>)}
                        {visits.length===0 &&
                            <div>Nothing here</div>
                        }
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default HorseProfile;