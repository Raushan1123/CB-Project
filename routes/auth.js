const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const brcypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middlewares/requireLogin')

// router.get('/',(req,res)=>
// {
//     res.send('Hello')
// })

// router.get('/protected',requireLogin,(req,res)=>{
//     res.send("Hello User")
// })

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"Please add all the details"});
        }
        User.findOne({email:email})
        .then((SavedUser)=>{
            if(SavedUser){
                return res.status(422).json({error:"User already exists"})
            }
            brcypt.hash(password,12)
            .then(hashedpassword=>{
                const user = new User({
                    email,
                    password:hashedpassword,
                    name
                })
                user.save()
                .then(user=>{
                    res.json({message:"Saved Successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })
            })

            
        })
        .catch(err=>{
            console.log(err)
        })
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    User.findOne({email:email})
    .then(SavedUser=>{
        if(!SavedUser){
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        brcypt.compare(password,SavedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"Successfully Signed in"})
                const token= jwt.sign({_id:SavedUser._id},JWT_SECRET)
                const {_id,name,email} = SavedUser
                res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:'Invalid Email or Pasword'});
            }
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })


module.exports = router