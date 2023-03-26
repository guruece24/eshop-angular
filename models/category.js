const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
    // icon: {
    //     type: String,
    //     required: true,
    // },
    // Image: {
    //     type: String,
    //     required: true,
    // },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});


exports.Category = mongoose.model('Category', categorySchema)
