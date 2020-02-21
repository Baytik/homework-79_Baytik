const express = require('express');
const router = express.Router();
const fs = require('fs');
const nanoid = require('nanoid');

router.post('/', (req, res) => {
    const errorMessage = {
        error: 'title must be present in the request'
    };

    const category = {
        idCategory: nanoid(),
        title: req.body.title,
        description: req.body.description
    };

    if (req.body.title === '') {
        res.status(400).send(errorMessage);
    } else {
        const fileName = `./files/${nanoid()}.txt`;
        const data = JSON.stringify(category, null, 2);
        fs.writeFile(fileName, data, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File was saved!')
            }
        });
        res.send(category);
    }
});

module.exports = router;