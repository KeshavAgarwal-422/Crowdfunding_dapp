import React, { useState, useEffect } from "react";
import Card from "../Components/Card.js";
import Loader from "../Components/Loader.js";

import { useStateContext } from "../Context/index.js";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
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

  return (
    <>
      <div className=" text-white mt-10  font-semibold text-[150%]">
        All Campaigns
      </div>
      <div className="mt-3  w-[100%] flex flex-wrap gap-6">
        {campaigns.map((campaign, i) => {
          return <Card key={i} {...campaign} />;
        })}
      </div>
    </>
  );
};

export default Home;
