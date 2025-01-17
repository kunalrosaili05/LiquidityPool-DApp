const hre = require("hardhat");

async function main() {
  // Fetch the deployer account
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TokenA with the deployer as the initial owner
  const TokenA = await hre.ethers.getContractFactory("TokenA");
  const tokenA = await TokenA.deploy(deployer.address);  // Pass deployer address as initial owner
  await tokenA.deployed();
  console.log("TokenA deployed to:", tokenA.address);

  // Deploy TokenB with the deployer as the initial owner
  const TokenB = await hre.ethers.getContractFactory("TokenB");
  const tokenB = await TokenB.deploy(deployer.address);  // Pass deployer address as initial owner
  await tokenB.deployed();
  console.log("TokenB deployed to:", tokenB.address);

  // Mint initial supply of TokenA and TokenB to deployer
  const initialMintAmount = hre.ethers.utils.parseEther("10000"); // 10,000 tokens
  await tokenA.mint(deployer.address, initialMintAmount);
  console.log(`Minted ${hre.ethers.utils.formatEther(initialMintAmount)} TokenA to ${deployer.address}`);

  await tokenB.mint(deployer.address, initialMintAmount);
  console.log(`Minted ${hre.ethers.utils.formatEther(initialMintAmount)} TokenB to ${deployer.address}`);

  // Deploy LiquidityPool with addresses of TokenA and TokenB
  const LiquidityPool = await hre.ethers.getContractFactory("LiquidityPool");
  const liquidityPool = await LiquidityPool.deploy(tokenA.address, tokenB.address);
  await liquidityPool.deployed();
  console.log("LiquidityPool deployed to:", liquidityPool.address);

  // Approve the LiquidityPool to spend tokens on behalf of the deployer
  const approvalAmount = hre.ethers.utils.parseEther("5000"); // 5,000 tokens for each token
  await tokenA.approve(liquidityPool.address, approvalAmount);
  console.log(`Approved LiquidityPool to spend ${hre.ethers.utils.formatEther(approvalAmount)} TokenA`);

  await tokenB.approve(liquidityPool.address, approvalAmount);
  console.log(`Approved LiquidityPool to spend ${hre.ethers.utils.formatEther(approvalAmount)} TokenB`);

  // Add initial liquidity to the pool
  await liquidityPool.addLiquidity(approvalAmount, approvalAmount);
  console.log("Added initial liquidity to the pool:", hre.ethers.utils.formatEther(approvalAmount), "TokenA and TokenB");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
