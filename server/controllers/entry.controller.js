const { restart } = require("nodemon")
const Entry = require("../models/entry.model")

module.exports = {
    createEntry:(req,res)=>{
        Entry.create(req.body)
        .then(entry=>res.json(entry))
        .catch(err=>{
            console.log("Create Entry function error")
            res.status(400).json(err)})
    },
    findEntriesByList:(req, res)=> {
        Entry.find({lists:{$in:req.body}})
        .then(entries=>res.json(entries))
        .catch(err=>{
            console.log("Find Entries By List error.")
            res.status(400).json(err)})
    },
    updateEntry:(req,res)=>{
        Entry.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators:true})
        .then(result=>res.json(result))
        .catch(err=>{
            console.log("Update Entry error.")
            res.status(400).json(err)})
    },
    updateJustRank:(req,res)=>{
        Entry.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {runValidators:true})
        .then(result=>res.json(result))
        .catch(err=>{
            console.log("Update Just Rank error.")
            restart.status(400).json(err)})
    },
    deleteEntry:(req,res)=>{
        Entry.deleteOne({_id:req.params.id})
        .then(result=>res.json(result))
        .catch(err=>{
            console.log("Delete Entry error.")
            res.status(400).json(err)})
    }
}