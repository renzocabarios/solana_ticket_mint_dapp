import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BlockchainMessenger = await ethers.getContractFactory(
      "BlockchainMessenger"
    );
    const blockchainMessenger = await BlockchainMessenger.deploy();

    return {
      blockchainMessenger,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { blockchainMessenger, owner } = await loadFixture(
        deployOneYearLockFixture
      );
      expect(await blockchainMessenger.owner()).to.equal(owner.address);
    });
  });
});
