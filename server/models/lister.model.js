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
        required:[true, "You must enter an email!"]
    },
    password:{
        type: String,
        required: [true, "Password is required!"]
    }
},{timestamps:true});

ListerSchema.virtual("confirmPassword")
    .get( ()=>this._confirmPassword)
    .set(value =>this._confirmPassword = value)

ListerSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Password and Confirm Password must match")
    }
    next();
});

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

module.exports = mongoose.model("Lister", ListerSchema)