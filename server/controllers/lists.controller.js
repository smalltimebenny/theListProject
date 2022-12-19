const List = require("../models/list.model")

module.exports ={
    createList:(req,res)=>{
        List.create(req.body)
        .then(res=>console.log(res))
        .catch(err=>{
            console.log("Create List error.")
            res.status(400).json(err)})
        },
    addToListOfLists:(req,res)=>{
        List.updateOne({_id:req.params.id}, {$addToSet: {allLists: req.body}})
        .then(console.log(res))
        .catch(err=> {
            console.log("Add to List of Lists error.")
            res.status(400).json(err)
        })
    },
    removeFromListOfLists:(req, res)=>{
        List.updateOne({_id:req.params.id}, {$pull: {allLists: req.body}})
        .then(res=>console.log(res))
        .catch(err=>{
            console.log("Remove From List of Lists error.")
            res.statsu(400).json(err)
        })
    },
    deleteList:(req,res) => {
        List.deleteOne({_id:req.params.id})
        .then(result=>console.log(result))
        .catch(err=>{
            console.log("Delete List error")
            res.status(400).json(err)
        })
    },
    getOneList:(req,res)=>{
        List.find({_id:req.params.id})
        .then(res=>console.log(res))
        .catch(err=>{
            console.log("Get List error.")
            res.status(400).json(err)
        })
    }
}