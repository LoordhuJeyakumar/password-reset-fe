import React, { useEffect, useState } from "react";
import { API_URL } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BackgroundShape from "../components/BackgroundShape";
import Verifying from "../components/Verifying";
import Verified from "../components/Verified";
import Expired from "../components/Expired";
import Invalid from "../components/Invalid";
import Success from "../components/Success";

function PasswordReset() {
  const [resetUser, SetResetUser] = useState(null);
  const [tokenStatus, setTokenStatus] = useState("verifying");
  const [newPassword, setNewPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const params = useParams();
  const { id, token } = params;

  async function getUserDetails() {
    try {
      let singleUser = await axios.get(`${API_URL}/users/${id}`);

      SetResetUser(singleUser.data.user);
      return singleUser;
    } catch (error) {
      console.log(error);
    }
  }

  const verifyResetToken = async () => {
    setTokenStatus("verifying");
    const resetToken = {
      resetToken: token,
    };
    try {
      await axios.post(`${API_URL}/verifyResetToken`, resetToken);

      setTokenStatus("verified");
    } catch (error) {
      if (error.response.data === "ResetToken Expired") {
        setTokenStatus("expired");
        toast.error("Link expired please generate new reset link");
      } else if (error.response.data === "ResetToken is not valid") {
        setTokenStatus("invalid");
        toast.error("Invalid Reset Link");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      verifyResetToken();
      getUserDetails();
    };
  }, []);

  const handleResetPassword = async (event) => {
    setIsSuccess(true);
    event.preventDefault();
    try {
      if (newPassword) {
        let changePasswordObj = {
          resetToken: token,
          newPassword,
        };
        await axios.post(`${API_URL}/resetPassword`, changePasswordObj);
        setTokenStatus("success");
        setIsSuccess(false);
        toast.success("Password changed successfully");

        setNewPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPage = () => {
    if (tokenStatus == "verifying") {
      return <Verifying />;
    } else if (tokenStatus == "verified") {
      return (
        <Verified
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          handleResetPassword={handleResetPassword}
          resetUser={resetUser}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      );
    } else if (tokenStatus == "expired") {
      return <Expired />;
    } else if (tokenStatus == "invalid") {
      return <Invalid />;
    } else if (tokenStatus == "success") {
      return <Success />;
    }
  };

  return (
    <div className="background-radial-gradient overflow-hidden vh-100">
      <div className="container px-4 py-1 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5 justify-content-center">
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <BackgroundShape />
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
