import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [inputs, setInputs] = useState({
    bname: "",
    text: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const clearInputField = () => {
    setInputs({ ...inputs, text: "" });
  };

  const getName = async () => {
    try {
      const response = await fetch(
        "https://ug31-funcbox-server.herokuapp.com/dashboard/",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      setName(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { bname, text };
      const response = await fetch(
        "https://ug31-funcbox-server.herokuapp.com/dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (response.status !== 200) {
        toast.error(parseRes);
      } else {
        toast.success(parseRes);
      }
      clearInputField();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const { bname, text } = inputs;

  return (
    <Fragment>
      <Fragment>
        <form className="login-form" onSubmit={onSubmitForm}>
          <h3 className="text-center">Hello, {name}</h3>

          <div className="form-group ">
            <label htmlFor="bname">Bucket Name</label>
            <input
              name="bname"
              type="text"
              className="form-control"
              id="bname"
              placeholder="Enter Bucket Name"
              value={bname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Input Text</label>
            <textarea
              name="text"
              type="text"
              className="form-control"
              id="text"
              placeholder="Input Text"
              rows="10"
              cols="30"
              value={text}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success btn-block">
            Submit
          </button>
        </form>
      </Fragment>
    </Fragment>
  );
};

export default Dashboard;
