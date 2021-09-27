import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navigation.js";
import Login from "./components/Login.js";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ListBucket from "./components/ListBucket";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (Boolean) => {
    setIsAuthenticated(Boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch(
        "https://ug31-funcbox-server.herokuapp.com/auth/verify",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      console.log(parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Router>
      <Navbar setAuth={setAuth} isAuthenticated={isAuthenticated} />
      <Switch>
        <Fragment>
          <ToastContainer />

          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />

          <Route
            exact
            path="/dashboard"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Route
            exact
            path="/bucket"
            render={(props) => (
              <ListBucket
                {...props}
                setAuth={setAuth}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
        </Fragment>
      </Switch>
    </Router>
  );
}

export default App;
