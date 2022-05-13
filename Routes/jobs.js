const Router = require('express').Router()
const {addjobs, applyjobs, removeapplyjobs, removeJob} = require("../Controller/jobs")

Router.post('/addjob', addjobs)
Router.post('/applyjob/:id', applyjobs)
Router.post('/removeapplyjob/:id', removeapplyjobs)
Router.post('/removejob/:jobid/:userid', removeJob)


module.exports = Router