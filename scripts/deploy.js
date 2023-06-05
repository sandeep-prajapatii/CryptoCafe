const hre = require("hardhat");

  async function getBalances(address){
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }

  async function consoleBalances(addresses){
    let count = 0;
     for (const address of addresses){
      const currentBal =  await getBalances(address);
      count += 1;
      console.log(`${address} have ${currentBal} and count is ${count}`);
    }
  }

  async function consoleMemos(memos){
    for (const memo of memos){
      const name = memo.name;
      const message = memo.message;
      const timestamp = memo.timestamp;
      const from = memo.from;
      console.log(`${name} said ${message} at ${timestamp} with address ${from}`)
    }
  }

  async function main() {
    const [owner, from1, from2, from3] = await hre.ethers.getSigners();
    const cafe = await ethers.getContractFactory("cafe");
    const deployCafe = await cafe.deploy();
    await deployCafe.deployed();

    console.log("Address of the contract" , deployCafe.address);
    const addresses = [owner.address, from1.address, from2.address, from3.address];

    consoleBalances(addresses);
    
    const amount = {value: hre.ethers.utils.parseEther("1")};
    await deployCafe.connect(from1).buyCoffee("raju", "keep going bro"  , amount);
    await deployCafe.connect(from2).buyCoffee("Shakti", "keep going" , amount);
    await deployCafe.connect(from2).buyCoffee("Rohit", "keep" , amount);

    // consoleBalances(addresses);

    const memos = await deployCafe.getMemos();

    consoleMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
