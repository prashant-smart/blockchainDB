# What is this?

This is a npm package which can be one option for storing information using blockchain concept.

# Installation

`npm i blockchain_db --save`

Then...

# Functions

* *setUserId* - It takes one string argument as a unique key or userId which is unique and used for assigning seperate database.

```
 const blockchain_db =require('blockchain_db');

 blockchain_db.setUserId("147a4f257asd57a57");

```

* *checkValidchain* - It takes one object( chain ) as argument and returns a boolean value after checking that given object is a valid chain of blockchain.

```
const blockchain_db =require('blockchain_db');
let chain={
    {
        _id: '61d56aa3a8c7782875f88',
        index: 1,
        timestamp: '2022-01-05T09:46:45.427Z',
        transition: [ 
            {
                sender:"hello",
                recipient:"world",
                amount:1000
            }
         ],
        prevHash: null,
        hash: 'a141ee124b69f3a57725911fbb03993487f',
        __v: 0
    }
};

const validity=blockchain_db.checkValidchain(chain);

```

* *match_credentials* - This function takes three arguments(Sender address,Reciver address,Amount ) match the details with the each block details present in blockchain and return bollean value.

```

const blockchain_db =require('blockchain_db');

let Sender="prshant/224/45";
let Reciver="Rohit/789/114";
let Amount=50000;

const isPresent=blockchain_db.match_credentials(Sender,Reciver,Amount);

```

* *add_A_Block* - This function Takes a callback function and details of transaction and it used to add a block of transaction details in blockchain

```
const blockchain_db =require('blockchain_db');


let Sender="prshant/224/45";
let Reciver="Rohit/789/114";
let Amount=50000;

let callback=(chain)=>{
    localStorage.setItem("chain",chain);
}

blockchain_db.add_A_Block(callback,Sender,Reciver,Amount);

```

* *getChain* - It takes a callback function and it is used to fetch the blockchain from database

```

const blockchain_db =require('blockchain_db');

let callback=(chain)=>{
    localStorage.setItem("chain",chain);
}

blockchain_db.getChain(callback);

```




