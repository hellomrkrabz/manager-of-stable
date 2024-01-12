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
import HorsesComponent from "../components/HorsesComponent";
import VisitsComponent from "../components/VisitsComponent";
import horses from "./Horses";
import getCookie from "../scripts/cookie";

var roleKey = Number(getCookie("roleKey"));
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
    const [visitType, setVisitType] = useState("");
    const [details, setDetails] = useState("");
    const closeModal = () => setOpen(false);
    const [changingDetails, setChangingDetails] = useState(false);
    const [visitsToDisplay, setVisitsToDisplay] = useState(visits)
    const [displayDetails, setDisplayDetails] = useState(false)


    useEffect(() => {
        getData();
        getVisitData();
    }, []);

    useEffect(()=>{
        console.log(visits);
    },[visits])
    function getData() {
        axios.get("http://localhost:8080/horse/data/" + getIdFromLink()).then((response) => {
            setName(response.data.name);
            setBirthday(response.data.birthDate);
            setTurnoutDescription(response.data.turnoutDescription);
            setDietaryDescription(response.data.dietaryDescription);
            setOtherDetails(response.data.otherDetails);
            setAvatar("data:image/jpeg;base64," + response.data.image);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

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

    function changeDetails() {
        const url = "http://localhost:8080/horse/change/"+getIdFromLink();
        axios.post(url, {
            id: getIdFromLink(),
            turnoutDescription: turnoutDescription,
            dietaryDescription: dietaryDescription,
            otherDetails: otherDetails,
            image: avatar
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

    useEffect(() => {
        if(visits!==undefined && visits.length > 0)
        {
            let noe=20;
            //let offset=pageNumber*noe;
            setVisitsToDisplay(visits)
        }
    }, );

    function submitVisit() {
        console.log(visitType);
        axios.post("http://localhost:8080/visit/add", {
            visitType: visitType,
            date: visitDate,
            horseId: getIdFromLink(),
            description: details
        }).then((response) => {
            console.log(response.data);
            setOpen(o => !o);
            setPopup(response.data);
        });
    }
        const handlePageChange = () => {
            window.location.replace("/AddVisit/"+getIdFromLink());
        };
    if (roleKey === 3 || roleKey === 1) {
if (changingDetails===false) {
    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>
        <div className="d-flex justify-content-between">
            <div className="horse-box-left d-flex flex-column align-items-center" style={{ height: '94vh' }}>
                <div className="fs-1 text-center mb-4 font-test">{name}</div>

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
                    <div className={"button"}><InputLabel htmlFor="birthday">Birthday</InputLabel><TextField className={"button"} id="birthday" fullWidth type={'date'} value={birthday}/></div>
                    <div className={"button"}><InputLabel htmlFor="dietaryDescription">Dietary Description</InputLabel><TextField className={"button"} id="dietaryDescription" fullWidth type={'text'} value={dietaryDescription}/></div>
                    <div className={"button"}><InputLabel htmlFor="turnoutDescription">Turnout Description</InputLabel><TextField className={"button"} id="turnoutDescription" fullWidth type={'text'} value={turnoutDescription}/></div>
                    <div className={"button"}><InputLabel htmlFor="otherDetails">Details</InputLabel><TextField className={"button"} id="otherDetails" fullWidth type={'text'} value={otherDetails}/></div>
                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => { setChangingDetails(!changingDetails);}} id="submit" name="submit">Change profile</Button>
                </div>
            </div>
            <div className="col-9 mt-5"  style={{ justifyContent: 'flex-end' }}>
                <div className="container-fluid d-flex flex-column align-items-center">
                    <div className="row row col-11 py-3">
                        <Button variant="outline-info" className="me-2 mb-5" onClick={() => {handlePageChange() }} id="submit" name="submit">Add visit</Button>

                        <Popup open={open} onClose={() => setOpen(false)}>
                            <div className="modal-visit">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="col-7 popup">
                                        {valueOfPopup}
                                    </div>
                                </div>
                            </div>
                        </Popup>
                        <div className="overflow-auto" style={{ maxHeight: '65vh' }}>
                        <VisitsComponent visits={visitsToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    );}
else {
    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>
            <div className="d-flex justify-content-between">
                <div className="horse-box-left d-flex flex-column align-items-center" style={{ height: '94vh' }}>
                    <div className="fs-1 text-center mb-4 font-test">{name}</div>

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
                        <div className={"button"}><InputLabel htmlFor="birthday">Birthday</InputLabel><TextField className={"button"} id="birthday" fullWidth type={'date'} value={birthday}/></div>
                        <div className={"button"}><InputLabel htmlFor="dietaryDescription">Dietary Description</InputLabel><TextField className={"button"} id="dietaryDescription" fullWidth type={'text'} value={dietaryDescription} onChange={(e) => { setDietaryDescription(e.target.value) }}/></div>
                        <div className={"button"}><InputLabel htmlFor="turnoutDescription">Turnout Description</InputLabel><TextField className={"button"} id="turnoutDescription" fullWidth type={'text'} value={turnoutDescription} onChange={(e) => { setTurnoutDescription(e.target.value) }}/></div>
                        <div className={"button"}><InputLabel htmlFor="otherDetails">Details</InputLabel><TextField className={"button"} id="otherDetails" fullWidth type={'text'} value={otherDetails} onChange={(e) => { setOtherDetails(e.target.value) }}/></div>
                        <Button variant="outline-info" className="me-2 mb-5" onClick={() => { changeDetails()}} id="submit" name="submit">Submit changes</Button>
                    </div>
                </div>
                <div className="col-9 mt-5"  style={{ justifyContent: 'flex-end' }}>
                    <div className="container-fluid d-flex flex-column align-items-center">
                        <div className="row row col-11 py-3">
                            <Button variant="outline-info" className="me-2 mb-5" onClick={() => {handlePageChange() }} id="submit" name="submit">Add visit</Button>

                            <Popup open={open} closeOnDocumentClick={false} onClose={() => setOpen(false)}>
                                <div className="modal-visit">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="col-7 popup">
                                            {valueOfPopup}
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                            <div style={{ overflow: 'auto', height: '700px' }}>
                                <VisitsComponent visits={visitsToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );}
}
    else if(roleKey === 4){
        return (

            <>
                <div>
                    <Navbar site={"Register"}/>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="horse-box-left d-flex flex-column align-items-center" style={{ height: '94vh' }}>
                        <div className="fs-1 text-center mb-4 font-test">{name}</div>

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
                            <div className={"button"}><InputLabel htmlFor="birthday">Birthday</InputLabel><TextField className={"button"} id="birthday" fullWidth type={'date'} value={birthday}/></div>
                            <div className={"button"}><InputLabel htmlFor="dietaryDescription">Dietary Description</InputLabel><TextField className={"button"} id="dietaryDescription" fullWidth type={'text'} value={dietaryDescription}/></div>
                            <div className={"button"}><InputLabel htmlFor="turnoutDescription">Turnout Description</InputLabel><TextField className={"button"} id="turnoutDescription" fullWidth type={'text'} value={turnoutDescription}/></div>
                            <div className={"button"}><InputLabel htmlFor="otherDetails">Details</InputLabel><TextField className={"button"} id="otherDetails" fullWidth type={'text'} value={otherDetails}/></div>
                        </div>
                    </div>
                    <div className="col-9 mt-5"  style={{ justifyContent: 'flex-end' }}>
                        <div className="container-fluid d-flex flex-column align-items-center">
                            <div className="row row col-11 py-3">
                                <Button variant="outline-info" className="me-2 mb-5" onClick={() => {handlePageChange() }} id="submit" name="submit">Add visit</Button>
                                <div className="overflow-auto" style={{ maxHeight: '65vh' }}>
                                    <VisitsComponent visits={visitsToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (

            <>
                <div>
                    <Navbar site={"Register"}/>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="horse-box-left d-flex flex-column align-items-center" style={{ height: '94vh' }}>
                        <div className="fs-1 text-center mb-4 font-test">{name}</div>

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
                            <div className={"button"}><InputLabel htmlFor="birthday">Birthday</InputLabel><TextField className={"button"} id="birthday" fullWidth type={'date'} value={birthday}/></div>
                            <div className={"button"}><InputLabel htmlFor="dietaryDescription">Dietary Description</InputLabel><TextField className={"button"} id="dietaryDescription" fullWidth type={'text'} value={dietaryDescription}/></div>
                            <div className={"button"}><InputLabel htmlFor="turnoutDescription">Turnout Description</InputLabel><TextField className={"button"} id="turnoutDescription" fullWidth type={'text'} value={turnoutDescription}/></div>
                            <div className={"button"}><InputLabel htmlFor="otherDetails">Details</InputLabel><TextField className={"button"} id="otherDetails" fullWidth type={'text'} value={otherDetails}/></div>
                        </div>
                    </div>
                    <div className="col-9 mt-5"  style={{ justifyContent: 'flex-end' }}>
                        <div className="container-fluid d-flex flex-column align-items-center">
                            <div className="row row col-11 py-3">
                                <div className="overflow-auto" style={{ maxHeight: '65vh' }}>
                                    <VisitsComponent visits={visitsToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default HorseProfile;