const Lister = require("../models/lister.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    createLister: async (req, res)=>{
        try{
            const emailCheck = await Lister.findOne({email: req.body.email})
            if (emailCheck){
                res.status(400).json({errors: {email: {message: "This email is taken."}}})
            }else{
                const data = new Lister(req.body)
                const lister = await data.save()
                const payload = {_id:lister._id, email:lister.email}
                const token = jwt.sign(payload, process.env.SECRET_KEY)
                res.cookie("listerToken", token, {httpOnly:true, expires: new Date(Date.now() + 900000)})
                .json({successMessage: "listerToken", lister:payload})
            }
        }
        catch(err){
            console.log("Create Lister function error.")
            res.status(400).json(err)
        }
    },
    loginLister: async (req, res)=>{
        const lister = await Lister.findOne({email:req.body.email})
        if(!lister){
            // console.log("this is the first part")
            res.status(400).json({error:"Invalid email or password."})
        }else{
            try{ 
                const validPasswordTest = await bcrypt.compare(req.body.password, lister.password )
                if(!validPasswordTest){
                    res.status(400).json({error:"Invalid email or password."})
                }else{
                    const listerToken = jwt.sign({_id:lister._id, email:lister.email},process.env.SECRET_KEY)
                    res.status(201).cookie("listerToken", listerToken, {httpOnly:true, expires:new Date(Date.now() + 9000000)}).json({sucessMessage: "Lister logged in!", lister:lister})
                    // console.log(lister)
                }
            }catch(err){
                res.status(400).json({error:"Invalid email or password."})
            }
        }
    },
    logoutLister: (req,res)=>{
        res.clearCookie("listerToken", {httpOnly:true, expires:new Date(Date.now() + 9000000)})
        res.status(200).json("Lister logged out.")
    },
    findOneLister: (req, res)=>{
        console.log("findonelister", req.params._id)
        let filter = {_id:req.params._id}
        Lister.findOne(filter,{_id:1, consumed:1}).lean()
        .then(lister =>{
            console.log("success findone", lister)
            res.json(lister)})
        .catch(err => {
            console.log("Didn't find lister by email!(findOneLister)")
            res.status(400).json(err)
        })
    },
    getLoggedInLister(req, res){
        const decodedToken = jwt.decode(req.cookies.listerToken,{complete:true})
        console.log("decoded token", decodedToken)
        Lister.find({email:decodedToken.payload.email}).lean()
            .then(lister=> {
                console.log("lister", lister)
                res.json(lister)
            })
            .catch(err => res.json("Get Logged In Lister find by id error.",err))
    },
    addToConsumed(req,res){
        console.log(req.params)
        let filter = {_id: req.params._id}
        let update = {$push: {consumed:req.params.entryId}}
        Lister.findOneAndUpdate(filter, update).lean()
            .then(lister => res.json(lister))
            .catch(err => {
                console.log("Couldn't update consumed list."),
                res.status(400).json(err)
            })
    },
    addToDoNotWant(req,res){
        let filter = {_id:req.params._id}
        let update ={$push: {doNotWant:req.params.entryId}}
        Lister.findOneAndUpdate(filter, update).lean()
            .then(lister => {
                res.json(lister)
                console.log("lister",lister)
            })
            .catch(err=>{
                console.log("Couldn't update do not want."),
                res.status(400).json(err)
            })
    },
}
