import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import Button from "react-bootstrap/Button";
import RidesComponent from "../components/RidesComponent";
import { Form } from 'react-bootstrap';

function Rides(props) {

    const [rides, setRides] = useState([]);
    const [ridesToDisplay, setRidesToDisplay] = useState(rides)
    const [dateLooked, setDateLooked] = useState(false)

    useEffect(() => {
        getRidesData();
    }, []);

    useEffect(()=>{
        console.log(rides);
    },[rides])


    function getRidesData() {

        axios.get("http://localhost:8080/ride/data/" + dateLooked).then((response) => {
            console.log(response.data);
            setRides([response.data]);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function getRidesDataTest(dateFormatted) {

        axios.get("http://localhost:8080/ride/data/" + dateFormatted).then((response) => {
            console.log(response.data);
            setRides([response.data]);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function getDateLooked(dateLooked) {
        const dateObject = new Date(dateLooked);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDateLooked(formattedDate);
        console.log("data: " + dateLooked);
        getRidesDataTest(formattedDate);
    }

    useEffect(() => {
        if(rides!==undefined && rides.length > 0)
        {
            setRidesToDisplay(rides)
        }
    }, );

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
                                            <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={(e) => {getDateLooked(e.target.value)}}/>
                                        </Form.Group>
                                    </div>

                                </div>
                                <div className="container-fluid d-flex flex-column ">
                                    <div className="row visit-box mt-1">
                                        <div className="col-3 fs-2">Client Name</div>
                                        <div className="col-3 fs-2">Type</div>
                                        <div className="col-3 fs-2">Time</div>
                                        <div className="col-3 fs-2">Trainer Name</div>
                                    </div>
                                </div>
                                <div className="overflow-auto" style={{ maxHeight: '65vh' }}>
                                    <RidesComponent rides={ridesToDisplay}/>
                                </div>
                            </div>
                        </div>
                    </div>

            </>
        );
}

export default Rides;