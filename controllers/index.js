const router = require('express').Router();

const exerciseRoutes = require('./exercise-routes');
const statRoutes = require('./stat-routes');
const apiRoutes = require('./api');

router.use('/exercise', exerciseRoutes);
router.use('/stats', statRoutes);
router.use('/api', apiRoutes);

module.exports = router;