const router = require('express').Router();
const db = require("../../models");

// fetch /api/workouts

router.get('/', async (req, res) => {
  try {
    const workouts = await db.Workout.find({});
    res.status(200).json(workouts);
  } catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;
