const DappToken = artifacts.require("DappToken"); 

require('chai').use(require('chai-as-promised')).should(); 


contract ('DappToken', ([owner, customer])=> {
    let dappToken; 

    before(async() => {
        dappToken = await DappToken.new(); 
    });

    function tokens(number) {
        return web3.utils.toWei(number, "ether")
    }


    describe("Testing the total supply", async() => {
        it("Checks the total supply after deployment", async() => {
            let result = await dappToken.totalSupply();
            assert.equal(result, tokens('1000000'), 'The contract totalSupply is incorrect'); 
        });

        it("Checks the balacne assigned to the owner", async () => {
            let result = await dappToken.balanceOf(owner); 
            assert.equal(result, tokens('1000000'), 'The balance of the owner is inccorect');
        }); 
    });

    describe("Testing the transfer function", async() => {
        it("Tests transfering greater funds than avaiable", async() => {
           await dappToken.transfer(customer, tokens('100000000000'), {from: owner}).should.be.rejected; 
        });
        it("Tests trasnferring funds", async () => {
            await dappToken.transfer(customer, tokens('1'), {from: owner});
            let result = await dappToken.balanceOf(customer); 
            assert.equal(result, tokens('1')); 
        });
    }); 

    describe("Delegated Transfering Test", async () => {
        it("Tests delegated transfers", async() => {
            await dappToken.approve(owner, tokens('99'));   
            await dappToken.transferForm(owner, customer, tokens('99')); 

            let result = await dappToken.balanceOf(customer); 
            assert.equal(result, tokens('100')); 
        });
    }); 
}); 