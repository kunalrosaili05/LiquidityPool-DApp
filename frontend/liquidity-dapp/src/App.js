import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import AddLiquidity from "./components/AddLiquidity";
import RemoveLiquidity from "./components/RemoveLiquidity";
import SwapTokens from "./components/SwapTokens";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        alert("Wallet connected successfully!");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("An error occurred while connecting to MetaMask. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  // Function to check if wallet is already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <div className="app">
      {/* Header Section */}
      <Header account={account} connectWallet={connectWallet} />

      {/* Main Features Section */}
      <div className="features">
        <AddLiquidity />
        <RemoveLiquidity />
        <SwapTokens />
      </div>

      {/* Loading Indicator */}
      {isLoading && <div className="loading-overlay">Connecting Wallet...</div>}
    </div>
  );
}

export default App;
