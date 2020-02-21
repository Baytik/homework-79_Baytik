const express = require('express');
const cors = require('cors');
const resources = require('./app/resources');
const config = require('./config');
const categories = require('./app/categories');
const location = require('./app/location');
const subject = require('./app/subject');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/resources', resources);
app.use('/categories', categories);
app.use('/location', location);
app.use('/subject', subject);

const run = async () => {
    app.listen(config.port)
};

run().catch(e => {
    console.error(e)
});