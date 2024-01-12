import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import getCookie from "../scripts/cookie";
import { z } from "zod";
import Popup from 'reactjs-popup';
function AddRide(props) {

    const [clientName, setClientName] = useState("");
    const [dateBegin, setDateBegin] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [dateDay, setDateDay] = useState("");
    const [group, setGroup] = useState(0);
    const idKey = getCookie("idKey");
    const [valueOfPopup, setPopup] = useState("");
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const data = {
        clientName: clientName,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
        dateDay: dateDay
    }

    const schema = z.object({
        clientName: z.string().min(2),
        dateDay:z.string().regex(new RegExp('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')),
        dateBegin:z.string().regex(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
        dateEnd:z.string().regex(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
    });



    function validate() {
            try {schema.parse(data);
                submitRide();
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
                    <>Start Time</>
                    <div className={"button test-testowy"}><TextField className={"button"} id="dateBegin" fullWidth type={'time'} onChange={(e) => {setDateBegin(e.target.value)}}/></div>
                    <>End Time</>
                    <div className={"button test-testowy"}><TextField className={"button"} id="dateEnd" fullWidth type={'time'} onChange={(e) => {setDateEnd(e.target.value)}}/></div>
                    <>Ride day</>
                    <div className={"button test-testowy"}><TextField className={"button"} id="dateDay" fullWidth type={'date'} onChange={(e) => {getDayDate(e.target.value)}}/></div>

                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Group"
                            onChange={(e) => {getGroup(e.target.checked)}}
                        />

                    </Form>

                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => {validate() }} id="submit" name="submit">Add ride</Button>

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
            </>
        </>
    );
}

export default AddRide;