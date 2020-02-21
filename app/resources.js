const express = require('express');
const router = express.Router();
const fs = require('fs');
const nanoid = require('nanoid');

router.get('/', (req, res) => {
    const resources = [];
    const products = [];
    fs.readdir('./files/subjectFiles', (err, files) => {
        files.map(file => {
            const data = fs.readFileSync(`./files/subjectFiles/${file}`);
            resources.push(JSON.parse(data.toString()));
            for(let resource of resources) {
                const obj = {
                    id: resource.idSubject,
                    name: resource.subject
                };
                products.push(obj);
            }
        });
        res.send(products)
    });
});

router.get('/:id', async (req, res) => {

});

module.exports = router;