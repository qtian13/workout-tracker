const router = require('express').Router();
const { Workout } = require("../../models");

// fetch /api/workouts
router.get('/', async (req, res) => {
  try {
    // return all workout documents ordered by date created
    const workouts = await Workout.find({});
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
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("====exercise added successfully====")
          console.log(success);
          console.log("===================================")
        }
      }
    );
    console.log("====updated workout====")
    console.log(response);
    console.log("=======================")

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
