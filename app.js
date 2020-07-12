//npm modules
const express = require('express');
const bodyParser = require('body-parser');

//middleware
const cors = require('./middleware/cors');
//routes
const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
app.use(cors);

app.use('/feed', feedRoutes);

require('./startup/db')();

app.listen(8080, () => {
    console.log('server started successfully on port 8080');
})