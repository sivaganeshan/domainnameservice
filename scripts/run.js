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