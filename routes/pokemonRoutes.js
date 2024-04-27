const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const verifyToken = require('../middlewares/verifyToken');
const pokemonValidationMiddleware = require('../middlewares/dataValidation');
const { validationResult } = require('express-validator');

const validate =  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    } 
    next();
};

// Get all pokemons
router.get('/', verifyToken, pokemonController.getAllPokemons);

// Get ONE pokemon
router.get('/:id', verifyToken, pokemonController.getOnePokemon);

// Create a Pokemon
router.post('/', verifyToken, pokemonValidationMiddleware(), validate, pokemonController.createPokemon);

// Edit a Pokemon
router.put('/:id', verifyToken, pokemonController.editPokemon);

// Delete a Pokemon
router.delete('/:id', verifyToken, pokemonController.deletePokemon);

module.exports = router;
