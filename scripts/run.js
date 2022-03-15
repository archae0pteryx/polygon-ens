const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');

  const domainContract = await domainContractFactory.deploy('baz');
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract owner:", owner.address);
  
  const txn = await domainContract.register("foobar", { value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();

  const address = await domainContract.getAddress("foobar");
  console.log("Owner of domain:", address);

  // txn = await domainContract.connect(randomPerson).setRecord("foobar", "This is the random persons record");
  // await txn.wait();
  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
