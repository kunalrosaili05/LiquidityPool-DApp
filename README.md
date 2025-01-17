# LiquidityPool DApp

## Overview

The LiquidityPool DApp allows users to swap tokens and add/remove liquidity in a decentralized way. The application integrates with Ethereum-based smart contracts to provide liquidity pool functionality, and the frontend interacts with users to provide a seamless experience. 

This DApp consists of two main parts:
- **Backend**: Contains the smart contracts and their deployment scripts.
- **Frontend**: Contains the React.js-based user interface.

## Project Structure

/LiquidityPool-DApp │ ├── /backend │ └── /contracts │ ├── TokenA.sol │ ├── TokenB.sol │ ├── LiquidityPool.sol │ └── deploy.js │ └── /frontend └── /src ├── /components │ ├── Header.js │ ├── AddLiquidity.js │ ├── RemoveLiquidity.js │ └── SwapTokens.js ├── App.js └── index.css


## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- NPM
- MetaMask installed in your browser (for interacting with the Ethereum blockchain)

### Backend Setup (Smart Contracts)

1. Navigate to the `/backend` directory.

2. Install the required dependencies:
   ```bash
   npm install

3. Deploy the smart contracts:

    In the /backend/contracts folder, you will find the TokenA.sol, TokenB.sol, and LiquidityPool.sol contracts.
    Make sure you have a wallet address and a testnet account (like sepolia or Goerli) set up with MetaMask. Here I have used sepolia testnet.
    Modify the deployment script deploy.js with the correct Ethereum provider details (e.g., Alchemy or Infura API keys). Here I have used Alchemy.

Run the deployment script:

npx hardhat run scripts/deploy.js --network <your-network>

This will deploy the contracts and output the contract addresses for TokenA, TokenB, and LiquidityPool.

### Frontend Setup(UI)

Navigate to the /frontend directory.

Install the required dependencies:

npm install

Modify the App.js file:

    Replace the token contract addresses (TokenA and TokenB) with the deployed contract addresses from the backend.

Run the frontend:

npm start

The frontend will be available at http://localhost:3000 by default.

### Smart Contract Architecture

TokenA.sol and TokenB.sol

These are the ERC20 token contracts that represent the two tokens used in the liquidity pool. They include the basic functions of an ERC20 token such as transfer, approve, and balanceOf.
LiquidityPool.sol

This contract manages the liquidity pool, allowing users to:

    Add Liquidity: Users can add liquidity to the pool by providing equal amounts of TokenA and TokenB.
    Remove Liquidity: Users can remove their liquidity and receive an equivalent amount of TokenA and TokenB.
    Swap Tokens: Users can swap one token for another within the pool.

The contract maintains a mapping of the token balances and calculates the liquidity ratios for the swaps. The contract is designed to handle token transfers between users and the liquidity pool.
Key Functions in LiquidityPool.sol:

    addLiquidity(address tokenA, address tokenB, uint256 amountA, uint256 amountB)
    removeLiquidity(address tokenA, address tokenB, uint256 liquidityAmount)
    swap(address fromToken, address toToken, uint256 amount)

Deployment

The smart contracts are deployed to the Ethereum network using Hardhat, and their addresses are displayed after deployment.
Frontend Interaction
1. Connect Wallet:

Users can connect their Ethereum wallet (MetaMask) to the DApp by clicking the "Connect Wallet" button. This enables the frontend to interact with the Ethereum blockchain.
2. Add Liquidity:

    Navigate to the Add Liquidity section of the UI.
    Input the token amounts to be added to the liquidity pool (both TokenA and TokenB).
    Click the "Add Liquidity" button to deposit the tokens into the pool.

3. Remove Liquidity:

    Navigate to the Remove Liquidity section of the UI.
    Input the amount of liquidity to be removed.
    Click the "Remove Liquidity" button to withdraw tokens from the pool.

4. Swap Tokens:

    Navigate to the Swap Tokens section of the UI.
    Choose the token to swap and the token to receive.
    Input the amount of tokens to swap.
    Click the "Swap Tokens" button to execute the token swap.

5. Account Information:

    Once the wallet is connected, the user's Ethereum account address will be displayed in the header section.
