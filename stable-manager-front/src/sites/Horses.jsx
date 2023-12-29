import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import banana from "../media/horsie.jpg";
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import HorsesComponent from "../components/HorsesComponent";
import Popup from 'reactjs-popup';
import Textfield from '@mui/material/TextField'
import axios from "axios"
import getCookie from "../scripts/cookie";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    //marginRight: theme.spacing(2),
    //marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        //marginLeft: theme.spacing(3),
        //width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

var sessionUsername= getCookie("sessionUserUsername")
var sessionUserKey= getCookie("sessionUserKey")

function Horses(props) {

    const [horses, setHorses] = useState([])
    const [filteredOpinions, setFilteredOpinions] = useState([])
    const [horsesToDisplay, setHorsesToDisplay] = useState(horses)
    const [filter, setFilter] = useState({user:"", sort:"newest"})
    const [pageNumber, setPageNumber] = useState(0)
    const [details ,setDetails] = useState({user:"", date:"", score:0, content:"", opinion_id:-1})
    const [displayDetails, setDisplayDetails] = useState(false)

    // async function fetchOpinion()
    // {
    //     const response = await axios.get("http://localhost:8080/horse/all")
    //     let fetchedOpinions = response.data
    //
    //     setHorses(fetchedOpinions)
    // }

    async function fetchOpinion() {
        try {
            const response = await axios.get('http://localhost:8080/horse/all');
            const fetchedOpinions = response.data;
            setHorses(fetchedOpinions);
            setFilteredOpinions(fetchedOpinions);
        } catch (error) {
            console.error('Error fetching opinions:', error);
        }
    }

    useEffect(() => {
        fetchOpinion()
    }, []);

    useEffect(() => {
        if(horses!==undefined && horses.length > 0)
        {
            let noe=20;
            let offset=pageNumber*noe;
            setHorsesToDisplay(filteredOpinions.slice(offset,offset+noe))
        }
    }, [filteredOpinions,pageNumber]);


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
    );
}

export default Horses;