import React, { useEffect } from "react";
import axios from 'axios'

var sessionUserKey= sessionStorage.getItem("sessionUserKey")

function Logout() {

    useEffect(() => {
        sessionStorage.removeItem("usernameKey")
        sessionStorage.removeItem("sessionUserKey")
        sessionStorage.removeItem("idKey")
        sessionStorage.removeItem("roleKey")
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        window.location.replace("/")
    }, []);
}

export default Logout;