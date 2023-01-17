const mongoose = require("mongoose")

const ListSchema = mongoose.Schema({
    allLists:{type:Array}
}, {timestamps:true})

const List = mongoose.model("List", ListSchema);
module.exports = List;