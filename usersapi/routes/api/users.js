const express = require('express');
const router = express.Router();

//for validating inputs to api calls
const { check, validationResult } = require('express-validator');

//pull user model
const User = require('../../models/User');

const gravatar = require('gravatar');

///bcryptjs to encrypt pssword
const bcrypt = require('bcryptjs');

//config for jwt
const config = require('config');

// jsonwebtoken
const jwt = require('jsonwebtoken');

//@route POST api/user
//@desc Register User
//@access Public 
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include Email').isEmail(),
        check('password', 'Please enter password with 6 or more chars').isLength({ min: 6 })
    ],
    async (req, res) => {

        //console.log(req.body);
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }
        const { name, email, password } = req.body;

        try {
            // see if user exists
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            // get users
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            })

            user = new User({
                name,
                email,
                password,
                avatar
            });

            // encrypt password

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: user.id,

            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token });
                }
            );
            
        }
        catch (err) {
            console.log(err.message);
            res.status(500);
        }


    });

module.exports = router;
