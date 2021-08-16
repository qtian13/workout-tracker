const mongoose = require("mongoose");
const { ExerciseSchema } = require('./Exercise');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  date: {
    type: Date,
    default: new Date()
  },

  exercises: {
    type: [ExerciseSchema],
    default: undefined
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;