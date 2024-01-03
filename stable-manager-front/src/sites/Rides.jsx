import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import Button from "react-bootstrap/Button";
import RidesComponent from "../components/RidesComponent";
import { Form } from 'react-bootstrap';

function Rides(props) {

    const [rides, setRides] = useState([]);
    const [details, setDetails] = useState("");
    const [ridesToDisplay, setRidesToDisplay] = useState(rides)
    const [displayDetails, setDisplayDetails] = useState(false)
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
                                            <Form.Control type="date" name="dob" placeholder="Date of Birth" onChange={(e) => {setDateLooked(e.target.value)}}/>
                                        </Form.Group>
                                    </div>

                                </div>
                                <div style={{ overflow: 'auto', height: '700px' }}>
                                    <RidesComponent rides={ridesToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
                                </div>
                            </div>
                        </div>
                    </div>

            </>
        );
}

export default Rides;