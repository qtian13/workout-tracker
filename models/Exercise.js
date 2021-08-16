const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "String is Required"
  },

  name: {
    type: String,
    trim: true,
    // unique: true,
    required: "String is Required"
  },

  weight: {
    type: Number,
    min: 0,
    default: 0
  },

  sets: {
    type: Number,
    min: 0,
    default: 0
  },

  reps: {
    type: Number,
    min: 0,
    default: 0
  },

  distance : {
    type: Number,
    min: 0,
    default: 0
  },

  duration: {
    type: Number,
    min: 0,
    default: 0,
    required: "Number is Required"
  }
});

module.exports = { 
  ExerciseSchema
};