const express = require('express');
const router = express.Router();

// @route - GET api/products
// @desc - Test route
// @access - public
router.get('/', (req, res) => res.send('products route'));

module.exports = router;