import React, { useState } from "react";
import { ethers } from "ethers";
import { parseUnits } from "ethers"; 

const AddLiquidity = () => {
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  const handleAddLiquidity = async () => {
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
      },
    ];

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      await contract.addLiquidity(
        parseUnits(amountA, 18),
        parseUnits(amountB, 18)
      );

      alert("Liquidity added successfully!");
    } catch (error) {
      console.error("Error adding liquidity:", error);
      alert("Failed to add liquidity. Check console for details.");
    }
  };

  return (
    <div className="liquidity-box">
      <h2>Add Liquidity</h2>
      <input
        type="text"
        placeholder="Amount of Token A"
        value={amountA}
        onChange={(e) => setAmountA(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount of Token B"
        value={amountB}
        onChange={(e) => setAmountB(e.target.value)}
      />
      <button onClick={handleAddLiquidity}>Add Liquidity</button>
    </div>
  );
};

export default AddLiquidity;
