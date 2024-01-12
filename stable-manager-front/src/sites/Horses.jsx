import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import HorsesComponent from "../components/HorsesComponent";
import axios from "axios"
import getCookie from "../scripts/cookie";
import Button from "react-bootstrap/Button";

var roleKey = Number(getCookie("roleKey"));
var idKey = Number(getCookie("idKey"));
styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    },
}));
styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Horses(props) {

    const [horses, setHorses] = useState([])
    const [filteredHorses, setFilteredHorses] = useState([])
    const [horsesToDisplay, setHorsesToDisplay] = useState(horses)
    const [pageNumber, setPageNumber] = useState(0)
    const [details ,setDetails] = useState({})
    const [displayDetails, setDisplayDetails] = useState(false)

    async function fetchHorses() {
        try {
            const response = await axios.get('http://localhost:8080/horse/all');
            const fetchedHorses = response.data;
            setHorses(fetchedHorses);
            setFilteredHorses(fetchedHorses);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function fetchOwnerHorses() {
        try {
            const response = await axios.get('http://localhost:8080/horse/ownersHorses/'+idKey);
            const fetchedHorses = response.data;
            setHorses(fetchedHorses);
            setFilteredHorses(fetchedHorses);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handlePageChange = () => {
        window.location.replace("/AddHorse");
    };

    useEffect(() => {
        if (roleKey === 3) {
        fetchOwnerHorses()}
        else {
            fetchHorses()
        }
    }, []);

    useEffect(() => {
        if(horses!==undefined && horses.length > 0)
        {
            let noe=20;
            let offset=pageNumber*noe;
            setHorsesToDisplay(filteredHorses.slice(offset,offset+noe))
        }
    }, [filteredHorses,pageNumber]);

if (roleKey === 1 || roleKey === 3) {
    return (
        <>
            <div>
                <Navbar site={"Register"}/>
            </div>
            <div className="row row col-12 py-3">
            <Button variant="outline-info" className="me-2 " onClick={() => {handlePageChange() }} id="submit" name="submit">Add Horse</Button>
                </div>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <div className="col-12">
                        <HorsesComponent horses={horsesToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
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
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-12">
                            <HorsesComponent horses={horsesToDisplay} setDetails={setDetails} setDisplayDetails={setDisplayDetails}/>
                        </div>
                    </div>
                </div>
            </>
        );}
}

export default Horses;