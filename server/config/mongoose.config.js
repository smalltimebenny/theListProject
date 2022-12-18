import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/lists", {
    newUrlParser:true,
    useUnifiedTopology:true})
    .then(()=>console.log("Connected to database"))
    .catch(err=>console.log("Failed to connect to database.", err))