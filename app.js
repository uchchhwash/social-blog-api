//npm modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
//middleware
const cors = require('./middleware/cors');
//routes
const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors);


app.use('/feed', feedRoutes);
app.use(errorHandler);

require('./startup/db')();

app.listen(8080, () => {
    console.log('Server started successfully on port 8080');
})