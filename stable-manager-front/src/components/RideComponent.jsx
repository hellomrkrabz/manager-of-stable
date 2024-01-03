import React, {useEffect, useState} from "react";
import '../horses.css'
import axios from "axios";

function RideComponent(props) {
    const [trainerName, setTrainerName] = useState("");
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

    useEffect(() => {
        getTrainer();
    }, []);

    function getTrainer()
    {
        axios.get("http://localhost:8080/api/dataID/" + props.details.trainerId).then((response) => {
            console.log(response.data);
            setTrainerName(response.data.username);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <>
            <div className="row rounded py-2 visit-box mt-2">
                <div className="col-3 fs-3">{props.details.clientName }</div>
                <div className="col-3 fs-3">{setGroup()}</div>
                <div className="col-3 fs-3">{props.details.dateBegin + "-" +props.details.dateEnd}</div>
                <div className="col-3 fs-3">{trainerName}</div>
                <div className="col-3 d-flex justify-content-start">
                </div>
            </div>
        </>
    );
}

export default RideComponent;