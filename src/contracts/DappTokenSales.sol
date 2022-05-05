pragma solidity ^0.5.0; 
import './DappToken.sol'; 

contract DappTokenSales {

    address admin;
    DappToken public dappToken; 
    uint256 public tokenPrice; 
    uint256 public tokenSold; 


    event Sell(address _customer, uint256 _amount); 


    constructor (DappToken _dappToken, uint256 _tokenPrice) public {
        dappToken = _dappToken; 
        tokenPrice = _tokenPrice;
        admin = msg.sender;
    }
      function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }


    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == mul(_numberOfTokens, tokenPrice));
        uint256 balacne = address(this).balance; 
        require(balacne >= _numberOfTokens); 
        //require transfer is successful
        require(dappToken.transfer(msg.sender, _numberOfTokens));


        tokenSold += _numberOfTokens; 
        emit Sell(msg.sender, _numberOfTokens); 
    }



}