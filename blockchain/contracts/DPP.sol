// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

contract DPP {
    mapping(address => bool) public authorizedOperator;
    mapping(string => DPPStatus) private productStatus;

    enum DPPStatus {
        Default,
        Active,
        Inactive
    }
    address internal owner;

    // Constructor Definition
    constructor() {
        owner = msg.sender;
    }

    // Event Definition
    event DPPCreated(string productID, string fileHash);
    event DPPUpdated(string productID, string fileHash);
    event DPPArchived(string productID, address recycler);
    event DPPLinked(string productID, string newProductID);
    event DPPIntegrated(string productID, string oldProductID);

    // Modifier Definition
    modifier onlyOwner() {
        require(owner == msg.sender, "Caller is not the owner!");
        _;
    }
    modifier onlyCertifiedOperator() {
        require(
            authorizedOperator[msg.sender],
            "Caller is not a autorized operator!"
        );
        _;
    }
    modifier onlyUniqueID(string memory productID) {
        require(
            productStatus[productID] == DPPStatus(0),
            "DPP with this ID has already been created!"
        );
        _;
    }
    modifier onlyActiveDPP(string memory productID) {
        require(
            productStatus[productID] == DPPStatus.Active,
            "DPP with this ID has already been archived or linked!"
        );
        _;
    }

    // Functions

    function createDPP(
        string memory productID,
        string memory _fileHash
    ) public onlyOwner onlyUniqueID(productID) {
        productStatus[productID] = DPPStatus.Active;
        emit DPPCreated(productID, _fileHash);
    }

    function integrateDPP(
        string memory oldProductID,
        string memory productID,
        string memory fileHash
    ) external onlyOwner onlyActiveDPP(oldProductID) {
        createDPP(productID, fileHash);
        productStatus[oldProductID] = DPPStatus.Inactive;
        emit DPPIntegrated(productID, oldProductID);
        emit DPPLinked(oldProductID, productID);
    }

    function updateDPP(
        string memory productID,
        string memory _fileHash
    ) external onlyCertifiedOperator onlyActiveDPP(productID) {
        emit DPPUpdated(productID, _fileHash);
    }

    function recycleDPP(
        string memory productID
    ) external onlyCertifiedOperator onlyActiveDPP(productID) {
        productStatus[productID] = DPPStatus.Inactive;
        emit DPPArchived(productID, msg.sender);
    }

    function authorizeOperator(address _operator) external onlyOwner {
        authorizedOperator[_operator] = true;
    }
}
