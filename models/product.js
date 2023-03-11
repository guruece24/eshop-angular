const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  image: String,
  countInStock: {
      type: Number,
      required: true,
  }
})


exports.Product = mongoose.model('Product', productSchema)
