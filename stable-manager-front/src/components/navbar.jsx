import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorse } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import getCookie from "../scripts/cookie";

const Header = (props) => {
    var roleKey = Number(getCookie("roleKey"));
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":'darkturquoise'}}>
                    <FontAwesomeIcon icon ={faHorse}/> Stable Manager
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    </Nav>
                    {props.site === "Login" &&
                        <Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Register"}}>Register</Button>
                    }
                    {props.site === "Register" &&
                        <Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Login"}}>Login</Button>
                    }
                    {props.site === "Profile" &&
                        <Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Logout"}}>Logout</Button>
                    }
                    {props.site === "FrontPage" && props.Logged ?
                        <>(
                        <>
                        <Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Logout"}}>Logout</Button>
                        </>)
                        </>
                        :
                        <>(
                            <>
                                {/*<Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Register"}}>Register</Button>
                                <Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Login"}}>Login</Button>*/}
                                {
                                    /*<Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Profile"}}>Profile</Button>*/}
                            </>
                            )
                        </>
                    }
                    {/*<Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Login"}}>Login</Button>*/}
                    {/*<Button variant="outline-info" className="me-2" onClick={()=>{window.location.href="/Register"}}>Register</Button>*/}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
