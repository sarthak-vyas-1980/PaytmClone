const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sarthakvyas41:sarthak54321@cluster0.zugremz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String,
})

const accountSchema  = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userDb",
        required : true,
    },
    balance : {
        type : Number,  //remember that in BE we write 33.33 as 3333 so to be more precise even though we display 33.33 in FE
        required : true,
    }
})

const userDb = mongoose.model("User", userSchema);
const Account =mongoose.model("Account",accountSchema);


module.exports = {
    userDb,
    Account
};