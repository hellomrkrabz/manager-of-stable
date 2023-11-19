import logo from './logo.svg';
import './App.css';
import React from "react";
import Router from "react-easy-router";
import Register from "./sites/Register.jsx";
import { BrowserRouter } from 'react-router-dom';
import FrontPage from "./sites/MainPage";
import Login from "./sites/Login";

function App() {
  var routes = [
    {
      path: '/Register',
      element: <Register />,

    },
    {
      path: '/',
      element: <FrontPage />,
    },
    {
      path: '/Login',
      element: <Login />,
    }
  ];

  return(
      <BrowserRouter>
        <Router routes={routes} />
      </BrowserRouter>
  );
}

export default App;