const express = require('express');

const appointmentController = require('../controllers/appointmentController');

const {
  protect,
  restrictTo
} = require('../middlewares/authMiddleware');

const router = express.Router();


router.post(
  '/',
  protect,
  appointmentController.createAppointment
);


router.get(
  '/my',
  protect,
  appointmentController.getMyAppointments
);


router.get(
  '/',
  protect,
  restrictTo('admin'),
  appointmentController.getAllAppointments
);


router.patch(
  '/:id',
  protect,
  restrictTo('admin'),
  appointmentController.updateAppointment
);

router.patch(
  '/:id/cancel',
  protect,
  appointmentController.cancelAppointment
);

router.patch(
  '/:id/status',
  protect,
  restrictTo('admin'),
  appointmentController.updateAppointmentStatus
);

module.exports = router;