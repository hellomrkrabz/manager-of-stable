import React, { useEffect } from "react";
import axios from 'axios'

var sessionUserKey= sessionStorage.getItem("sessionUserKey")

function Logout() {

    useEffect(() => {
        axios.post("http://localhost:8080/api/logout", {
            key: sessionUserKey,
        })
        // sessionStorage.removeItem("sessionUserUsername")
        // sessionStorage.removeItem("sessionUserKey")
        // sessionStorage.removeItem("sessionPermissions")
        // sessionStorage.removeItem("sessionUserId")
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.replace("/")
    }, []);
}

export default Logout;