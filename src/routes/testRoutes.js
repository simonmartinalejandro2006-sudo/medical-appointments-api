const express = require('express');
const {
  protect,
  restrictTo
} = require('../middlewares/authMiddleware');

const router = express.Router();

router.get(
  '/admin',
  protect,
  restrictTo('admin'),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Ruta protegida para administradores',
      user: req.user
    });
  }
);

module.exports = router;
