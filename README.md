# the-blockchain-messenger

## GUIDE
- configure env 
- run `npm i`
- run `npx hardhat compile`
- run `npx hardhat run scripts/deploy.ts --network sepolia`
- run `npx hardhat verify --contract contracts/BlockchainMessenger.sol:BlockchainMessenger --network sepolia <program-id>`