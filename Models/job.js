const  mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const userSchema = new mongoose.Schema({
    jobtitle:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true,
        
    },
    salary:{
        type:String,
        required:true,
        unique:true
    },
    experience:{
        type:String,
        required:true
    },

    postedby:{
        type: Array,
        default:'',
        required:true
    },
    appliedby :{
        type: Array,
        default:''
    }
})

const Jobs = mongoose.model('Jobs', userSchema)
module.exports = Jobs