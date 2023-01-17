import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card.js";
import Loader from "../Components/Loader.js";

import { useStateContext } from "../Context/index.js";

const UserCampaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);

    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract]);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (address) {
    return (
      <>
        <div className=" text-white mt-10  font-semibold text-[150%]">
          Your Campaigns
        </div>
        <div className="mt-3  w-[100%] flex flex-wrap gap-6 text-white  font-semibold text-[150%]">
          {campaigns.length <= 0
            ? "No Campaigns to display..."
            : campaigns.map((campaign, i) => {
                return <Card key={i} {...campaign} />;
              })}
        </div>
      </>
    );
  } else {
    navigate("/");
  }
};

export default UserCampaigns;
