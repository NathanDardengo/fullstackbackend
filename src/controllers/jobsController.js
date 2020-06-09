const mongoose = require('mongoose');
const Jobs = mongoose.model('Jobs');

module.exports = {
    async store(req,res){
        const response = await Jobs.create(req.body);
        req.io.emit('newjob',response);
        //res.json(response);
        res.json().status(200);
    },
    async listJobs(req,res){
        const response = await Jobs.find();
        res.json(response);
        //req.io.emit('newjob',response);
    }
}