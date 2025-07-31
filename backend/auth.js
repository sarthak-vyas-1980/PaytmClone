const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

function auth (req,res,next){
    const username = req.headers.authorization;
    if(!username || !username.startsWith("Bearer ")){
        return res.status(403).json({
            message : "error while logging in",
        })
    }
    const token = username.split(" ")[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err){
        res.status(403).json({
            message : "error while logging in/ invalid token",
        })
    }
}
module.exports = { auth };