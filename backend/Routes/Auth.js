const express = require('express');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { check, validationResult }
    = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Schema/UserSchema')
const Authentication = require('../middleware/Authentication.js')
const salt = 10;
const privatekey = process.env.PRIVATEKEY



router.post('/signup', [

    
    check('password', 'Password length should be 8 to 10 characters')
        .isLength({ min: 4, max: 10 })
], async (req, res) => {

    const errors = validationResult(req);

    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
        res.json({ errors, status: 501 });
        return;
    }
    try {


        let { name, email, location, password, } = req.body;

        let check = await User.findOne({ email });

        if (check) {
            res.status(400).json({ messsage: "User with this email already exist", status: 400 });
            return;
        }

        let hashPass = await bcrypt.hash(password, salt);

        let user = await User.create({
            name, email, location, password: hashPass
        })
        if (user) {
            res.status(200).json({ message: "User created", status: 200 })
        }

    } catch (error) {
        res.json({ error, status: 500 })
    }




})

router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    

    let user = await User.findOne({ email })

    if (!user) {
        res.status(404).json({ status: 404, message: "user does not exist" })
        return;
    }

    let compare = await bcrypt.compare(password, user.password);

    if (!compare) {
        res.status(500).json({ status: 500, message: "Login with valid creadential" })
        return;

    }

    let token = jwt.sign({
        user: {
            id: user.id, email, password
        }
    }, privatekey);

    res.status(200).json({ status: 200, token });





})


router.get('/getuser', Authentication, async (req, res) => {


    let id = req.user.user.id;
    let user = await User.findById(id);

    if (!user) {
        res.status(404).json({status:404, message: "Something wrong", });
        return;
    }
    res.status(200).json({status:200,user});

})

module.exports = router;