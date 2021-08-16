const mongoose = require("mongoose");
const { ExerciseSchema } = require('./Exercise');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date()
  },

  exercises: {
    type: [ExerciseSchema],
    default: []
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;