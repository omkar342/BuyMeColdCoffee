const hre = require("hardhat");
async function getBalances(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    const balanceString = hre.ethers.formatEther(balanceBigInt);
    console.log(balanceString + " ETH");
    return balanceString;
}

async function cosoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp},name ${name},address ${from},message ${message}`
    );
  }
}
async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const BuyMeColdCoffee = await hre.ethers.getContractFactory("BuyMeColdCoffee");
  const contract = await BuyMeColdCoffee.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", contract.target);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before BuyMeColdCoffee");
  await cosoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther("1") };
  await contract.connect(from1).BuyColdCoffee("from1", "Very nice chai", amount);
  await contract.connect(from2).BuyColdCoffee("from2", "Very nice course", amount);
  await contract
    .connect(from3)
    .BuyColdCoffee("from3", "Very nice information", amount);

  console.log("After BuyMeColdCoffee");
  await cosoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});