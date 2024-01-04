import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import getCookie from "../scripts/cookie";
import { z } from "zod";
import Popup from "reactjs-popup";




function AddCost(props) {

    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateDay, setDateDay] = useState("");
    const idKey = getCookie("idKey");

    const [valueOfPopup, setPopup] = useState("");
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const data = {
        amount: Number(amount),
        title: title,
        description: description,
        dateDay: dateDay
    }

    const schema = z.object({
        amount: z.number().positive(),
        title: z.string().min(2),
        description: z.string().min(2),
        dateDay:z.string().regex(new RegExp('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$'))
    });



    function validate() {
        try {schema.parse(data);
            submitCost();
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
            return ("An error occured")
    }

    function submitCost() {
        axios.post("http://localhost:8080/cost/add", {
            amount: amount,
            title: title,
            description: description,
            managerId: idKey,
            dateDay: dateDay
        }).then((response) => {
            window.location.replace("/Costs");
        });
    }

    function getDayDate(visitDate) {
        const dateObject = new Date(visitDate);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDateDay(formattedDate);

        console.log("date" + dateDay)
    }

    return (
        <>
            <div>
                <Navbar site={"Register"}/>
            </div>
            <>
                <div className="box-width d-flex flex-column align-items-center mx-auto ">
                    <div className="fs-1 text-center mt-2 mb-4">Add Cost</div>
                    <div className={"text-center test-testowy"}><TextField className={"button"} id="amount" fullWidth label={"Amount"} type={'number'} onChange={(e) => { setAmount(e.target.value) }}/></div>
                    <div className={"button test-testowy"}><TextField className={"button"} id="title" fullWidth label={"Title"} type={'text'} onChange={(e) => {setTitle(e.target.value)}}/></div>
                    <div className={"button test-testowy"}><TextField className={"button"} id="description" fullWidth label={"Description"} type={'text'} onChange={(e) => {setDescription(e.target.value)}}/></div>
                    <>Cost Day</>
                    <div className={"button test-testowy"}><TextField className={"button"} id="dateDay" fullWidth type={'date'} onChange={(e) => {getDayDate(e.target.value)}}/></div>

                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => {validate() }} id="submit" name="submit">Add Cost</Button>

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

export default AddCost;