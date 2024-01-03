import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import Button from "react-bootstrap/Button";
import CostsComponent from "../components/CostsComponent";
import { Form } from 'react-bootstrap';

function Costs(props) {

    const [costs, setCosts] = useState([]);
    const [costsToDisplay, setCostsToDisplay] = useState(costs)
    const [dateLooked, setDateLooked] = useState(false)

    useEffect(() => {
        getCostsData();
    }, []);

    useEffect(()=>{
        console.log(costs);
    },[costs])


    function getCostsData() {

        axios.get("http://localhost:8080/cost/data/" + dateLooked).then((response) => {
            console.log(response.data);
            setCosts([response.data]);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function getCostsData(dateFormatted) {

        axios.get("http://localhost:8080/cost/data/" + dateFormatted).then((response) => {
            console.log(response.data);
            setCosts([response.data]);
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
        getCostsData(formattedDate);
    }

    useEffect(() => {
        if(costs!==undefined && costs.length > 0)
        {
            setCostsToDisplay(costs)
        }
    }, );

    const handlePageChange = () => {
        window.location.replace("/AddCost");
    };
    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>
            <div className="col-12 mt-5"  style={{ justifyContent: 'flex-center' }}>
                <div className="container-fluid d-flex flex-column align-items-center">
                    <div className="row row col-11 py-3">
                        <Button variant="outline-info" className="me-2 mb-2" onClick={() => {handlePageChange() }} id="submit" name="submit">Add Cost</Button>
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
                                <div className="col-3 fs-2">Title</div>
                                <div className="col-3 fs-2">Amount</div>
                                <div className="col-3 fs-2">Description</div>
                                <div className="col-3 fs-2">Manager Name</div>
                            </div>
                        </div>
                        <div className="overflow-auto" style={{ maxHeight: '65vh' }}>
                            <CostsComponent costs={costsToDisplay}/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Costs;