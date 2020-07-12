const mongoose = require('mongoose');

module.exports = () => {
    const db = 'mongodb://localhost:27017/sociablog';
    mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(result => {
            console.log('Connected to DB successfully');
        })
        .catch(err => {
            console.log('DB connection unsuccessful');
            process.exit();
        })
}