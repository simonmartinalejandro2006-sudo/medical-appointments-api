const express = require('express');

const appointmentController = require('../controllers/appointmentController');

const {
  protect,
  restrictTo
} = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * Cliente crea turno
 */
router.post(
  '/',
  protect,
  appointmentController.createAppointment
);

/**
 * Cliente ve sus turnos
 */
router.get(
  '/my',
  protect,
  appointmentController.getMyAppointments
);

/**
 * Admin ve todos los turnos
 */
router.get(
  '/',
  protect,
  restrictTo('admin'),
  appointmentController.getAllAppointments
);

/**
 * Cancelar turno
 */
router.patch(
  '/:id/cancel',
  protect,
  appointmentController.cancelAppointment
);

/**
 * Cambiar estado (admin)
 */
router.patch(
  '/:id/status',
  protect,
  restrictTo('admin'),
  appointmentController.updateAppointmentStatus
);

module.exports = router;