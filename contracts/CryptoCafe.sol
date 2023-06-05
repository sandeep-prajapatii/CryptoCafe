//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.9;

contract cafe{
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos; 

    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory name, string memory message)public payable{
        require(msg.value > 0, "Please pay greater than 0");
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }

    function getMemos()public view returns(Memo[] memory){
        return memos;
    }
}