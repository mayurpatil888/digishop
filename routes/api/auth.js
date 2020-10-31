const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
// @route - GET api/auth
// @desc - Test route
// @access - public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch {
        res.status(500).send("Server Error");
    }
});


// @route - POST api/auth
// @desc - Login user 
// @access - public
router.post('/', [
    body('email', 'Email is required')
        .exists()
        .bail()
        .custom(async (email, { req }) => {
            return User.findOne({ email }).then(async user => {
                const password = req.body.password;
                

                if (!user) {
                    return Promise.reject('Invalid credentials');
                }

                const isMatched = await bcrypt.compare(password, user.password);
                if (!isMatched) {
                    return Promise.reject('Invalid credentials');
                }
                req.user = user;
            })
        })
], async (req, res) => {
    const errors = validationResult(req);

    // If errors return 400.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const payload = {
        user: {
            id: req.user.id
        }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
    }, (err, token) => {
        if (err) {
            throw err;
        }
        res.json({ token });
    });

});



module.exports = router;