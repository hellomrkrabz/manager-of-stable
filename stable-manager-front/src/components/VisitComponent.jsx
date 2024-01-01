import React, {useState} from "react";
import '../horses.css'

function VisitComponent(props, details) {
    const { visitType, visitDate, description } = details;

    function setVisitType()
    {
        var type="";
        if (props.details.visitType==1)
        {
           type="Deworming"
        }
        else if (props.details.visitType==2) {
            type="Vet visit"
        }
        else {
            type="Farrier visit"
        }
        return type;
    }
    const date = new Date(props.details.date)
    console.log("desc " + setVisitType(props.details.visitType));
    return (
        <>
            <div className="row rounded py-3 visit-box mt-2">
                <div className="col-3 fs-3">{("0" + date.getDay()).slice(-2) + "." + ("0" + (date.getMonth()+1)).slice(-2)  + "." + date.getFullYear() }</div>
                <div className="col-3 fs-3">{setVisitType()}</div>
                <div className="col-3 fs-3">{props.details.description}</div>
                <div className="col-3 d-flex justify-content-start">
                </div>
            </div>
        </>
    );
}

export default VisitComponent;