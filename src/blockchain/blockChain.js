let hash = require("object-hash");
let mongoose = require("mongoose");
const TARGET_DIFFILTY = 1560;
let connectToMongo = require("../database/index");

let validator = require("./validator");

class BlockChain {
  constructor() {
    this.chain = [];
    this.curr_transition = [];
  }

  update_chain(json){
    this.chain=json;
  }
  getLastBlock(callback) {
    let BlockChainModel = mongoose.model(getUserId());
    return BlockChainModel.findOne(
      {},null,
      { sort: { _id: -1 }, limit: 1 },
      (err, block) => {
        if (err) return console.error("Cannot find last block", err.message);
        return callback(block);
      }
    );
  }
  isValidChain(chain_to_check){
    if(chain_to_check.length==0||chain_to_check.length==1) return true;
    let current_index=1;
    let last_block=chain_to_check[0];
    while(current_index<chain_to_check.length){
      let block = chain_to_check[current_index];;
      if(block.prevHash!=last_block.hash){
        return false;
      }
      
      last_block=block;
      current_index++;
    }
    return true;
  }

  

  addNewBlock(sender, recipient, amount) {

    
    connectToMongo(async() => {
      let BlockChainModel = mongoose.model(getUserId());
      this.addNewTransaction(sender, recipient, amount);
        let block = {
          index: this.chain.length + 1,
          timestamp: Date.now(),
          transition: this.curr_transition,
          hash: null,
          prevHash: null,
        };
        if(!this.isValidChain(this.chain)){
          console.error("Invalid chain");
          return;
        }
        if (validator.proofOfWork(TARGET_DIFFILTY) === hash(TARGET_DIFFILTY)) {
        
          this.getLastBlock((lastBlock) => {
            if (lastBlock) {
              block.prevHash = lastBlock.hash;
            }
            block.hash = hash(block);
            let newBlock = new BlockChainModel(block);
            newBlock.save((err) => {
              if (err)
                return console.error("Cannot save block to db ", err.message);
              this.curr_transition = []; // here current transaction is set NULL because in future if we hvae to add new block of same object then we add new transaction id
              console.log("Block saved in DB");
              
            });
          });
        }else console.error("Proof of work is not match");
    });

  }
  addNewTransaction(sender, recipient, amount) {
    this.curr_transition.push({ sender, recipient, amount });
  }
  
  isEmpty() {
    return this.chain.length == 0;
  }
}
module.exports = BlockChain;
