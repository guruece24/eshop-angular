const { Product } = require('../models/product')
const { Category } = require('../models/category')

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get(`/all`, async (req, res) => {
    const productList = await Product.find().populate('category')

    if (!productList) {
        res.status(500).json({
            error: err,
            success: false,
        })
    }
    res.send(productList)
    // res.status(200).json(productList)
})

router.get(`/`, async (req, res) => {
    const productList = await Product.find()
        .populate('category')
        .select('name category price rating -_id')

    if (!productList) {
        res.status(500).json({
            error: err,
            success: false,
        })
    }
    res.send(productList)
})

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category')

    if (!product) {
        res.status(500).json({
            error: err,
            success: false,
        })
    }
    res.send(product)
})

router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    const productres = await product.save()

    if (!productres)
        return res.status(500).send('The product cannot be created!')

    res.send(productres)
})

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }

    const category = await Category.findById(req.body.category)
    if (!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    )

    if (!product) return res.status(500).send('the product cannot be updated!')

    res.send(product)
})

router.delete('/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }

    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res
                    .status(200)
                    .json({ success: true, message: 'the product is deleted!' })
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'product not found!' })
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err })
        })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments();

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

module.exports = router
