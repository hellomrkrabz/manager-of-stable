import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import findCookie from "../scripts/cookie";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import def from "../media/horsie.jpg";
import Form from 'react-bootstrap/Form';
import getCookie from "../scripts/cookie";

function AddRide(props) {

    const [clientName, setClientName] = useState("");
    const [dateBegin, setDateBegin] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [dateDay, setDateDay] = useState("");
    const [group, setGroup] = useState(0);
    const idKey = getCookie("idKey");

    useEffect(() => {
        console.log("Updated Start Time:", dateBegin);
    }, [dateBegin]);

    function submitRide() {
        axios.post("http://localhost:8080/ride/add", {
            clientName: clientName,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            trainerId: idKey,
            groupRide: group,
            dateDay: dateDay
        }).then((response) => {
            window.location.replace("/Rides");
        });
    }

    function getDayDate(visitDate) {
        const dateObject = new Date(visitDate);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDateDay(formattedDate);
    }

    function getGroup(bool) {
        console.log("kurde: "+bool)
        if (bool === false)
        {
            setGroup(0);
        }
        else {
            setGroup(1);
        }
    }

    return (
        <>
            <div>
                <Navbar site={"Register"}/>
            </div>
            <>
                <div className="box-width d-flex flex-column align-items-center mx-auto ">
                    <div className="fs-1 text-center mt-2 mb-4">Add Ride</div>
                    <div className={"text-center test-testowy"}><TextField className={"button"} id="clientName" fullWidth label={"Client Name"} type={'text'} onChange={(e) => { setClientName(e.target.value) }}/></div>
                    <div className={"button test-testowy"}><TextField className={"button"} id="dateBegin" fullWidth label={"Start time"} type={'time'} onChange={(e) => {setDateBegin(e.target.value)}}/></div>
                    <div className={"button test-testowy"}><TextField className={"button"} id="dateEnd" fullWidth label={"End time"} type={'time'} onChange={(e) => {setDateEnd(e.target.value)}}/></div>
                    <div className={"button test-testowy"}><TextField className={"button"} id="dateDay" fullWidth label={"Ride day"} type={'date'} onChange={(e) => {getDayDate(e.target.value)}}/></div>

                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Group"
                            onChange={(e) => {getGroup(e.target.checked)}}
                        />

                    </Form>

                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => {submitRide() }} id="submit" name="submit">Add ride</Button>
                </div>
            </>
        </>
    );
}

export default AddRide;