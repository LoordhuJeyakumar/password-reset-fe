import React, { useContext, useRef, useState } from "react";
import Reactlogo from "../assets/react.svg";
import BootstrapLogo from "../assets/bootstrap-logo-shadow.png";
import NodeJSLogo from "../assets/nodejs logo.svg";
import axiosLogo from "../assets/axios-logo.svg";
import reactrouterLogo from "../assets/react-router-color-inverted.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { GlobelData } from "../App";

function Signup() {
  let {
    setGetData,
    username,
    email,
    password,
    setEmail,
    setPassword,
    setUserName,
    API_URL,
  } = useContext(GlobelData);
  const [isUserAdded, setIsUserAdded] = useState(false);
  const addUserRef = useRef(null);

  const handleInputChange = (event) => {
    event.preventDefault();

    switch (event.target.name) {
      case "fullname":
        setUserName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  };

  const handleCreateUser = async (event) => {
    setIsUserAdded(true);
    const newUser = {
      username,
      email,
      password,
    };
    event.preventDefault();
    // Prevent form submission if there are any invalid fields
    if (!addUserRef.current.checkValidity()) {
      toast.error("Please fill out all required fields");
      setIsUserAdded(false);
      event.preventDefault();
      event.stopPropagation();
    }
    // Add 'was-validated' className to the form to show validation feedback
    addUserRef.current.classList.add("was-validated");

    // If the form is valid, proceed with user details submission
    if (addUserRef.current.checkValidity()) {
      try {
        // Send user details to the server using an HTTP POST request
        const response = await axios.post(
          `${API_URL}/users/createUser`,
          newUser
        );
        event.preventDefault();
        // Reset form state to initial values
        setGetData(false);
        setUserName("");
        setPassword("");
        setEmail("");
        // Display success toast message
        setIsUserAdded(false);
        toast.success("User successfully added");
        setGetData(true);
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(error.response.data.message);
          setUserName("");
          setPassword("");
          setEmail("");
        }
        console.log(error);
      }
    }
  };

  return (
    <div>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-1 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className=" display-6 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                Password Reset Flow
              </h1>
              <h3>
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  Create Account | Login | Reset Password
                </span>
              </h3>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                This project build with
                <br />
                <b>Front-end</b>
                <li>
                  React <img src={Reactlogo} width={15} alt="" />
                </li>
                <li>
                  Bootstrap <img src={BootstrapLogo} width={15} alt="" />
                </li>
                <li>
                  <img src={axiosLogo} width={65} alt="" />
                </li>
                <li>
                  <img src={reactrouterLogo} width={95} alt="" />
                </li>
                <li>React Tostify</li>
                <br />
                <b>Back-end Stacks</b>
                <li>
                  <img src={NodeJSLogo} width={55} alt="" />
                </li>
                <li>ExpressJS </li>
                <li>bcrypt </li>
                <li>JWT </li>
                <li>Mongoose</li>
                <li>nodemailer</li>
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <h1 className="text-center mb-4">Create Account</h1>
                  <form
                    onSubmit={handleCreateUser}
                    className="needs-validation"
                    noValidate
                    ref={addUserRef}
                  >
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="fullname">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        id="fullname"
                        className="form-control"
                        placeholder="Enter your fullname"
                        value={username}
                        onChange={handleInputChange}
                        name="fullname"
                        autoComplete="username"
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Please enter a fullname.
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
                        Email address
                      </label>
                      <input
                        autoComplete="email"
                        required
                        name="email"
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={email}
                        onChange={handleInputChange}
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Please enter a email.
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        autoComplete="current-password"
                        required
                        name="password"
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handleInputChange}
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Please enter a passsword.
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block w-100 mb-4"
                    >
                      <span role="status">Create Account</span>{" "}
                      <span
                        className={
                          isUserAdded ? "spinner-border spinner-border-sm" : ""
                        }
                        aria-hidden="true"
                      ></span>
                    </button>

                    <div className="text-center">
                      <p>
                        Already have an account <Link to="/login">login</Link>{" "}
                        here
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
