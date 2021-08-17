const router = require('express').Router();
const { Workout } = require("../../models");

// fetch /api/workouts
router.get('/', async (req, res) => {
  try {
    // return all workout documents ordered by date created
    // add temperary field totalDuration
    const workouts = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }
      }
    ])
    console.log("====api get all workout=====");
    console.log(workouts);
    console.log("============================");
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/', async (req, res) => {
  try {
    // return all workout documents ordered by date created
    // add temperary field totalDuration
    const workouts = await Workout.aggregate([
      {
        $addFields:{
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }
      }
    ]);
    console.log("====api get all workout=====");
    console.log(workouts);
    console.log("============================");
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/range', async (req, res) => {
  try {
    // return last 7 workouts ordered by created sequence
    // add temperary field totalDuration
    const workouts = await Workout.aggregate([
      {
        $addFields:{
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }
      }
    ]).sort({ _id: -1 }).limit(7);
    workouts.reverse();
    
    // check the number of workouts
    const numOfDocs = workouts.length;

    // check if there is any workout created today
    let workoutOnToday = 0;
    if (numOfDocs > 0 && numOfDocs < 7) {
      const lastWorkoutDay = workouts[workouts.length - 1].day;
      let currentDayStart = new Date();

      currentDayStart.setHours(0);
      currentDayStart.setMinutes(0);
      currentDayStart.setSeconds(0);
      currentDayStart = Math.floor(currentDayStart.getTime() / 1000) * 1000;

      if (lastWorkoutDay.getTime() > currentDayStart) {
        workoutOnToday = 1;
      }
    }

    // add workout place holder and make the chart looks better
    // if there is already workout today, the place holder starts from the next day
    // else, the place holder starts from today
    for (let i = 0; i < 7 - numOfDocs; i++) {
      workouts.push({
        day: new Date().setDate(new Date().getDate() + i + workoutOnToday),
        exercises: []
      });
    }
    
    console.log("==========workouts=========");
    console.log(workouts);
    console.log("===========================")
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
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
