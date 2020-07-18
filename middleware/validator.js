const { body, validationResult } = require('express-validator');
const User = require('../models/user')

exports.postValidator = [body('title')
    .trim()
    .isLength({ min: 5 }),
    body('content')
    .trim()
    .isLength({ min: 5 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation Failed, Entered data is incorrect!')
            error.statusCode = 422;
            throw error;
            //return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
]

exports.userValidator = [body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email address already exist!')
            };
        })
    }),
    body('password')
    .trim()
    .isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),
    (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            const error = new Error(err.errors[0].msg)
            error.statusCode = 422;
            throw error;
            //return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
]