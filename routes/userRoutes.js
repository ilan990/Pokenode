const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

// Routes accessibles à tous les utilisateurs
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/', userController.register);
router.post('/login', userController.login);

// Middleware pour vérifier le token et le rôle
router.use(verifyToken);

// Routes accessibles uniquement aux utilisateurs authentifiés
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;