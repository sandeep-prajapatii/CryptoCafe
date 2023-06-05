const hre = require("hardhat");

async function main() {
    const cafe = await ethers.getContractFactory("cafe");
    const deployCafe = await cafe.deploy();
    await deployCafe.deployed();
    console.log("Address of the contract" , deployCafe.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  