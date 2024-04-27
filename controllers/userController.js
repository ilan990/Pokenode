const bcrypt = require('bcrypt');
// faites un 'npm i jsonwebtoken' d'abord
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found.");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      updateData,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json("User not found.");
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd,
      role: req.body.role // Ajoutez le champ de rôle ici
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json("User not found.");
    res.status(200).json('User deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(404).json('Invalid identifiers');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).json('Invalid identifiers');
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.header('auth-token', token).send(token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};