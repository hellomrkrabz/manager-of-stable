import React, {useEffect, useState} from "react";
import '../horses.css'
import axios from "axios";

function CostComponent(props) {
    const [managerName, setManagerName] = useState("");

    useEffect(() => {
        getManager();
    }, []);

    function getManager()
    {
        axios.get("http://localhost:8080/api/dataID/" + props.details.managerId).then((response) => {
            console.log(response.data);
            setManagerName(response.data.username);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <>
            <div className="row rounded py-2 visit-box mt-2">
                <div className="col-3 fs-3">{props.details.title }</div>
                <div className="col-3 fs-3">{props.details.amount}</div>
                <div className="col-3 fs-3">{props.details.description}</div>
                <div className="col-3 fs-3">{managerName}</div>
                <div className="col-3 d-flex justify-content-start">
                </div>
            </div>
        </>
    );
}

export default CostComponent;