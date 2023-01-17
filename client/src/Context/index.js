import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { contract } = useContract(
    "0x8524d038478Ab97B9aA1c0F3a76Fc8a458a84E6f"
  );
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.campaignTitle,
        form.story,
        form.goal,

        new Date(form.endDate).getTime(),
        form.campaignImage,
      ]);

      console.log("contract call successfull..", data);
    } catch (err) {
      console.log("contract call failure...", err);
    }
  };

  const getCampaigns = async () => {
    const data = await contract.call("getCampaigns");

    const parsedCampaings = data.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getUserCampaigns = async () => {
    try {
      if (address) {
        const data = await contract.call("getCampaigns");

        const UserCampaigns = data.filter(
          (campaign) => campaign.owner === address
        );

        const parsedUserCampaigns = UserCampaigns.map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: i,
        }));
        return parsedUserCampaigns;
      } else {
        alert("Please connect wallet!");
      }
    } catch (error) {
      console.log("failed to fetch User Campaigns....", error);
    }
  };

  const getDonators = async (pId) => {
    try {
      const donators = await contract.call("getDonators", pId);

      const numberOfDonators = donators[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonators; i++) {
        parsedDonations.push({
          donator: donators[0][i],
          donation: ethers.utils.formatEther(donators[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (error) {
      console.log("Failed to call getDonators", error);
    }
  };

  const donate = async (pId, amount) => {
    try {
      if (address) {
        const data = await contract.call("donateToCampaign", pId, {
          value: ethers.utils.parseEther(amount),
        });
      } else {
        alert("Please connect wallet!");
        navigate("");
      }
    } catch (error) {
      console.log("Failed to donate ...... retry", error);
    }
  };

  return (
    <stateContext.Provider
      value={{
        contract,
        address,
        disconnect,
        connect,
        publishCampaign,
        donate,
        getCampaigns,
        getDonators,
        getUserCampaigns,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
