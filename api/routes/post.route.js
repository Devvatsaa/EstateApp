import express from "express"

const router = express.Router();

router.get("/test",(req,res)=>{
    console.log("router working fine");
    res.send("Router is working fine"); 
})

export default router;