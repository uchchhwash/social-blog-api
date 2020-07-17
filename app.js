//npm modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { multerHandler } = require('./utils/multer');

//middleware
const errorHandler = require('./middleware/errorHandler');
const cors = require('./middleware/cors');
//routes
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

multerHandler(app);
app.use(bodyParser.json());


app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(cors);


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);


require('./startup/db')();

app.use(errorHandler);

app.listen(8080, () => {
    console.log('Server started successfully on port 8080');
})