const express = require('express');
const router = express.Router();
const {
    getRecipes,
    getFilteredRecipes,
    getSavedRecipes,
    saveRecipe,
    deleteRecipe
} = require('../../controllers/recipeController');



/*
TODO:
- CSS
- get context working?? my temp solution is prop drilling currently
*/

/**
 * Gets random recipes from the API w/o any queries
 */
router.get('/', getRecipes);

/**
 * Gets and filters out recipes from the API using multiple queries
 */
router.get('/:label/:meal/:cuisine', getFilteredRecipes);

/**
 * Retrieves saved recipes
 */
router.get('/saved', getSavedRecipes);

/**
 * Saves a recipe into the the db
 */
router.post('/saved', saveRecipe);


/**
 * Deletes a recipe from an id
 */
router.delete('/delete/:id', deleteRecipe);

module.exports = router;