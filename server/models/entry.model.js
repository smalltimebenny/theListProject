import mongoose from "mongoose";

const EntrySchema = mongoose.Schema({
    rank: {type:Number},
    name:{type:String,
        required:[true, "Must have an entry!"],
        minLength:[1, "Must be at least one (1) character long."]},
    value:0.5,
    lists:{type:Array,
        required:[true, "Must belong to at least one list!"]}
},{timestamps:true});

const Entry = mongoose.model("Entry", EntrySchema);
module.exports=Entry;