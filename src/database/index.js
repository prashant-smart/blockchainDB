let mongoose =require("mongoose");

let blockChainModel=require("./model");


const connectToMongo=(callback)=>{
    code='mongodb+srv://code_hobby:code_hobby@cluster0.1ludt.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(process.env.MONGODB_URI||code,(err)=>{
    if(err) return console.log("connot connect to db",err.message);
    console.log("DB is connected");
    callback();
    });
}



module.exports=connectToMongo;