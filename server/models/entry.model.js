const mongoose = require("mongoose")

const EntrySchema = mongoose.Schema({
    rank: {type:Number},
    name:{type:String,
        required:[true, "Must have an entry!"],
        minLength:[2, "Must be at least one (1) character long."]},
    value:{type:Number},
    lists:{type:String,
        required:[true, "Must pick from the list!"],
    enum: [
        "Books",
        "Movies",
        "Music",
    ]}
},{timestamps:true, strict:false});

const Entry = mongoose.model("Entry", EntrySchema);
module.exports=Entry;