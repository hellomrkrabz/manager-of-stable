import React, {useState} from "react";
import '../horses.css'

function VisitComponent(props) {
    //const { name, birthday, image, dietaryDescription, otherDetails, turnoutDescription, id, ownerId } = details;

    function setVisitType(visitType)
    {
        var type="";
        if (visitType=1)
        {
           type="Deworming"
        }
        else if (visitType=2) {
            type="Vet visit"
        }
        else {
            type="Farrier visit"
        }
        return type;
    }
    const date = new Date(props.date)
    return (
        <>
            <div className="row rounded py-3 visit-box">
                <div className="col-3 fs-3">{("0" + date.getDay()).slice(-2) + "." + ("0" + date.getMonth()).slice(-2)  + "." + date.getFullYear() }</div>
                <div className="col-3 fs-3">{setVisitType(props.visitType)}</div>
                <div className="col-3 fs-3">{props.description}</div>
                <div className="col-3 d-flex justify-content-start">
                </div>
            </div>
        </>
    );
}

export default VisitComponent;