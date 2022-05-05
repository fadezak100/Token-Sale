const DappTokenSales = artifacts.require("DappTokenSales"); 
const DappToken = artifacts.require("DappToken"); 





require('chai').use(require('chai-as-promised')).should();

contract('DappTokenSales', ([owner, customer]) => {
    let dappTokenSales, dappToken;
    var tokenPrice =  1000000000000000;
    let numberOfTokens; 


    function tokens(number) {
        return web3.utils.toWei(number, "ether")
    }

    before(async() => {
        dappToken = await DappToken.new();
         dappTokenSales = await DappTokenSales.new(dappToken.address, tokenPrice);

         await dappToken.transfer(dappTokenSales.address, tokens("750000"), {from: owner}); 
    }); 

    describe("Initialize Token Sale", async() => {
        it("Checks that the contract has an address", async() => {
            let result = await dappTokenSales.address;
            assert.notEqual(result, "0x0", 'Contract has an address'); 
        });
    });    
    
    
    describe("Buy Tokens Tests", async() => {
        it("Keep track of the amount of token sold", async () => {
            numberOfTokens = 10; 
            let recipit = await dappTokenSales.buyTokens(numberOfTokens, {from: customer, value: tokenPrice * numberOfTokens});
            let result = await dappTokenSales.tokenSold();
            assert.equal(result.toNumber(), numberOfTokens, 'Increaments the number of token sold'); 
            dappTokenSales.buyTokens(numberOfTokens, {from: customer, value: 1}).should.be.rejected;
        

        });

        it("Tests triggering selling events", async () => {
            numberOfTokens = 10; 
            let recipit = await dappTokenSales.buyTokens(numberOfTokens, {from: customer, value: tokenPrice * numberOfTokens});
            // assert.equal(recipit.logs.length, 2, 'one selling event triggered'); 
            // assert.equal(recipit.logs[0].args._customer, customer, 'logs the account that purshased the token');
            // assert.equal(recipit.logs[0].event, 'Sell', 'The event should be "Sell" event' );
            // assert.equal(recipit.logs[0].args._amount, numberOfTokens, 'The amount should match then number of tokens') 
        }); 

    }); 

    describe("DappTokenSales Balance", async () => {
        it("Checks the balance of the dapptokensales contracr", async()=>{
            let result = await dappToken.balanceOf(dappTokenSales.address); 
            assert.equal(result, tokens('750000'), 'dappTokensSales has incorrect balacne'); 
        }); 

        it("Purshace more tokens than avaiable", async() => {
            await dappTokenSales.buyTokens(tokens("750201"), {from: customer, value: tokenPrice * numberOfTokens}).should.be.rejected;
        });
        
        // it("Checks successful transfers", async() => {
        //     let result = await dappToken.balanceOf(customer); 
        //     assert.equal(result.toNumber(), tokens('20'));
        // }); 
    }); 



}); 