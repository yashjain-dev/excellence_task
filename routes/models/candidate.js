const mongoose = require("mongoose");

const candidate_details_Schema = new mongoose.Schema(
  {
    name: {
        type: String,
        //   required: true
    },
    email:{
      type: String,
      unique: true
    },
    score: {
        round1:{
          type: Number,
          default: 0   
        },
        round2:{
          type: Number,
          default: 0     
        },
        round3:{
          type: Number,
          default: 0      
        },
    },
    totalScore: {
      type:  Number,
      default: 0  
    }  
  },
  {
    timestamps: true
  }
);

const candidate_details = mongoose.model(
  "candidate_details",
  candidate_details_Schema
);
module.exports = candidate_details;
