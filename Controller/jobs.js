const Jobs = require('../Models/job')
const express = require('express')
const app = express()
app.use(express.json())

exports.addjobs = async (req,res) =>{
    const newJob = new Jobs(req.body)
    if(!newJob){
        res.send("Cant post a job")
    }
    else{
        await newJob.save()
        res.send("Job Created")
    }
} 
exports.applyjobs = async (req,res) =>{
    const Job = await Jobs.findById( req.body.id)
    if(!Job.appliedby.includes(req.params.id)){
        await Job.updateOne({ $push :{ appliedby : req.params.id}})
        res.send("You applied for this job")
    }else{
        res.send("You already applied  for this job")
    }
}
exports.removeapplyjobs = async (req,res) =>{
    const Job = await Jobs.findById( req.body.id)
    if(Job.appliedby.includes(req.params.id)){
        await Job.updateOne({ $pull :{ appliedby : req.params.id}})
        res.send("Removed")
    }
    else{
        res.send("You havent applied for this job")
    }
}

exports.removeJob = async (req,res) =>{
    try{
            const Job  = await Jobs.findById( req.params.jobid)
        if (Job.postedby.includes(req.params.userid)){
            await Jobs.findByIdAndDelete(req.params.jobid)
            res.send("Job deleted")
        }
        else{
            res.send("You cannot delete this job")
        }
    }catch(err){
            res.send(err)
    }

}
