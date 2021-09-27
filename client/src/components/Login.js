import React, { Fragment, useState } from "react";
import "./form.css";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
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
      const body = { email, password };
      const response = await fetch(
        "https://ug31-funcbox-server.herokuapp.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);

        toast.success("Logged in successfully!");
      } else {
        console.error(parseRes);
        toast.error(parseRes);
        resetInputValue();
      }
    } catch (err) {
      setAuth(false);
      console.error(err.message);
    }
  };

  const { email, password } = inputs;

  return (
    <Fragment>
      <form className="login-form" onSubmit={onSubmitForm}>
        <h3 className="text-center">Login</h3>
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
          Login
        </button>
        <br />
        <a href="/register">Don't Have an Account? Register Here</a>
      </form>
    </Fragment>
  );
};

export default Login;
