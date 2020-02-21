const express = require('express');
const router = express.Router();
const fs = require('fs');
const nanoid = require('nanoid');

router.post('/', (req, res) => {
    const errorMessage = {
        error: 'location must be present in the request'
    };

    const location = {
        idLocation: nanoid(),
        location: req.body.location,
        description: req.body.description
    };

    if (req.body.location === '') {
        res.status(400).send(errorMessage);
    } else {
        const fileName = `./files/locationFiles/${nanoid()}.txt`;
        const data = JSON.stringify(location, null, 2);
        fs.writeFile(fileName, data, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File was saved!')
            }
        });
        res.send(location);
    }
});

module.exports = router;
