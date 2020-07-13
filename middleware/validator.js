const { body, validationResult } = require('express-validator');

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