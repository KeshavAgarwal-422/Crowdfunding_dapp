import React from "react";
import { useNavigate } from "react-router-dom";
import profileUser from "../assets/profileUser.svg";
import search from "../assets/search.svg";
import { useStateContext } from "../Context";

const Navbar = () => {
  const { connect, address } = useStateContext();
  const navigate = useNavigate();

  const handleClick = () => {
    address ? navigate("/createCampaign") : connect();
  };
  return (
    <div className="flex flex-row items-center  gap-5 ">
      <div className="flex flex-1 items-center justify-end bg-[#1c1c24] h-10  p-2 rounded-2xl">
        <input
          type="search"
          placeholder="Search for campaigns"
          className="w-full bg-transparent placeholder:text-[#4b5264] placeholder:pl-3 text-white outline-none"
        />
        <div className=" flex justify-center items-center bg-[#4acd8d] h-8 w-[10%] rounded-2xl hover:cursor-pointer">
          <img src={search} alt="No Image!" />
        </div>
      </div>
      <div className="justify-end ml-3">
        <button
          onClick={handleClick}
          className="ml-12 h-10 w-auto bg-[#8c6dfd] p-2 rounded-xl  text-white hover:cursor-pointer hover:bg-purple-700 "
        >
          {address ? "Create Campaign" : "Connect Wallet"}
        </button>
      </div>
      <div className="justify-end" onClick={() => navigate("/userCampaigns")}>
        <img
          src={profileUser}
          alt="No image!"
          className="h-10 bg-[#1c1c24] rounded-full hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
