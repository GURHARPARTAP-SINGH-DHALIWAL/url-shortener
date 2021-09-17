const express=require("express");
const PORT=process.env.PORT||8000;
const connectDB=require("./config/db");

const app=express();


connectDB();

app.use(express.json({extended:false}));
app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine','ejs');





app.use('/',require('./routes/index'));






app.listen(PORT,()=>{
    console.log("Server has started Successfully");
});


