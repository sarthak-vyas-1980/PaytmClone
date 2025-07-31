const { Router } = require("express");
const userRouter = Router();
const JWT_SECRET = require("../config");
const {userDb, Account} = require("../../db/db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { auth } = require("../auth");
const { z } = require("zod");
//const { usermiddleware } = require("../user");

const signupSchema = z.object({
    username : z.string().email(),
    password : z.string(),
    firstName : z.string(),
    lastName : z.string(),
});

const signinSchema =z.object({
    username : z.string().email(),
    password : z.string()
});

userRouter.post("/signup",async (req,res)=>{
    const body = req.body;
    const parsed = signupSchema.safeParse(body);
    if(!parsed.success){
        return res.status(411).json({ // return is mandatory!!!
            msg : "Incorrect inputs",
        });
    }

    const existingUser = await userDb.findOne({ username: body.username });
    if (existingUser) { // await wala syntax necessary or else two res.status may clash 
        return res.status(411).json({
        msg: "email already taken"
        });
    }
    const newUser = await userDb.create({
        username : body.username,
        password : body.password,
        firstName : body.firstName,
        lastName : body.lastName,
    })

    //.............create new account.............
    await Account.create({
        userId : newUser._id,
        balance : 1+Math.random()*10000,
    }) //.........................................

    const token = jwt.sign({userId : newUser._id},JWT_SECRET);
    res.status(200).json({
        message : "user created successfully",
        token : token,
    })
});

userRouter.post("/signin", /*usermiddleware ,*/ async (req, res)=>{
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message : "Invalid inputs",
        })
    }

    const user = await userDb.findOne({username : body.username});
    if(!user){
        return res.status(411).json({
            message : "error while logging in",
        });
    }
    req.userId = user._id;

    const token = jwt.sign({ userId : req.userId},JWT_SECRET);
    res.status(200).json({
        token : token,
    })
})

const updatebody = z.object({
    password : z.string().optional(),
    firstName : z.string().optional(),
    lastName : z.string().optional(),
})

userRouter.put("/",auth,async (req,res)=>{ //unique
    
    const { success } = updatebody.safeParse(req.body);
    if(!success){
        res.status(411).json({});
    }

    const user = await userDb.updateOne({
        _id : req.userId,
    },{ $set : req.body //since already object,
    })
    res.status(200).json({
        message : "details updated successfully"
    })
});

userRouter.get("/bulk",async (req,res)=>{

    const filter = req.query.filter;
    const users = await userDb.find({
        $or :[{            // for 'like' queries in mongoose
            firstName : {  //or means ki array of objects me se agar pehla obj nhi search hua toh dusra dekho!!!
                "$regex":filter //regex used for filtering
            }
        },{
            lastName : {
                "$regex":filter
            }
        }]
    });
    res.status(200).json({
        users : users.map((user)=>({ //returning only the values frontend needs and hence not the users directly (since didn't sent password)
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id,
        }))
    })
})

module.exports = userRouter;