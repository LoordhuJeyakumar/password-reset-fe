import React from "react";

function Verifying() {
  return (
    <div className="d-flex  m-5  p-5 justify-content-center align-items-center infoContainer rounded-4">
      <h2 className="Verifying fw-bold position-absolute text-warning">
        Verifying....
      </h2>
      <div
        className="spinner-border text-warning spin"
        role="status"
        style={{ width: 200, height: 200, fontSize: 50 }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Verifying;
