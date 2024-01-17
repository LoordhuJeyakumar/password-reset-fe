import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GlobelData } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPasswordLink() {
  const { email, setEmail } = useContext(GlobelData);
  const resetRef = useRef(null);
  const [emailSent, setEmailSent] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = async (event) => {
    setIsSent(true);
    event.preventDefault();
    let useremail = { email };

    // Prevent form submission if there are any invalid fields
    if (!resetRef.current.checkValidity()) {
      toast.error("Please fill out all required fields");
      event.preventDefault();
      event.stopPropagation();
    }
    // Add 'was-validated' className to the form to show validation feedback
    resetRef.current.classList.add("was-validated");

    // If the form is valid, proceed with user details submission
    if (resetRef.current.checkValidity()) {
      try {
        // Send user details to the server using an HTTP POST request
        const response = await axios.post(
          "http://localhost:3333/passwordResetToken",
          useremail
        );
        event.preventDefault();
        // Reset form state to initial values
        setEmail("");
        // Display success toast message
        setEmailSent(true);
        setIsSent(false);
        toast.success("Email Sent Successfuly");
      } catch (error) {
        console.log(error);
        if (error.response.status === 409) {
          setEmail("");
          setIsSent(false);
          toast.error(error.response.data.message);
        }
        toast.error(error.response.data.message);
        setIsSent(false);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <section className="background-radial-gradient-reset overflow-hidden vh-100 ">
        <div className="container px-4 py-1 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5 justify-content-center">
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>
              <div
                id="radius-shape-4"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-6"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass-reset">
                <div className="card-body px-4 py-5 px-md-5">
                  {emailSent ? (
                    <>
                      <h2 className="text-warning">Please Check Your Email</h2>
                      <lord-icon
                        src="https://cdn.lordicon.com/tmqaflqo.json"
                        trigger="hover"
                        style={{ width: "250px", height: "250px" }}
                      ></lord-icon>
                    </>
                  ) : (
                    <>
                      <h1 className="text-center mb-4">
                        Send Reset Password-link
                      </h1>
                      <form
                        onSubmit={handleReset}
                        className="needs-validation"
                        noValidate
                        ref={resetRef}
                      >
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="name@example.com"
                            name="email"
                            required
                            value={email}
                            onChange={(event) => {
                              setEmail(event.target.value.toLocaleLowerCase());
                            }}
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Please enter a email.
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block w-100 mb-1"
                        >
                          <span role="status">Send Link</span>{" "}
                          <span
                            className={
                              isSent ? "spinner-border spinner-border-sm" : ""
                            }
                            aria-hidden="true"
                          ></span>
                        </button>

                        <div className="text-center mt-0 pt-0">
                          <p>
                            If you don't have an account{" "}
                            <Link to="/signup">Create Account</Link> here
                          </p>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPasswordLink;
