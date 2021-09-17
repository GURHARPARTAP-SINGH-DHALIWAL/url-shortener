const mongoose=require('mongoose');

const config=require("config");

const URI=config.get("mongoURI");

const connectDB=async ()=>{
    try{
        await mongoose.connect(URI,{useNewUrlParser:true});

        console.log("Connected to MongoDB");
    }catch(err)
    {
        console.log(err);
        process.exit(1);
    }
};


module.exports=connectDB;
