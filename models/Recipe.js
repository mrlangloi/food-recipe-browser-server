const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipe : {
        key: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        mealType: {
            type: Array,
            required: true
        },
        cuisineType: {
            type: Array,
            required: true
        },
        ingredientLines: {
            type: Array,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);