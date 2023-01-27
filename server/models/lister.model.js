const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const ListerSchema = mongoose.Schema({
    listerName:{
        type: String,
        required:[true, "You must have a username!"],
        minLength:[3, "Username must be at least three (3) characters long."]
    },
    email:{
        type:String,
        required:[true, "You must enter an email!"],
        minLength:[8, "Email must be at least eight (8) characters."]
    },
    password:{
        type: String,
        required: [true, "Password is required!"],
        minLength: [5, "Password must be at least five (5) characters."]
    },
    consumed: {type:String},
    doNotWant: {type:String},
    friends: {type:String},
},{timestamps:true});

ListerSchema.pre("save", async function(next) {
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log()
        this.password = hashedPassword
        next()
    }catch {
        console.log("Error in password save.")
    }

});

ListerSchema.virtual("confirmPassword")
    .get( ()=>this._confirmPassword)
    .set(value =>this._confirmPassword = value)

ListerSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Password and Confirm Password must match")
    }
    next();
});
module.exports = mongoose.model("Lister", ListerSchema)