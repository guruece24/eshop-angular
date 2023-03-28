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

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});


exports.Category = mongoose.model('Category', categorySchema)
