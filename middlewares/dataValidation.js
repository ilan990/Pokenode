const { body, validationResult } = require('express-validator');

// Middleware de validation des données du Pokémon
const pokemonValidationMiddleware = () => {
    return [
        body('name').isLength({ max: 10 }).withMessage('Le nom du Pokémon ne doit pas dépasser 10 caractères.'),
        body('hp').isInt({ min: 1, max: 100 }).withMessage('Les points de vie (HP) du Pokémon doivent être compris entre 1 et 100.')
    ];
}

module.exports = pokemonValidationMiddleware;