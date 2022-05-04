pragma solidity ^0.5.0; 
import './DappToken.sol'; 

contract DappTokenSales {

    address admin;
    DappToken public dappToken; 
    uint256 public tokenPrice; 
    uint256 public tokenSold; 


    constructor (DappToken _dappToken, uint256 _tokenPrice) public {
        dappToken = _dappToken; 
        tokenPrice = _tokenPrice;
        admin = msg.sender;
    }



}