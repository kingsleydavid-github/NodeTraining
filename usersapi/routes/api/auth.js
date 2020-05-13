const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//for validating inputs to api calls
const { check, validationResult } = require('express-validator');

//config for jwt
const config = require('config');

// jsonwebtoken
const jwt = require('jsonwebtoken');

const User = require('../../models/User')

///bcryptjs to encrypt pssword
const bcrypt = require('bcryptjs');

//@route GET api/auth
//@desc Test route
//@access Public 

//auth param added to protect   
router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user);
        const user = await User.findById(req.user).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error. ');
    }
});

router.post('/',
    [
        check('email', 'Please include Email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {

        //console.log(req.body);
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() })
        }
        const { email, password } = req.body;

        try {
            // see if user exists
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            
            if(!isMatch)
            {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }
            
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
