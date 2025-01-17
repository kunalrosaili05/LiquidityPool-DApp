// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LiquidityPool is ReentrancyGuard {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address indexed provider, uint256 amountA, uint256 amountB);
    event Swap(address indexed user, address indexed fromToken, address indexed toToken, uint256 amountIn, uint256 amountOut);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external nonReentrant {
        require(amountA > 0 && amountB > 0, "Amounts must be greater than 0");
        require(tokenA.allowance(msg.sender, address(this)) >= amountA, "TokenA: insufficient allowance");
        require(tokenB.allowance(msg.sender, address(this)) >= amountB, "TokenB: insufficient allowance");

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        reserveA += amountA;
        reserveB += amountB;

        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) external nonReentrant {
        require(amountA <= reserveA && amountB <= reserveB, "Insufficient reserves");

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        reserveA -= amountA;
        reserveB -= amountB;

        emit LiquidityRemoved(msg.sender, amountA, amountB);
    }

    function swap(uint256 amountIn, address fromToken, address toToken) external nonReentrant {
        require(fromToken == address(tokenA) || fromToken == address(tokenB), "Invalid token");
        require(toToken == address(tokenA) || toToken == address(tokenB), "Invalid token");
        require(fromToken != toToken, "Cannot swap the same token");
        require(amountIn > 0, "Amount must be greater than 0");

        IERC20 from = IERC20(fromToken);
        IERC20 to = IERC20(toToken);

        require(from.allowance(msg.sender, address(this)) >= amountIn, "Insufficient allowance");

        uint256 amountOut;
        if (fromToken == address(tokenA)) {
            require(reserveA > 0 && reserveB > 0, "Insufficient liquidity");
            amountOut = (amountIn * reserveB) / reserveA;
            reserveA += amountIn;
            reserveB -= amountOut;
        } else {
            require(reserveA > 0 && reserveB > 0, "Insufficient liquidity");
            amountOut = (amountIn * reserveA) / reserveB;
            reserveB += amountIn;
            reserveA -= amountOut;
        }

        from.transferFrom(msg.sender, address(this), amountIn);
        to.transfer(msg.sender, amountOut);

        emit Swap(msg.sender, fromToken, toToken, amountIn, amountOut);
    }
}
