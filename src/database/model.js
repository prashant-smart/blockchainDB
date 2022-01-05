let mongoose = require('mongoose');
let Schema=mongoose.Schema;


let BlockChainSchema=new Schema({

    index:{
        required: true,
        type: Schema.Types.Number,
    },
    timestamp:{
        required: true,
        type: Schema.Types.Date,
        default:Date.now(),
    },
    transition:{
        required: true,
        type: Schema.Types.Array,
    },
    prevHash:{
        required: false,
        type: Schema.Types.String,
    },
    hash:{
        required: true,
        type: Schema.Types.String, 
    }
});
mongoose.model('BlockChain',BlockChainSchema)

module.exports = {
    createCollection: function (userAuthId){
        mongoose.model(`${userAuthId}`,BlockChainSchema);
    }
  };