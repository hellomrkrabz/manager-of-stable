import React, { useEffect } from "react";
import axios from 'axios'

var sessionUserKey= sessionStorage.getItem("sessionUserKey")

function Logout() {

    useEffect(() => {
        axios.post("http://localhost:8080/api/logout", {
            key: sessionUserKey,
        })
        sessionStorage.removeItem("usernameKey")
        sessionStorage.removeItem("sessionUserKey")
        sessionStorage.removeItem("idKey")
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.replace("/")
    }, []);
}

export default Logout;