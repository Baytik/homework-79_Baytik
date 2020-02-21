const express = require('express');
const router = express.Router();
const fs = require('fs');
const nanoid = require('nanoid');

router.post('/', (req, res) => {
    const errorMessage = {
        error: 'Error miss some titles'
    };

    const subject = {
        idSubject: nanoid(),
        category: req.body.category,
        location: req.body.location,
        subject: req.body.subject,
        description: req.body.description
    };

    if (req.body.location === ''|| req.body.category === '' || req.body.subject === '') {
        res.status(400).send(errorMessage);
    } else {
        const fileName = `./files/subjectFiles/${nanoid()}.txt`;
        const data = JSON.stringify(subject, null, 2);
        fs.writeFile(fileName, data, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File was saved!')
            }
        });
        res.send(subject);
    }
});

module.exports = router;