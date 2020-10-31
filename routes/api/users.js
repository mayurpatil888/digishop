const express = require('express');
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

const User = require('../../models/Users');


// @route - POST api/users
// @desc - Register user route
// @access - public
router.post('/', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is invalid').isEmail(),
    body('email').custom(email => {
        return User.findOne({email}).then(user => {
          if (user) {
            return Promise.reject('User already exist');
          }
        })
    })
    // body('password', 'Min 6 characters required').isLength({min: 6})
], async (req, res) => { 
    console.log(req.body);
    const {name, email, password} = req.body;
    const errors = validationResult(req);

    // If errors return 400.
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

   const user = new User({
      email,
      name,
      password,
      avatar,
      client_id: 1
   });
  console.log(`----------${password}----------pwd--register`);
   const pwd = await bcrypt.hash(password, 10);
  console.log(`----------${pwd}----------pwd Encrypted-register`);
   user.password = pwd;
   await user.save();

   const payload = {
     user: {
      id: user.id
     }
   }

   jwt.sign(payload, config.get('jwtSecret'), {
     expiresIn: 360000
   }, (err, token)=> {
    if(err){
      throw err;
    }
    res.json({token});
   }); 

});

module.exports = router;