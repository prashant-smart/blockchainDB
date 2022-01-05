let mongoose = require("mongoose");
var express=require('express');
var app=express();
var cors = require('cors');
let connectToMongo= require('./src/database/index')

let moduleutils= require('./src/database/model');
let createCollection=moduleutils.createCollection;
let UserId=null;
function setUserId(userId) {
  UserId=userId;
  createCollection(UserId);
}
global. getUserId=()=>{
  return UserId;
}
const port = process.env.PORT ||3000;// here we cant use 5000 because at that react app will be running
let BlockChain = require("./src/blockchain/blockChain");
let blockChain = new BlockChain();
app.use(cors());

app.use(express.json());
connectToMongo(()=>{});

global.fetchChain=async(callback) => {
 try{
    let BlockChainModel = mongoose.model(UserId);
    const chain=await BlockChainModel.find({});
    callback(chain);
  }catch(err){
      console.log(err.message);
      res.status(500).send("Internal server error");
    }
};



let checkValidchain=(chain)=>{
  if(!blockChain.isValidChain(chain)){
    console.error("Invalid chain");
    return false;
   }
  return true;
 }

let match_credentials=(sender,receiver,amount)=>{
  
 if(!blockChain.isValidChain(blockChain.chain)){
   throw new Error("Invalid chain");
  }
  try{
    for(let i=0;i<blockChain.chain.length;i++){
      let current_block_transition = blockChain.chain[i].transition;
      if(current_block_transition[0].sender===sender&&current_block_transition[0].recipient===receiver&&current_block_transition[0].amount===amount){
        return true;
      }
    }
    return false;
  }catch(e){
    console.error(e);
    return false;
  }
}
let getChain=async(callback)=>{
   fetchChain(callback);
}
let add_A_Block=(callback,sender,receiver,amount)=>{
  if(sender===""||receiver===""||amount===null) {
    console.error("Worng Transcation Credentials");
    return ;
  }
    blockChain.addNewBlock(sender,receiver,amount);
    setTimeout(() => {
      fetchChain(callback);
    }, 2000);
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/chain',async (req,res)=>{
  try{
    let BlockChainModel = mongoose.model(UserId);
    const chain=await BlockChainModel.find({});
    res.json(chain);
  }catch(err){
      console.log(err.message);
      res.status(500).send("Internal server error");
    }
  });
app.listen(port,error  => {
  if (error) throw error;
  console.log(`server started on the ${port}`)
})


let blockchain_db={
  setUserId:setUserId,
  checkValidchain:checkValidchain,
  match_credentials:match_credentials,
  add_A_Block:add_A_Block,
  getChain:getChain,
};
module.exports=blockchain_db;


