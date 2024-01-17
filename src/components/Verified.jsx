import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Verified({
  newPassword,
  setNewPassword,
  handleResetPassword,
  resetUser,
  isSuccess,
  setIsSuccess,
}) {
  const resetRef = useRef(null);

  return (
    <div className="card bg-glass-login">
      <div className="card-body px-4 py-5 px-md-5">
        <div className="d-flex justify-content-center ">
          <lord-icon
            src="https://cdn.lordicon.com/xcxzayqr.json"
            trigger="hover"
            stroke="bold"
            state="hover-looking-around"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
        </div>
        <h1 className="text-center mb-4">Reset Password</h1>
        <form
          className="needs-validation"
          noValidate
          ref={resetRef}
          onSubmit={handleResetPassword}
        >
          <div className="form-outline mb-4">
            <h4>User Email : {resetUser ? resetUser.email : ""}</h4>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example4">
              Change Password
            </label>
            <input
              type="password"
              id="form3Example4"
              className="form-control"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
              required
              name="password"
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please enter a passsword.</div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block w-100 mb-1"
          >
            <span role="status">Change Password</span>{" "}
            <span
              className={isSuccess ? "spinner-border spinner-border-sm" : ""}
              aria-hidden="true"
            ></span>
          </button>

          <div className="text-center mt-0 pt-0">
            <p>
              If you remember password <Link to="/login">Login</Link> here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verified;
