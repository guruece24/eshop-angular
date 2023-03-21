const { Product } = require('../models/product')
const { Category } = require('../models/category')

const express = require('express')
const router = express.Router()

router.get(`/`, async (req, res) => {
    const productList = await Product.find()

    if (!productList) {
        res.status(500).json({
            error: err,
            success: false,
        })
    }
    res.send(productList)
    // res.status(200).json(productList)
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

    const productres = await product.save();

    if (!productres)
        return res.status(500).send('The product cannot be created!')

    res.send(productres)
})

module.exports = router
