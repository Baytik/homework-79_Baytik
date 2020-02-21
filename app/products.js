const express = require('express');
const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');
const fileDb = require('../fileDb');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await fileDb.getItems();
    res.send(products);
});

router.get('/:id', async (req, res) => {
    const product = await fileDb.getItemById(req.params.id);
    if(!product) {
        return res.status(404).send({error: 'Not found'});
    }
    res.send(product);
});

router.post('/', upload.single('image'), async (req, res) => {
    const product = req.body;
        if (req.file) {
            product.image = req.file.filename;
        }
        await fileDb.addItem(product);
        res.send(product.id);
});

router.put('/:id', async (req, res) => {
   const newProductData = req.body;

   let product = await fileDb.getItemById(req.params.id);
   if (!product) {
       return res.status(404).send({error: 'Not found'});
   }
   product = {...product, ...newProductData};
   if (req.file) {
       product.image = req.file.filename;
   }
   await fileDb.updateItem(product);
   res.send(product)
});

module.exports = router;