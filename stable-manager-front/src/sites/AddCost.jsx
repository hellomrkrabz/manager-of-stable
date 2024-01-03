import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import getCookie from "../scripts/cookie";

function AddCost(props) {

    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateDay, setDateDay] = useState("");
    const idKey = getCookie("idKey");

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
                    <div className={"button test-testowy"}><TextField className={"button"} id="dateDay" fullWidth label={"Ride day"} type={'date'} onChange={(e) => {getDayDate(e.target.value)}}/></div>

                    <Button variant="outline-info" className="me-2 mb-5" onClick={() => {submitCost() }} id="submit" name="submit">Add Cost</Button>
                </div>
            </>
        </>
    );
}

export default AddCost;