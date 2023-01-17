// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 amountCollected;
        uint256 deadline;
        string image;
        address[] donators;
        uint256[] donations;
    }

    Campaign[] public campaigns;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign memory campaign;

        require(
            _deadline > block.timestamp,
            "The deadline should be some date in future"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.amountCollected = 0;
        campaign.deadline = _deadline;
        campaign.image = _image;

        campaigns.push(campaign);
        return campaigns.length;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        campaigns[_id].donators.push(msg.sender);
        campaigns[_id].donations.push(amount);

        (bool sent, ) = payable(campaigns[_id].owner).call{value: amount}("");

        if (sent) {
            campaigns[_id].amountCollected =
                campaigns[_id].amountCollected +
                amount;
        }
    }

    function getDonators(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }
}
