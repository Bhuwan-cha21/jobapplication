const  mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    jobsApplied :{
        type: Array,
        default:''
    },
    jobsPosted :{
        type: Array,
        default:''
    },
    cv:{
        type:String,
    }
})

const User = mongoose.model('Users', userSchema)
module.exports = User