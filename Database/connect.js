const mongoose = require('mongoose')
 const connectDb = async (req,res) =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/jobs")
        console.log('connected')
    }
    catch(err){
        res.send(err)
    }
}
module.exports = connectDb