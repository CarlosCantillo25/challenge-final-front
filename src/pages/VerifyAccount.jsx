import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api.js"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function VerifyAccount() {

    const [verificationCode, setVerificationCode] = useState("");
    const [isVerified, setIsVerified] = useState(true);

    const handleVerificationSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(apiUrl + "auth/verify/" + verificationCode);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Account verified successfully.",
          text: "You can now sign in to your Google account!",
          showConfirmButton: false,
          timer: 3000,
        });

        navigate('/signin')

      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Error.",
          text: "The verification code is invalid. Please check the code and try again.",
        });
      }
    } catch (error) {
      console.error("Verification failed:", error);
      Swal.fire({
        icon: "error",
        title: "Verification failed.",
        text: "The verification code is invalid. Please check the code and try again.",
      });
    }
  }

  const closeVerified = () => {
    setIsVerified(false);
  };

  return (
    <div className="flex flex-col w-full min-h-[25vh] items-center justify-around bg-[#FFFBEB]">
      <button onClick={closeVerified}><img src="/close.png" className="h-7 ms-[40%] mt-[-5%]" /></button>
      <form onSubmit={handleVerificationSubmit} className="flex mt-[-10%]">
        <label className="text-[color:var(--secondary-gray,#9D9D9D)] text-base not-italic font-normal leading-[normal]">Enter Verification Code:</label>
        <div className="ms-5 mt-[-20px]">
            <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required className="bg-[#FFFBEB] border-b-2 border-slate-400 p-2" />
            <div className="mt-5 flex flex-col w-[200px] gap-2.5 p-2 rounded-[50000px] bg-[#007BFF]">
                <button type="submit" className="text-white text-center text-lg not-italic font-bold leading-[normal]">Verify</button>
            </div>
        </div>
      </form>
    </div>
  )
}
