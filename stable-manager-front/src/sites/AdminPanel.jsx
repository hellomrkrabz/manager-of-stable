import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import background from '../media/background.jpg'
import axios from 'axios'
import '../AdminPanel.css'
import getCookie from "../scripts/cookie";
import userToVerify from "../components/UserToVerify";
import UserToVerify from "../components/UserToVerify";
import {v4} from 'uuid';

function AdminPanel(props) {
    const cookieExists = getCookie("sessionUserKey");
    let cos = false;
    const [users, setUsers] = useState([])
    const [displayDetails, setDisplayDetails] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
        getData();
    }, []);
    function getData() {
        const url = "http://localhost:8080/api/data/"+usernameKey;
        axios.get(url)
            .then((response) => {
                setUsername(response.data.username);
                setPassword(response.data.password);
                setEmail(response.data.email);
                setId(response.data.id);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    if (cookieExists != null)
    {
        cos = true;
    }
    return (
        <>
            <div>
                <Navbar site={'FrontPage'} Logged = {cos}/>
            </div>
            <>
                <div className="box-width-admin d-flex flex-column align-items-center mx-auto ">
                    <>
                        <div className="container-fluid d-flex flex-column align-items-center">
                            <div className="row row col-11 py-3">
                                <div className="col-3 fs-2">Date of registration</div>
                                <div className="col-3 fs-2">Username</div>
                                <div className="col-3 fs-2">Email</div>
                                <div className="col-3 fs-2">Action</div>
                            </div>

                            {users.map((r)=><UserToVerify user={{...r}} setDisplayDetails={setDisplayDetails} setUser={setUser} key={v4()}/>)}
                            {users.length===0 &&
                                <div>Nothing here</div>
                            }
                        </div>
                    </>
                </div>
            </>
        </>
    )
}

export default AdminPanel