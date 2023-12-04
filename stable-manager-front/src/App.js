import logo from './logo.svg';
import './App.css';
import React from "react";
import Router from "react-easy-router";
import Register from "./sites/Register.jsx";
import { BrowserRouter } from 'react-router-dom';
import FrontPage from "./sites/MainPage";
import Login from "./sites/Login";
import Profile from "./sites/Profile";
import getCookie from './scripts/cookie';
import Logout from './sites/Logout'

var sessionUserKey = getCookie("sessionUserKey");
var usernameKey = getCookie("usernameKey");
var idKey = getCookie("idKey");
function App() {
  if (sessionUserKey !== undefined) {
    var routes = [
      {
        path: '/',
        element: <FrontPage Logged={true}/>
      },
      {
        path: '/Profile',
        element: <Profile />
      },
      {
        path: '/Logout',
        element: <Logout/>
      }
    ]

  }
  else {
  var routes = [
    {
      path: '/Register',
      element: <Register />,

    },
    {
      path: '/',
      element: <FrontPage Logged={false}/>,
    },
    {
      path: '/Login',
      element: <Login />,
    }
  ];}

  return(
      <BrowserRouter>
        <Router routes={routes} />
      </BrowserRouter>
  );
}

export default App;