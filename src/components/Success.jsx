import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="  m-5  p-5  infoContainer rounded-4">
      <div className="d-flex justify-content-center align-items-center">
        <Link className="btn d-flex flex-column" id="loginBtn" to={"/login"}>
          <h2
            className="Verifying fw-bold position-absolut text-warning"
            htmlFor="loginBtn"
          >
            Login
          </h2>
          <lord-icon
            src="https://cdn.lordicon.com/ketnryvr.json"
            trigger="hover"
            style={{ width: "250px", height: "250px" }}
          ></lord-icon>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Success;
