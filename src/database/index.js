let mongoose =require("mongoose");

let blockChainModel=require("./model");


const connectToMongo=(callback)=>{
    mongoose.connect(process.env.MONGODB_URI||"mongodb+srv://code_hobby:code_hobby@cluster0.1ludt.mongodb.net/blockChain?retryWrites=true&w=majority",(err)=>{
    if(err) return console.log("connot connect to db",err.message);
    console.log("DB is connected");
    callback();
    });
}



module.exports=connectToMongo;