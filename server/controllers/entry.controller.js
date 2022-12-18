const { restart } = require("nodemon")
const Entry = require("../models/entry.model")

module.exports = {
    createEntry:(req,res)=>{
        Entry.create(req.body)
        .then(entry=>res.json(entry))
        .catch(err=>res.status(400).json(err))
    },
    findEntriesByList:(req, res)=> {
        Entry.find({lists:req.body})
        .then(entries=>res.json(entries))
        .catch(err=>res.status(400).json(err))
    },
    updateEntry:(req,res)=>{
        Entry.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators:true})
        .then(result=>res.json(result))
        .catch(err=>res.status(400).json(err))
    },
    updateJustRank:(req,res)=>{
        Entry.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {runValidators:true})
        .then(result=>res.json(result))
        .catch(err=>restart.status(400).json(err))
    },
    deleteEntry:(req,res)=>{
        Entry.deleteOne({_id:req.params.id})
        .then(result=>res.json(result))
        .catch(err=>res.status(400).json(err))
    }
}