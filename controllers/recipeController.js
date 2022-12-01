const Recipe = require('../models/Recipe')
const mongoose = require('mongoose')
const axios = require('axios')

const APP_KEY = "01bacb1ccf1b068a991794a4d1b81907"
const APP_ID = "e9171c06"

// get all recipes
const getRecipes = async (req, res) => {
    const URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&ingr=5-8&diet=balanced&imageSize=REGULAR&random=true&field=label&field=image&field=url&field=ingredientLines&field=cuisineType&field=mealType`

    const response = await axios.get(URL)

    if(response.data.hits.length > 0) {
        res.json(response.data)
    }
    else {
        res.status(404).json({msg: `No recipes found!`})
    }
}


// get recipes from a filter of 3 queries
const getFilteredRecipes = async (req, res) => {

    // establish my queries if they exist
    const label = req.params.label !== "any" ? `&q=${req.params.label}` : ""
    const meal = req.params.meal !== "any" ? `&mealType=${req.params.meal}` : ""
    const cuisine = req.params.cuisine !== "any" ? `&cuisineType=${req.params.cuisine}` : ""

    // customize the URL using the query fields
    const URL = `https://api.edamam.com/api/recipes/v2?type=public${label}&app_id=${APP_ID}&app_key=${APP_KEY}&ingr=5-8&diet=balanced&imageSize=REGULAR&random=true&field=label&field=image&field=url&field=ingredientLines&field=cuisineType&field=mealType${meal}${cuisine}`

    const response = await axios.get(URL)

    if(response.data.hits.length > 0) {
        res.json(response.data)
    }
    else {
        res.status(404).json({msg: `No recipes with ${req.params.label} found!`})
    }
}


// get saved recipes
const getSavedRecipes = async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: 1})

    if(recipes) {
        res.json(recipes)
    }
    else {
        res.status(404).json({ msg: `No saved recipes found!`})
    }
}


// save a recipe
const saveRecipe = async (req, res) => {
    
    const {key, label, image, mealType, cuisineType, ingredientLines, url} = req.body.recipe

    const recipe = {
        key: key,
        label: label,
        image: image,
        mealType: mealType,
        cuisineType: cuisineType,
        ingredientLines: ingredientLines,
        url: url
    }

    try {
        const newRecipe = await Recipe.create({recipe})
        res.json(newRecipe)
    }
    catch(error) {
        res.status(400).json({msg: `Unable to save recipe! Error: ${error.message}`})
    }
}


// delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: `No recipe exists!`})
    }

    const recipe = await Recipe.findOneAndDelete({ _id: id })

    if(!recipe) {
        return res.status(404).json({msg: `No recipe exists!`})
    }

    const recipes = await Recipe.find({}).sort({createdAt: 1})
    res.json({
        msg: `Removed recipe id: ${id}`,
        savedRecipes: recipes
    })
}


module.exports = {
    getRecipes,
    getFilteredRecipes,
    getSavedRecipes,
    saveRecipe,
    deleteRecipe
}