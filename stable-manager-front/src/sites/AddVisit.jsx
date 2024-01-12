import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";
import Dropdown from 'react-bootstrap/Dropdown';
import { z } from "zod";

function getIdFromLink()
{
    const pathParts = window.location.pathname.split('/')
    return pathParts.pop()
}

function AddVisit(props) {

    const [visits, setVisits] = useState([])
    const [valueOfPopup, setPopup] = useState("");
    const [open, setOpen] = useState(false);
    const [visitDate, setVisitDate] = useState("");
    const [visitType, setVisitType] = useState("");
    const [details, setDetails] = useState("");
    const [isVisitType, setIsVisitType] = useState(false);
    const closeModal = () => setOpen(false);

    const data = {
        details: details,
        visitDate: visitDate
    }

    const schema = z.object({
        details: z.string().min(2),
        visitDate:z.string().regex(new RegExp('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$'))
    });



    function validate() {
        if (isVisitType) {
            try {
                schema.parse(data);
                submitVisit();
            } catch (err) {
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
        else {
            setPopup("No type provided");
            setOpen(true);
        }
    }

    function changeMessage(input) {
        console.log("visitType: " + visitType)
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
        else if (input.startsWith("Required"))
            return ("No date or type provided")
        else
            return (input)
    }


    useEffect(() => {
        console.log('valueOfPopup changed:', valueOfPopup);
    }, [valueOfPopup]);


    useEffect(() => {
        getVisitData();
    }, []);

    useEffect(()=>{
        console.log(visits);
    },[visits])

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
        axios.post("http://localhost:8080/visit/add", {
            visitType: visitType,
            date: visitDate,
            horseId: getIdFromLink(),
            description: details
        }).then((response) => {
            window.location.replace("/HorseProfile/"+getIdFromLink());
        });
    }

    function getDate(visitDate) {
        const dateObject = new Date(visitDate);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const day = dateObject.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        setVisitDate(formattedDate);
        console.log("data wizyty: "+visitDate)
    }

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
                            <Dropdown.Item onClick={(e) => {setVisitType(1) ; setIsVisitType(true)}}>Deworming</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {setVisitType(2); setIsVisitType(true)}}>Vet visit</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {setVisitType(3); setIsVisitType(true)}}>Farrier visit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                        <>Visit Date</>
                    <div className={"button test-testowy"}><TextField className={"button"} id="visitDate" fullWidth type={'date'} onChange={(e) => {getDate(e.target.value)
                    }}/></div>

                    <div className={"text-center test-testowy"}><TextField className={"button"} id="details" fullWidth label={"Details"} type={'text'} onChange={(e) => { setDetails(e.target.value) }}/></div>
                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => {validate() }} id="submit" name="submit">Add visit</Button>
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

export default AddVisit;