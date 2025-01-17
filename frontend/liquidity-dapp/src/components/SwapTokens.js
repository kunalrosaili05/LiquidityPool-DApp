import React, { useState } from "react";
import { BrowserProvider, Contract, parseUnits } from "ethers";

const SwapTokens = () => {
  const [amountIn, setAmountIn] = useState("");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature!");
        return;
      }

      if (!amountIn || !fromToken || !toToken) {
        alert("Please fill out all fields before proceeding.");
        return;
      }

      setIsLoading(true);

      const contractAddress = "0xB99D6f47130669dCaF168CDaf617750Ef67E197e"; 
      const abi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_tokenA",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_tokenB",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "ReentrancyGuardReentrantCall",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "provider",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountA",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountB",
              "type": "uint256"
            }
          ],
          "name": "LiquidityAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "provider",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountA",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountB",
              "type": "uint256"
            }
          ],
          "name": "LiquidityRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "fromToken",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "toToken",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amountOut",
              "type": "uint256"
            }
          ],
          "name": "Swap",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountA",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountB",
              "type": "uint256"
            }
          ],
          "name": "addLiquidity",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountA",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountB",
              "type": "uint256"
            }
          ],
          "name": "removeLiquidity",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "reserveA",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "reserveB",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amountIn",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "fromToken",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "toToken",
              "type": "address"
            }
          ],
          "name": "swap",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenA",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenB",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }    
      ];

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);

      const tx = await contract.swap(
        parseUnits(amountIn, 18), 
        fromToken,
        toToken
      );
      

      await tx.wait(); 
      alert("Swap successful!");
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Swap failed. Check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="liquidity-box">
      <h2>Swap Tokens</h2>
      <input
        type="text"
        placeholder="Amount to Swap"
        value={amountIn}
        onChange={(e) => setAmountIn(e.target.value)}
      />
      <input
        type="text"
        placeholder="From Token Address"
        value={fromToken}
        onChange={(e) => setFromToken(e.target.value)}
      />
      <input
        type="text"
        placeholder="To Token Address"
        value={toToken}
        onChange={(e) => setToToken(e.target.value)}
      />
      <button onClick={handleSwap} disabled={isLoading}>
        {isLoading ? "Processing..." : "Swap Tokens"}
      </button>
    </div>
  );
};

export default SwapTokens;
