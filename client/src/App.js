import React from "react";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Routes, Route } from "react-router-dom";
import CreateCampaign from "./Pages/CreateCampaign";
import Home from "./Pages/Home";
import CampaignDetails from "./Pages/CampaignDetails";
import UserCampaigns from "./Pages/UserCampigns";

const App = () => {
  return (
    <>
      <div className=" p-4 bg-[#13131a] flex h-screen">
        <div className="mr-10 ">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 pl-10">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/createCampaign" element={<CreateCampaign />}></Route>
            <Route
              path="/campaignDetails/:id"
              element={<CampaignDetails />}
            ></Route>
            <Route path="/userCampaigns" element={<UserCampaigns />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
