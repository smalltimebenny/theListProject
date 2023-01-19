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
        // Entry.find({lists:{$in:[req.body]}})
        Entry.find({lists:[req.params.listName]})
        .then(entries=>{
            // console.log(entries)
            res.json(entries)})
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
    },
    findBooks:(req,res)=>{
        Entry.find({lists:"Books"})
        .then(entries=>{
            // console.log(entries)
            res.json(entries)})
        .catch(err=>{
            console.log("Find Books List error.")
            res.status(400).json(err)})
    },
    findMovies:(req,res)=>{
        Entry.find({lists:"Movies"})
        .then(entries=>{
            // console.log(entries)
            res.json(entries)})
        .catch(err=>{
            console.log("Find Movies List error.")
            res.status(400).json(err)})
    },
    findMusic:(req,res)=>{
        Entry.find({lists:"Music"})
        .then(entries=>{
            // console.log(entries)
            res.json(entries)})
        .catch(err=>{
            console.log("Find Music List error.")
            res.status(400).json(err)})
    },
    }