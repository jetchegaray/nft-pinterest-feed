import { ethers } from "hardhat";
import hre from "hardhat";
import fs from "fs";
import { verify } from "crypto";

async function main() {
  //  const [deployer] = await ethers.getSigners();
  //  const balance = await deployer.getBalance();

  const NFTPinterest = await hre.ethers.getContractFactory("NFTPinterest");
  const nftPinterest = await NFTPinterest.deploy();

  await nftPinterest.deployed();

  const data = {
    address: nftPinterest.address,
    abi: JSON.parse(nftPinterest.interface.format("json") as string),
  };

  console.log(nftPinterest.address);

  await hre.run("verify:verify", {
    address: nftPinterest.address,
    constructorArguments: [],
  });

  console.log("Contract successfully verified");

  fs.writeFileSync(
    __dirname + "/../artifacts/contracts/NFTPinterest.sol/NFTPinterest.json",
    JSON.stringify(data)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
