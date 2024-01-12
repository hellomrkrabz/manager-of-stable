import React from "react";
import '../horses.css'
import Button from "react-bootstrap/Button";

const HorseComponent = ({ details, setDetails, setDisplayDetails }) => {
    const { name, birthday, image, dietaryDescription, otherDetails, turnoutDescription, id, ownerId } = details;
    const handlePageChange = () => {
        window.location.replace("/HorseProfile/"+id);
    };
    return (
        <>
            <div className="horses-box-all d-flex flex-column align-items-left mx-auto ">
                <div className="rounded-top d-flex justify-content-between align-items-center px-2 py-1 fw-semibold">
                    {<p>Name: {name}</p>}
                </div>
                <div className="rounded-top d-flex justify-content-between align-items-center px-2 py-1 fw-semibold">
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