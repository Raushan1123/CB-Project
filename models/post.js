const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vanityfair.com%2Fstyle%2F2018%2F10%2Fchris-hemsworth-dad-gq-australia&psig=AOvVaw1t-hD5c4fkEIAoW7DLvyh8&ust=1599574853221000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPD62uue1-sCFQAAAAAdAAAAABAD",
        required:true
    },
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        type:ObjectId,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Post",postSchema)