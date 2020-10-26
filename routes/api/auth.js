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


// @route - GET api/users
// @desc - Login user 
// @access - public
router.post('/', [
    body('email', 'Password required')
        .exists()
        .bail()
        .custom(async (email, { req }) => {
            return User.findOne({ email }).then(async user => {
                const password = req.body.password;
                

                if (!user) {
                    return Promise.reject('Invalid credentials');
                }
                const pwd = await bcrypt.hash(password, 10);
                console.log(password, 'password------');
                console.log(pwd, 'pwd------');
                console.log(user.password, 'user.password');
                if (pwd !== user.password) {
                    return Promise.reject('Invalid credentials1');
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