const Lister = require("../models/lister.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    createLister: (req, res)=>{
        Lister.create(req.body)
        .then(lister=>{
            const listerToken = jwt.sign({_id:lister.email},process.env.SECRET_KEY, {expiresIn: "600s"});
            res.cookie("listerToken", listerToken, {httpOnly:true}).json({message:"Success!", lister:lister});
    })
        .catch(err=>res.json(err))
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
                    const listerToken = jwt.sign({email:lister.email},process.env.SECRET_KEY, {expiresIn: "3600s"})
                    res.status(201).cookie("listerToken", listerToken, {httpOnly:true, expires:new Date(Date.now() + 90000)}).json({sucessMessage: "Lister logged in!", lister:lister})
                    
                }
            }catch(err){
                res.status(400).json({error:"Invalid email or password."})
            }
        }
    },
    logoutLister: (req,res)=>{
        res.clearCookie("listerToken")
        res.status(200).json("Lister logged out.")
    },
    findOneLister: (req, res)=>{
        Lister.findOne({email:req.params.email})
        then(lister =>res.json(lister))
        .catch(err => {
            console.log("Didn't find lister by email!(findOneLister)")
            res.status(400).json(err)
        })
    },
    getLoggedInLister(req, res){
        const decodedToken = jwt.decode(req.cookies.listerToken,{complete:true})
        Lister.findById(decodedToken.payload._id)
            .then(lister=> res.json(lister))
            .catch(err => res.json("Get Logged In Lister find by id error.",err))
    }
}
