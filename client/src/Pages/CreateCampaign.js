import React from "react";
import { ethers } from "ethers";
import { useState } from "react";
import { useStateContext } from "../Context/index.js";
import { checkIfImage } from "../Utils/index.js";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const { publishCampaign, connect } = useStateContext();

  const navigate = useNavigate();

  const [form, setform] = useState({
    name: "",
    campaignTitle: "",
    story: "",
    goal: "",
    endDate: "",
    campaignImage: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;

    setform({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.campaignImage, async (exists) => {
      if (exists) {
        await publishCampaign({
          ...form,
          goal: ethers.utils.parseUnits(form.goal, 18),
        });
        navigate("/");
      } else {
        alert("Enter valid image URL");
        setform({ ...form, campaignImage: "" });
      }
    });
  };

  return (
    <div className=" flex flex-col flex-1 gap-10 items-center mt-12 bg-[#1c1c24] rounded-xl w-[100%]">
      <div className="flex justify-center items-center bg-[#3a3a43]  w-72 h-14 rounded-xl text-white font-bold text-lg m-16">
        Start a Campaign
      </div>

      <form onSubmit={handleSubmit} class="w-full max-w-6xl p-4">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Your Name*
            </label>
            <input
              value={form.name}
              onChange={handelChange}
              name="name"
              class="appearance-none block w-full bg-transparent text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
              id="grid-first-name"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Campaign Title*
            </label>
            <input
              value={form.campaignTitle}
              onChange={handelChange}
              name="campaignTitle"
              class="appearance-none block w-full bg-transparent  text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none "
              id="grid-last-name"
              type="text"
              placeholder="Write a title"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Story*
            </label>
            <textarea
              value={form.story}
              onChange={handelChange}
              name="story"
              id="message"
              rows="7"
              class="block p-2.5 w-full text-md text-white bg-transparent rounded-lg    border border-gray-200"
              placeholder="Write your story"
            ></textarea>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Goal*
            </label>
            <input
              value={form.goal}
              onChange={handelChange}
              name="goal"
              class="appearance-none block w-full bg-transparent text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
              id="grid-first-name"
              type="text"
              placeholder="ETH 0.90"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              End Date*
            </label>
            <input
              value={form.endDate}
              onChange={handelChange}
              name="endDate"
              class="appearance-none block w-full bg-transparent  text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
              id="grid-last-name"
              type="date"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full  px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Campaign image*
            </label>
            <input
              value={form.campaignImage}
              onChange={handelChange}
              name="campaignImage"
              class="appearance-none block w-full bg-transparent text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
              id="grid-first-name"
              type="text"
              placeholder="Image URL"
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-[#4acd8d] w-60 h-12 rounded-xl text-white font-bold "
          >
            Submit new campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
