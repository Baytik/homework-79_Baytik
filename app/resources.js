const express = require('express');
const router = express.Router();
const fs = require('fs');
const nanoid = require('nanoid');

router.get('/', (req, res) => {
    const resources = [];
    const products = [];
    fs.readdir('./files/subjectFiles', async (err, files) => {
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

router.get('/:id', (req, res) => {
    const resource = [];
    const product = [];
    fs.readdir('./files/subjectFiles', (err, files) => {
        files.map(file => {
            const data = fs.readFileSync(`./files/subjectFiles/${file}`);
            resource.push(JSON.parse(data.toString()));
            Object.keys(resource).map((obj) => {
                const object = {
                    id: resource[obj].idSubject,
                    name: resource[obj].subject
                };
                product.push(object);
                if (req.params.id === resource[obj].idSubject) {
                    const oneProduct = product.find(item => item.id === resource[obj].idSubject);
                    res.send(oneProduct)
                }
            })
        });
    })
});

router.put('/:id', (req, res) => {
    const products = [];
    const product = [];
    fs.readdir('./files/subjectFiles', (err, files) => {
        files.map(file => {
            const data = fs.readFileSync(`./files/subjectFiles/${file}`);
            products.push(JSON.parse(data.toString()));
        });
        Object.keys(products).map((obj) => {
            const object = {
                id: products[obj].idSubject,
                name: req.body.name
            };
            product.push(object);
            if (req.params.id === products[obj].idSubject) {
                const itemIndex = products.findIndex(item => item.id === products[obj].idSubject);
                products[itemIndex] = products[obj].subject;
                res.send(product)
            }
        })
    })
});

router.post('/', (req, res) => {
    const errorMessage = {
        error: 'Error miss some titles'
    };

    const resources = {
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
        const data = JSON.stringify(resources, null, 2);
        fs.writeFile(fileName, data, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File was saved!')
            }
        });
        res.send(resources);
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const resource = [];
    fs.readdir('./files/subjectFiles', (err, files) => {
        files.map(file => {
            const data = fs.readFileSync(`./files/subjectFiles/${file}`);
            resource.push(JSON.parse(data.toString()));
            let index;
            resource.map((obj) => {
                if (id === obj.idSubject) {
                    index = resource.indexOf(obj);
                    resource.splice(index, 1);
                }
                fs.unlink(`./files/subjectFiles/${file}`,(err) => {
                    if (err) throw err;
                    console.log('File deleted!');
                });
            });
            res.send(resource);
        });
    })
});

module.exports = router;