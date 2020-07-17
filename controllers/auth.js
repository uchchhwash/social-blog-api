const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.signup = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = bcrypt.hash(req.body.password, 12)
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                name: name
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User Created', userId: result._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}