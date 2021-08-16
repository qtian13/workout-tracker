const router = require('express').Router();

const exerciseRoutes = require('./exercise-routes');
const apiRoutes = require('./api');

router.use('/exercise', exerciseRoutes);
router.use('/api', apiRoutes);

module.exports = router;