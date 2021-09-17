const express=require('express');
const router=express.Router();
const Url=require('../models/Url');


router.use('/api',require('./api/index'));

router.get('/',(req,res)=>{
    return res.render('home');
});

router.get('/:code',async (req,res)=>{
    try{
        const url=await Url.findOne({urlCode:req.params.code});
       
        if(url)
        {
            return res.redirect(url.longUrl);
        }
        else
        {
            return res.render('error');
        }
    }
    catch(err)
    {
        console.log(err);
        return res.render('error');
    }

});


// router.get('*',(req,res)=>{
//     return res.render('error');
// });

module.exports=router;