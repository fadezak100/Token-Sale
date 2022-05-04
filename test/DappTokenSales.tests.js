const DappTokenSales = artifacts.require("DappTokenSales"); 
const DappToken = artifacts.require("DappToken"); 





require('chai').use(require('chai-as-promised')).should();

contract('DappTokenSales', ([owner, customer]) => {
    let dappTokenSales, dappToken;
    var tokenPrice =  1000000000000000;
  

    before(async() => {
        dappToken = await DappToken.new();
         dappTokenSales = await DappTokenSales.new(dappToken.address, tokenPrice);
    }); 

    describe("Initialize Token Sale", async() => {
        it("Checks that the contract has an address", async() => {
            let result = await dappTokenSales.address;
            assert.notEqual(result, "0x0", 'Contract has an address'); 
        });
    });     



}); 