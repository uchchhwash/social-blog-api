const { body, validationResult } = require('express-validator');

exports.postValidator = [body('title')
    .trim()
    .isLength({ min: 5 }),
    body('content')
    .trim()
    .isLength({ min: 5 }),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
]