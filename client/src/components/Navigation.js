import React, { Fragment } from "react";
import { toast } from "react-toastify";

const Navigation = ({ setAuth, isAuthenticated }) => {
  const onClickLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("You Loggedout successfully");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/dashboard">
          Dashboard
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/bucket">
              Bucket <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>

        <div
          className=" navbar-collapse w-50 order-1 dual-collapse2"
          // className="collapse navbar-collapse w-100 order-3 dual-collapse2"
          id="navbarSupportedContent"
        >
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item active">
              {!isAuthenticated === true && (
                <a className="nav-link" href="/login">
                  Login <span className="sr-only">(current)</span>
                </a>
              )}
            </li>
            <li className="nav-item active">
              {!isAuthenticated === true && (
                <a className="nav-link" href="/register">
                  Register
                </a>
              )}
            </li>

            <li className="nav-item active">
              {isAuthenticated === true && (
                <a className="nav-link" href="/login" onClick={onClickLogout}>
                  Logout
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navigation;
