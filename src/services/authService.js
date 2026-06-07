const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const register = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email
  });

  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  const user = await User.create(userData);

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
};

module.exports = {
  register,
  login
};