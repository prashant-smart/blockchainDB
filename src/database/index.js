let mongoose =require("mongoose");

let blockChainModel=require("./model");


const connectToMongo=(callback)=>{
    mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/blockChain",(err)=>{
    if(err) return console.log("connot connect to db",err.message);
    console.log("DB is connected");
    callback();
    });
}



module.exports=connectToMongo;