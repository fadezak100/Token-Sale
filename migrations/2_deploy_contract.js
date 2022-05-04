const DappToken = artifacts.require("DappToken"); 
const DappTokenSales = artifacts.require("DappTokenSales"); 



module.exports = async function (deployer, network, account) {
   await deployer.deploy(DappToken);
    const dappToken = await DappToken.deployed();

    var tokenPrice =  1000000000000000;
    await deployer.deploy(DappTokenSales, dappToken.address, tokenPrice);
    const dappTokenSales = await DappTokenSales.deployed();

}