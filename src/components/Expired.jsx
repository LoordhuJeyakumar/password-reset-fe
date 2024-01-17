import React from "react";
import { Link } from "react-router-dom";

function Expired() {
  return (
    <div className="  m-5  p-5  infoContainer rounded-4">
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="Verifying fw-bold position-absolut text-warning">
          Link Expired!
        </h2>
        <lord-icon
          src="https://cdn.lordicon.com/lzgqzxrq.json"
          trigger="hover"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
      </div>
      <div className="text-center mt-0 pt-0 w-100 text-info">
        <p>
          Request another link{" "}
          <Link to="/reset-password-link">Forget Password</Link> here
        </p>
      </div>
    </div>
  );
}

export default Expired;
