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
import AdminPanel from "./sites/AdminPanel";
import AddHorse from "./sites/AddHorse";
import Horses from "./sites/Horses";
import HorseProfile from "./sites/HorseProfile";
import AddVisit from "./sites/AddVisit";
import Rides from "./sites/Rides";
import AddRide from "./sites/AddRide";
import Costs from "./sites/Costs";
import AddCost from "./sites/AddCost";

var sessionUserKey = getCookie("sessionUserKey");
var usernameKey = getCookie("usernameKey");
var idKey = getCookie("idKey");
var roleKey = Number(getCookie("roleKey"));
function App() {
  console.log("roleKey: "+roleKey)
  console.log("roleKey type: "+typeof(roleKey))
  if (sessionUserKey !== undefined) {
    if (roleKey === 1) {
    var routes = [
      {
        path: '/',
        element: <FrontPage Logged={true}/>
      },
      {
        path: '/Profile',
        element: <Profile Logged={true}/>
      },
      {
        path: '/Logout',
        element: <Logout/>
      },
      {
        path: '/Admin',
        element: <AdminPanel/>
      },
      {
        path: '/AddHorse',
        element: <AddHorse/>
      },
      {
        path: '/Horses',
        element: <Horses/>
      },
      {
        path: '/HorseProfile/:id',
        element: <HorseProfile/>
      },
      {
        path: '/AddVisit/:id',
        element: <AddVisit/>
      },
      {
        path: '/Rides',
        element: <Rides/>
      },
      {
        path: '/AddRide',
        element: <AddRide/>
      },
      {
        path: '/Costs',
        element: <Costs/>
      },
      {
        path: '/AddCost',
        element: <AddCost/>
      }
    ]}
    else if (roleKey === 2) {
      var routes = [
        {
          path: '/',
          element: <FrontPage Logged={true}/>
        },
        {
          path: '/Profile',
          element: <Profile Logged={true}/>
        },
        {
          path: '/Logout',
          element: <Logout/>
        },
        {
          path: '/Horses',
          element: <Horses/>
        },
        {
          path: '/HorseProfile/:id',
          element: <HorseProfile/>
        },
        {
          path: '/Rides',
          element: <Rides/>
        },
        {
          path: '/AddRide',
          element: <AddRide/>
        }
      ]
    }
    else if (roleKey === 3) {
      var routes = [
        {
          path: '/',
          element: <FrontPage Logged={true}/>
        },
        {
          path: '/Profile',
          element: <Profile Logged={true}/>
        },
        {
          path: '/Logout',
          element: <Logout/>
        },
        {
          path: '/AddHorse',
          element: <AddHorse/>
        },
        {
          path: '/Horses',
          element: <Horses/>
        },
        {
          path: '/HorseProfile/:id',
          element: <HorseProfile/>
        },
        {
          path: '/AddVisit/:id',
          element: <AddVisit/>
        }
      ]
    }
    else if (roleKey === 4) {
      var routes = [
        {
          path: '/',
          element: <FrontPage Logged={true}/>
        },
        {
          path: '/Profile',
          element: <Profile Logged={true}/>
        },
        {
          path: '/Logout',
          element: <Logout/>
        },
        {
          path: '/Horses',
          element: <Horses/>
        },
        {
          path: '/HorseProfile/:id',
          element: <HorseProfile/>
        },
        {
          path: '/AddVisit/:id',
          element: <AddVisit/>
        },
        {
          path: '/Costs',
          element: <Costs/>
        },
        {
          path: '/AddCost',
          element: <AddCost/>
        }
      ]
    }
    else {
      var routes = [
        {
          path: '/',
          element: <FrontPage Logged={true}/>
        },
        {
          path: '/Profile',
          element: <Profile Logged={true}/>
        },
        {
          path: '/Logout',
          element: <Logout/>
        }
      ]
    }

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
console.log(routes)
  return(
      <BrowserRouter>
        <Router routes={routes} />
      </BrowserRouter>
  );
}

export default App;