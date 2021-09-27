import React, { Fragment, useState } from "react";
import "./form.css";

import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const resetInputValue = () => {
    setInputs({ ...inputs, password: "" });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);

        toast.success("Successfully Registered");
      } else {
        setAuth(false);
        toast.error(parseRes);
        resetInputValue();
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Some error");
    }
  };

  const { name, email, password } = inputs;

  return (
    <Fragment>
      <form className="login-form" onSubmit={onSubmitForm}>
        <h3 className="text-center">Register</h3>
        <div className="form-group ">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group ">
          <label htmlFor="email">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success btn-block">
          Register
        </button>
        <br />
        <a href="/login">Already Signed up? Click here to Login</a>
      </form>
    </Fragment>
  );
};

export default Register;
