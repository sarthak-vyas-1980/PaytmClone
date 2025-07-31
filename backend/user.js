// const User = require("../db/db");

// async function usermiddleware(req,res,next){
//     const username = req.body.username;
//     const password = req.body.password;

//     const user = await User.findOne({username});
//     if(!user){
//         res.status(411).json({
//             message : "error while logging in",
//         });
//     }
//     req.userId = user._id;
//     next();
// }
// module.exports ={ usermiddleware };