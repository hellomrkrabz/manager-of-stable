import React from "react";
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField";
import '../horses.css'
import Button from "react-bootstrap/Button";

// function HorseComponent(props) {
//
//     return (
//         <>
//             <div className="bg-light rounded-3 d-flex flex-column">
//                 <div className="bg-banana-blue rounded-top d-flex justify-content-between align-items-center px-2 py-1 fw-semibold">
//                     {props.details}
//                     <div className="col-7">
//                         <div className={"button"}><TextField className={"button"} id="name" fullWidth label={"Name"} type={'text'}/></div>
//                     </div>
//                 </div>
//                 <div className="flex-grow-1 d-flex px-3 pt-3">
//                     <p className="col-9 overflow-hidden" style={{height: "70px",}}>{props.details.content}</p>
//                     <div className="col-2 d-flex justify-content-end align-items-end align-self-bottom flex-grow-1">
//
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
//
// export default HorseComponent;



const HorseComponent = ({ details, setDetails, setDisplayDetails }) => {
    // Extract individual properties
    const { name, birthday, image, dietaryDescription, otherDetails, turnoutDescription, id, ownerId } = details;
    const handlePageChange = () => {
        window.location.replace("/HorseProfile/"+id);
    };
    return (
        <>
            {/*<div className="bg-light rounded-3 d-flex flex-column">*/}
            <div className="horses-box-all d-flex flex-column align-items-left mx-auto ">
                <div className="bg-banana-blue rounded-top d-flex justify-content-between align-items-center px-2 py-1 fw-semibold">
                    {<p>Name: {name}</p>}
                </div>
                <div className="bg-banana-blue rounded-top d-flex justify-content-between align-items-center px-2 py-1 fw-semibold">
                    {<p>Birthday: {birthday}</p>}
                </div>
                <div className="flex-grow-1 d-flex px-3 pt-3">
                    <p className="col-9 overflow-hidden" style={{height: "70px",}}>{dietaryDescription}</p>
                    {/*<div className="col-2 d-flex justify-content-end align-items-end align-self-bottom flex-grow-1">*/}
                    <Button variant="outline-info" className="submit-button-horse" onClick={() => {handlePageChange()}} id="submit" name="submit">Profile</Button>
                    </div>
                </div>
            {/*</div>*/}
        </>
    );
};

export default HorseComponent;