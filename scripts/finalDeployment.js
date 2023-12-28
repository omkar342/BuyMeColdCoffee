const hre = require("hardhat");

async function main() {
  const BuyMeColdCoffee = await hre.ethers.getContractFactory(
    "BuyMeColdCoffee"
  );
  const contract = await BuyMeColdCoffee.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);
  console.log("Address of contract:", contract.runner.address);
  console.log("Address of contract:", contract);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
