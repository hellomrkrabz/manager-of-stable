import React, {useState} from "react";
import '../horses.css'

function RideComponent(props, details) {
    const { clientName, groupRide } = details;

    function setGroup()
    {
        var type="";
        if (props.details.groupRide===1)
        {
            type="Group"
        }
        else {
            type="Individual"
        }
        return type;
    }
    //const date = new Date(props.details.date)
    //console.log("desc " + setVisitType(props.details.visitType));
    return (
        <>
            <div className="row rounded py-3 visit-box mt-2">
                <div className="col-3 fs-3">{props.details.clientName }</div>
                <div className="col-3 fs-3">{setGroup()}</div>
                <div className="col-3 d-flex justify-content-start">
                </div>
            </div>
        </>
    );
}

export default RideComponent;