import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import background from '../media/background.jpg'
import axios from 'axios'
import '../MainPage.css'
import getCookie from "../scripts/cookie";


function FrontPage(props) {
    const cookieExists = getCookie("sessionUserKey");
    let cos = false;
    if (cookieExists != null)
    {
     cos = true;
    }
    return (
        <>
            <div>
                <Navbar site={'FrontPage'} Logged = {cos}/>
            </div>
            {props.Logged ? (
                    <div className='container-fluid'>
                    <div className='row justify-content-center align-items-center'>
                   <div className='col-md-5'>
                        <div className='fs-1 mt-3 mb-0 text-uppercase text-shadow-light'>
                            <p className='fw-bold h1 text-top-logged' style={{"color":'royalblue'}}>stable manager</p>
                        </div>
                   </div>
                </div>
            </div>
            ) : (
                <div className='container-fluid'>
                <div className='row justify-content-center align-items-center'>
                   <div className='col-md-5'>
                        <div className='fs-1 mt-3 mb-0 text-uppercase text-shadow-light'>
                            <p className='fw-bold h1 text-top-logged' style={{"color":'royalblue'}}>stable manager</p>
                        </div>
                   </div>
                </div>
            </div>
            )}
        </>
    )
}

export default FrontPage