import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import findCookie from "../scripts/cookie";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";
import def from "../media/horsie.jpg";
import InputLabel from "@mui/material/InputLabel";
import RidesComponent from "../components/RidesComponent";
import { Form } from 'react-bootstrap';

function getIdFromLink()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function Rides(props) {

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
        window.location.replace("/AddRide");
    };
        return (

            <>
                <div>
                    <Navbar site={"Register"}/>
                </div>
                    <div className="col-12 mt-5"  style={{ justifyContent: 'flex-center' }}>
                        <div className="container-fluid d-flex flex-column align-items-center">
                            <div className="row row col-11 py-3">
                                <Button variant="outline-info" className="me-2 mb-2" onClick={() => {handlePageChange() }} id="submit" name="submit">Add ride</Button>
                                <div className="box-width d-flex flex-column align-items-center mx-auto">

                                    <div className="col-md-12 mb-4">
                                        <Form.Group controlId="dob">
                                            <Form.Label>Select Date</Form.Label>
                                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                                        </Form.Group>
                                    </div>

                                </div>
                                <div style={{ overflow: 'auto', height: '700px' }}>
                                    <RidesComponent visits={visitsToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
                                </div>
                            </div>
                        </div>
                    </div>

            </>
        );
}

export default Rides;