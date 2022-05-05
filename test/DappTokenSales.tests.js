const { assert } = require('chai');

const DappTokenSales = artifacts.require("DappTokenSales"); 
const DappToken = artifacts.require("DappToken"); 





require('chai').use(require('chai-as-promised')).should();

contract('DappTokenSales', ([owner, customer]) => {
    let dappTokenSales, dappToken;
    var tokenPrice =  1000000000000000;
    var tokensAvailable = 750000; 
    let numberOfTokens = 10; 


    function tokens(number) {
        return web3.utils.toWei(number, "ether")
    }

    function token(number) {
        return web3.utils.fromWei(number, "ether")
    }

    before(async() => {
        dappToken = await DappToken.new();
         dappTokenSales = await DappTokenSales.new(dappToken.address, tokenPrice);
         await dappToken.transfer(dappTokenSales.address, tokensAvailable, {from: owner}); 
    }); 

    describe("Initialize Token Sale", async() => {
        it("Checks that the contract has an address", async() => {
            let result = await dappTokenSales.address;
            assert.notEqual(result, "0x0", 'Contract has an address'); 
        });
    });    
    
    
    describe("Buy Tokens Tests", async() => {
        it("Keep track of the amount of token sold", async () => {

            let recipit = await dappTokenSales.buyTokens(numberOfTokens, {from: customer, value: tokenPrice * numberOfTokens});
            let result = await dappTokenSales.tokenSold();
            assert.equal(result.toNumber(), numberOfTokens, 'Increaments the number of token sold'); 
            dappTokenSales.buyTokens(numberOfTokens, {from: customer, value: 1}).should.be.rejected;
        

        });

        it("Tests triggering selling events", async () => {

            let recipit = await dappTokenSales.buyTokens(numberOfTokens, {from: customer, value: tokenPrice * numberOfTokens});
            assert.equal(recipit.logs.length, 1, 'one selling event triggered'); 
            assert.equal(recipit.logs[0].args._customer, customer, 'logs the account that purshased the token');
            assert.equal(recipit.logs[0].event, 'Sell', 'The event should be "Sell" event' );
            assert.equal(recipit.logs[0].args._amount, numberOfTokens, 'The amount should match then number of tokens');
        }); 

    }); 

    describe("DappTokenSales Balance", async () => {
        it("Checks the balance of the dapptokensales contract", async()=>{
            let result = await dappToken.balanceOf(dappTokenSales.address); 
            let one = await dappToken.balanceOf(customer);
            let exp = tokensAvailable - one;
            assert.equal(result.toNumber(), exp , 'dappTokensSales has incorrect balacne'); 
        }); 

        it("Purshace more tokens than avaiable", async() => {
            await dappTokenSales.buyTokens(tokens("750201"), {from: customer, value: tokenPrice * numberOfTokens}).should.be.rejected;
        });

        it("Tests successful transfer", async() =>{
           let result = await dappToken.balanceOf(customer);
           assert.equal(result, 20);
        }); 
        
        
    }); 

    // describe("Ending Token Sale", async() =>{
    //     it("Accesses by customer", async () => {
    //        await dappTokenSales.endSale({from: owner});
    //     });
    //     it("Checks the balance of the admin", async() => {
    //         let result = await dappToken.balanceOf(owner);
    //         assert.equal(token(result), 999980); 
    //     }); 
    // }); 





}); 