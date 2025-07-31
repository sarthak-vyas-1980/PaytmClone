const { Router } = require("express");
const router = Router();
const { auth } = require("../auth");
const mongoose = require("mongoose");   
const { userDb, Account } = require("../../db/db");

router.get("/balance", auth , async (req,res)=>{
    const userAccount = await Account.findOne({
        userId : req.userId,
    })
    res.status(200).json({
        balance : userAccount.balance,
    })
});

//...IMP...
router.post("/transfer",auth ,async (req,res)=>{

    const session= await mongoose.startSession();
    session.startTransaction();

    const { toId , amount } = req.body;

    const isvalid = await Account.findOne({
        userId : toId,
    }).session(session);
    if (!isvalid){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Invalid account"
        })
    }

    const userAccount = await Account.findOne({
        userId : req.userId,
    }).session(session);
    if( !userAccount || userAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient balance"
        })
    }

    //Perform the transfer
    await Account.updateOne({ userId : req.userId },{
        $inc : {
            balance : -amount,
        }
    }).session(session);
    await Account.updateOne({ userId : toId },{
        $inc : {
            balance : amount,
        }
    }).session(session);

    //commit the transaction
    await session.commitTransaction();
    res.status(200).json({
        message : "Transfer transaction successfull"
    });
});

module.exports = router;