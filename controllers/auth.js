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

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found');
                error.statusCode = 401;
                throw error;

                loadedUser = user;
                return bcrypt.compare(password, user.password);
            }
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong Password!');
                error.statusCode = 401;
                throw error;
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}