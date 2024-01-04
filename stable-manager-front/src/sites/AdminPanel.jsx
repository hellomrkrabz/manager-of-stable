import React, { useEffect, useState } from "react";
import Navbar from "./../components/navbar"
import axios from "axios"
import UsersComponent from "../components/UsersComponent";

function AdminPanel(props) {

    const [users, setUsers] = useState([]);
    const [usersToDisplay, setUsersToDisplay] = useState(users)
    const [isEmpty, setIsEmpty] = useState(1)

    useEffect(() => {
        getUsersData();
    }, []);

    useEffect(()=>{
        console.log("users: "+ users);
    },[users])

    function getUsersData() {

        axios.get("http://localhost:8080/api/unassignedUsers").then((response) => {
            console.log("response: "+ response.data)
            setUsers([response.data]);
            if (response.data !== "")
            {
                setIsEmpty(0)
            }
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    useEffect(() => {
        if(users.length > 0)
        {
            setUsersToDisplay(users)
        }
    }, );

    if (isEmpty === 0) {
    return (

        <>
            <div>
                <Navbar site={"Register"}/>
            </div>
            <div className="col-12 mt-5"  style={{ justifyContent: 'flex-center' }}>
                <div className="container-fluid d-flex flex-column align-items-center">
                    <div className="row row col-10 py-3">
                        <div className="container-fluid d-flex flex-column ">
                            <div className="row visit-box mt-1">
                                <div className="col-3 fs-2">Username</div>
                                <div className="col-3 fs-2">Email</div>
                                <div className="col-3 fs-2">Role</div>
                                <div className="col-3 fs-2">Set Role</div>
                            </div>
                        </div>
                        <div className="overflow-auto" style={{ maxHeight: '75vh' }}>
                            <UsersComponent users={usersToDisplay}/>
                        </div>
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
                <div className="col-12 mt-5"  style={{ justifyContent: 'flex-center' }}>
                    <div className="container-fluid d-flex flex-column align-items-center">
                        <div className="row row col-10 py-3">
                            <div className="container-fluid d-flex flex-column ">
                                <div className="row visit-box mt-1">
                                    <div className="col-3 fs-2">Username</div>
                                    <div className="col-3 fs-2">Email</div>
                                    <div className="col-3 fs-2">Role</div>
                                    <div className="col-3 fs-2">Set Role</div>
                                </div>
                            </div>
                                <div className="col-12 fs-2">No unassigned users</div>
                        </div>
                    </div>
                </div>

            </>);
    }
}

export default AdminPanel;