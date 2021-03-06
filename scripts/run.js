const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy("shinobi");
	await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
	console.log("Contract deployed by:", owner.address);
	
	const txn = await domainContract.register("sivaga",{value: hre.ethers.utils.parseEther('0.1')});
	await txn.wait();

  const domainOwner = await domainContract.getAddress("sivaga");
  console.log("Owner of domain:", domainOwner);

  	// Trying to set a record that doesn't belong to me!
      let newtxn = await domainContract.setRecord("sivaga", "Haha my domain now!");
      await newtxn.wait();

     let ownerRecord = await domainContract.getRecord("sivaga");
     console.log("Owner REecord ", ownerRecord);

    let rndmTxn = await domainContract.connect(randomPerson).register("rajkamal",{value: hre.ethers.utils.parseEther('0.1')} );
    await rndmTxn.wait();

    const damnDomainOwner = await domainContract.getAddress("rajkamal");
    console.log("Owner of domain damnsay :", damnDomainOwner);

    // Trying to set a record that doesn't belong to me!
     newtxn = await domainContract.connect(randomPerson).setRecord("rajkamal", "Haha this my new domain now!");
    await newtxn.wait();

   let dmanDomainRecord = await domainContract.getRecord("rajkamal");
   console.log("Owner REecord ", dmanDomainRecord);

    // Let's look in their wallet so we can compare later
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

  // Oops, looks like the owner is saving their money!
  let newtxnV = await domainContract.connect(owner).withdraw();
  await newtxnV.wait();
  
  // Fetch balance of contract & owner
  let contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));


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