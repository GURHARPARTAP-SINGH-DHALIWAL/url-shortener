const express=require('express');
const router=express.Router();
const validUrl=require('valid-url');
const config=require('config');
const Url=require('../../../models/Url');
const shortid=require('shortid');


router.use('/shorten',async (req,res)=>{

    const {longUrl}=req.body;
    const baseUrl=config.get("baseUrl");

    if(!validUrl.isUri(baseUrl))
    {
        return res.status(401).send("Invalid Base Url");
    }
    

    const urlCode=shortid.generate();

    if(validUrl.isUri(longUrl))
    {
        try{
            let url=await Url.findOne({longUrl});

            if(url)
            {
                return res.status(200).json(url);
            }
            else
            {  
                const shortUrl=baseUrl+'/'+urlCode;
                url=new Url({
                    urlCode,
                    longUrl,
                    shortUrl,
                    date:new Date()

                });

                await url.save();

                return res.status(200).json(url);
            }


        }catch(err)
        {
            console.log(err);
            res.status(500).json("Internal Server Error");
        }
    }
    else{
        return res.status(401).send("Invalid Url");
    }


    
});

module.exports=router;