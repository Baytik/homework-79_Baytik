const express = require('express');
const cors = require('cors');
const products = require('./app/products');
const config = require('./config');
const fileDb = require('./fileDb');
const categories = require('./app/categories');
const location = require('./app/location');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/resources', products);
app.use('/categories', categories);
app.use('/location', location);

const run = async () => {
    await fileDb.init();
    app.listen(config.port)
};

run().catch(e => {
    console.error(e)
});