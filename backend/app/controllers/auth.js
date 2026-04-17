let User = require('../models/user');
let jwt = require('jsonwebtoken');
let { expressjwt } = require('express-jwt');

let secretKey = process.env.SECRETKEY;

module.exports.signin = async function (req, res, next) {
    try {
        // console.log(req.body)
        let user = await User.findOne({ "email": req.body.email });
        if (!user)
            throw new Error('User not found.');
        if (!user.authenticate(req.body.password))
            throw new Error("Email and/or password don't match.");

        let payload = {
            id: user._id,
            username: user.username
        }

        let token = jwt.sign(payload, secretKey, {
            algorithm: 'HS512',
            expiresIn: "20min"
        })

        res.json({
            success: true,
            message: "User authenticated successfully.",
            token: token
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.requireSignin = expressjwt({
    secret: secretKey,
    algorithms: ['HS512'],
    userProperty: 'auth'
});

module.exports.logToken = async function(req, res, next){
    console.log(req.headers);
    console.log(req.auth);
    next();
}