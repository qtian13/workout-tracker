const router = require('express').Router();
const { Workout } = require("../../models");

// fetch /api/workouts
router.get('/', async (req, res) => {
  try {
    // return all workout documents ordered by date created
    // add temperary field totalDuration
    const workouts = await Workout.aggregate([{$addFields:{totalDuration: {$sum: "$exercises.duration"}}}])
    console.log("====api get all workout=====");
    console.log(workouts);
    console.log("==========================");
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/', async (req, res) => {
  try {
    // return all workout documents ordered by date created
    // add temperary field totalDuration
    const workouts = await Workout.aggregate([{
      $addFields:{
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }]);
    console.log("====api get all workout=====");
    console.log(workouts);
    console.log("==========================");
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json(err);
  }
})

// put /api/workouts/:id     
// add exercist to existing workout
router.put('/:id', async (req, res) => {
  try {
    const response = await Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { upsert: true, new: true }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
})

// createWorkout /api/workouts POST
// if body is {}, create a new document with field "_id" and "day" only
router.post('/', async ({ body }, res) => {
  try {
    const response = await Workout.create(body);
    console.log("====new workout created====")
    res.json(response);
    console.log("===========================")
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
