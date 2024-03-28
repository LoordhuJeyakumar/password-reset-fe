import React, { useContext } from "react";
import { GlobelData } from "../App";
import BackgroundShape from "../components/BackgroundShape";

function Dashboard() {
  const { username, setIsUserLoggedIn } = useContext(GlobelData);

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
                    src="https://cdn.lordicon.com/egmlnyku.json"
                    trigger="hover"
                    state="hover-conversation-alt"
                    style={{ width: "250px", height: "250px" }}
                  ></lord-icon>
                </div>

                <h1 className="text-center text-warning mb-4">Welcome</h1>
                <h2 className="text-center  mb-4">{username}</h2>
                <div className="d-flex justify-content-center p-2 m-2">
                  <button
                    className="btn btn-warning fw-bold"
                    onClick={() => {
                      setIsUserLoggedIn(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
