const { request } = require('express');
const CandidateDetails = require('../models/candidate');

module.exports.showAll = async function(req,res){
    try{
        let all = await CandidateDetails.find({});
        return res.status(200).json({
            data: {
                allCandidates: all,
            },
            message: "Showing all Candidate",
        })
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports.createCandidate = async function(req,res){
    
    try{
        console.log(req.query.name);
        let details = await CandidateDetails.create({
            name: req.query.name,
            email: req.query.email,
        });
        
        return res.status(200).json({
                data: {
                    details: details,
                },
                message: "Candidate Created",
            })
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports.createCandidateScore = async function(req,res){
    
    try{

        const filter = {email : req.query.email};
        const update = {totalScore : parseInt(req.query.round1)+parseInt(req.query.round2)+parseInt(req.query.round3),
            "score.round1" : parseInt(req.query.round1),
            "score.round2" : parseInt(req.query.round2),
            "score.round3" : parseInt(req.query.round3),
        }

        let scoring = await CandidateDetails.findOneAndUpdate(filter,update)

        let final = await CandidateDetails.findOne({email:req.query.email})

        if(!scoring){
            return res.status(200).json({
                
                message: "Candidate not found",
            })
        }
        else{
            return res.status(200).json({
                data: {
                    scores: final,
                },
                message: "Candidate updated with score",
            })
        }
        
        
    }catch(err){
        res.status(400).send(err);
    }
}


module.exports.maxScoreOf = async function(req,res){
    try{
        let max = await CandidateDetails.find({}).sort({totalScore:-1}).limit(1);

        return res.status(200).json({
            data: {
                maxScore: max
            },
            message: "Candidate data with max score",
        })
    }
    catch(err){
        res.status(400).send(err);
    }

}

module.exports.averageScore = async function(req,res){
    try{
        let avgRound1 = await CandidateDetails.aggregate([{$group: {_id:null, pop: {$avg:"$score.round1"} } }])
        let avgRound2 = await CandidateDetails.aggregate([{$group: {_id:null, pop: {$avg:"$score.round2"} } }])
        let avgRound3 = await CandidateDetails.aggregate([{$group: {_id:null, pop: {$avg:"$score.round3"} } }])
        return res.status(200).json({
            data: {
                average_of_round_1: avgRound1,
                average_of_round_2: avgRound2,
                average_of_round_3: avgRound3,
            },
            message: "Showing all Candidate",
        })
    }catch(err){
        res.status(400).send(err);
    }
}