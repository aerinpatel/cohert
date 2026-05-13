const {Router} = require("express");
const courseRoutes =  Router();

courseRoutes.post('/purchase',async (req,res) =>{
    res.status(200).json({message: "puchase successfull "});
});

courseRoutes.post('/preview',async (req,res) =>{
    res.status(200).json({message: "preview successfull"});
});

module.exports = courseRoutes;