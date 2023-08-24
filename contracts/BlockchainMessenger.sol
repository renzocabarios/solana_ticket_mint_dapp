// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BlockchainMessenger {
    uint public changeCounter;
    address public owner;
    string public message;

    constructor() {
        owner = msg.sender;
    }

    function updateMessage(string memory _message) public {
        if (msg.sender == owner) {
            message = _message;
            changeCounter++;
        }
    }
}
