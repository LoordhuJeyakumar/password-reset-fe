import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL, GlobelData } from "../App";
import BackgroundShape from "../components/BackgroundShape";

function Login() {
  let {
    setUserName,
    email,
    password,
    setEmail,
    setPassword,
    setIsUserLoggedIn,
    setGetData,
  } = useContext(GlobelData);
  const loginRef = useRef(null);
  const navigate = useNavigate();
  const [isUserAdded, setIsUserAdded] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  };

  const handleLogin = async (event) => {
    setIsUserAdded(true);
    const userCredentials = {
      email,
      password,
    };
    event.preventDefault();
    // Prevent form submission if there are any invalid fields
    if (!loginRef.current.checkValidity()) {
      toast.error("Please fill out all required fields");
      event.preventDefault();
      event.stopPropagation();
      setIsUserAdded(false);
    }
    // Add 'was-validated' className to the form to show validation feedback
    loginRef.current.classList.add("was-validated");

    // If the form is valid, proceed with user details submission
    if (loginRef.current.checkValidity()) {
      try {
        // Send user details to the server using an HTTP POST request
        const response = await axios.post(`${API_URL}/login`, userCredentials);

        setUserName(response.data.username);
        event.preventDefault();
        // Reset form state to initial values
        setPassword("");
        setEmail("");
        // Display success toast message
        setIsUserAdded(false);
        setGetData(false);
        toast.success("User successfully loggedin");
        setIsUserLoggedIn(true);

        navigate("/dashboard");
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(error.response.data.message);
          setPassword("");
          setEmail("");
        }
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="background-radial-gradient overflow-hidden vh-100">
      <div className="container px-4 py-1 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5 justify-content-center">
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <BackgroundShape />

            <div className="card bg-glass-login">
              <div className="card-body px-4 py-5 px-md-5">
                <div className="d-flex justify-content-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/xcxzayqr.json"
                    trigger="hover"
                    stroke="bold"
                    state="hover-looking-around"
                    style={{ width: "100px", height: "100px" }}
                  ></lord-icon>
                </div>
                <h1 className="text-center mb-4">Login</h1>
                <form
                  className="needs-validation"
                  noValidate
                  ref={loginRef}
                  onSubmit={handleLogin}
                >
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      placeholder="name@example.com"
                      value={email}
                      onChange={handleInputChange}
                      required
                      name="email"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please enter a email.
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handleInputChange}
                      required
                      name="password"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please enter a passsword.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block w-100 mb-1"
                  >
                    <span role="status">Login</span>{" "}
                    <span
                      className={
                        isUserAdded ? "spinner-border spinner-border-sm" : ""
                      }
                      aria-hidden="true"
                    ></span>
                  </button>

                  <div className="text-center mt-0 pt-0">
                    <div className="mb-2 mt-0 fw-bold text-warning">
                      <Link
                        className="font-monospace "
                        to="/reset-password-link"
                      >
                        Forget Password
                      </Link>
                    </div>
                    <p>
                      If you don't have an account{" "}
                      <Link to="/signup">Create Account</Link> here
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
