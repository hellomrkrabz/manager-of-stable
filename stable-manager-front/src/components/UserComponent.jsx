import React, {useEffect, useState} from "react";
import '../horses.css'
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

function UserComponent(props) {
    const [userRole, setUserRole]=useState(5);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    function submit() {
        axios.post("http://localhost:8080/api/switchRole/" + props.details.username, {
            username: props.details.username,
            role: userRole
        }).then((response) => {
            window.location.reload();
        })
    }

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    if (dropdownOpen !== true) {
    return (
        <>
            <div className="row rounded py-2 visit-box mt-2">
                <div className="col-2 fs-2">{props.details.username }</div>
                <div className="col-4 fs-2">{props.details.email}</div>
                <Dropdown className={"col-3 fs-2"}
                          onToggle={handleDropdownClick}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        User role
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => {setUserRole(1)}}>Administrator</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {setUserRole(2)}}>Trainer</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {setUserRole(3)}}>Horse owner</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {setUserRole(4)}}>Stable staff</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant="outline-info" className="col-2 mt-2 mb-2" onClick={() => {submit() }} id="submit" name="submit">Assign role</Button>
                <div className="col-3 d-flex justify-content-start">
                </div>
            </div>
        </>
    );}
    else {
        return (
            <>
                <div className="row rounded  visit-box mt-2" style={{ height: '25vh' }}>
                    <div className="col-2 fs-2">{props.details.username }</div>
                    <div className="col-4 fs-2">{props.details.email}</div>
                    <Dropdown className={"col-3 fs-2"}
                              onToggle={handleDropdownClick}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            User role
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => {setUserRole(1)}}>Administrator</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {setUserRole(2)}}>Trainer</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {setUserRole(3)}}>Horse owner</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {setUserRole(4)}}>Stable staff</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="outline-info" className="col-2 mt-2 mb-2" onClick={() => {submit() }} id="submit" name="submit">Assign role</Button>
                    <div className="col-3 d-flex justify-content-start">
                    </div>
                </div>
            </>
        );
    }
}

export default UserComponent;