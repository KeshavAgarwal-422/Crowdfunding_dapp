import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import createcampaign from "../assets/create-campaign.svg";
import payment from "../assets/payment.svg";
import profile from "../assets/profile.svg";
import logout from "../assets/logout.svg";
import sun from "../assets/sun.svg";
import { useStateContext } from "../Context";

const Sidebar = () => {
  const { disconnect } = useStateContext();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-between items-center  sticky h-[93vh] ">
        <div
          className="w-[50px] h-[50px] flex justify-center items-center rounded-lg bg-[#2c2f32] hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="No image!" className="w-10 h-10" />
        </div>
        <div className=" flex flex-1 flex-col items-center bg-[#1c1c24] mt-12 gap-12 w-[76px] rounded-lg">
          <Link to="/">
            <img
              src={dashboard}
              alt="No image!"
              className="mt-10 hover:cursor-pointer"
            />
          </Link>
          <Link to="/createCampaign">
            <img
              src={createcampaign}
              alt="No image!"
              className="hover:cursor-pointer"
            />
          </Link>

          <img src={payment} alt="No image!" className="hover:cursor-pointer" />
          <Link to="/userCampaigns">
            <img
              src={profile}
              alt="No image!"
              className="hover:cursor-pointer"
            />
          </Link>
          <img
            src={logout}
            alt="No image!"
            className="hover:cursor-pointer"
            onClick={disconnect}
          />

          <img
            src={sun}
            alt="No image!"
            className="  mt-80 hover:cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
