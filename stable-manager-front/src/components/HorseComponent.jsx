import React from "react";
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField";

function HorseComponent(props) {

    console.log(props)

    return (
        <>
            <div className="bg-light rounded-3 d-flex flex-column">
                <div className="bg-banana-blue rounded-top d-flex justify-content-between align-items-center px-2 py-1 fw-semibold">
                    {props.details.username}
                    <div className="col-7">
                        <div className={"button"}><TextField className={"button"} id="name" fullWidth label={"Name"} type={'text'}/></div>
                    </div>
                </div>
                <div className="flex-grow-1 d-flex px-3 pt-3">
                    <p className="col-9 overflow-hidden" style={{height: "70px",}}>{props.details.content}</p>
                    <div className="col-2 d-flex justify-content-end align-items-end align-self-bottom flex-grow-1">

                    </div>
                </div>
            </div>
        </>
    );
}

export default HorseComponent;