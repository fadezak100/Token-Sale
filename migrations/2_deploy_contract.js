const DappToken = artifacts.require("DappToken"); 

module.exports = async function (deployer, network, account) {
   await deployer.deploy(DappToken);
    const dappToken = await DappToken.deployed();
    
}