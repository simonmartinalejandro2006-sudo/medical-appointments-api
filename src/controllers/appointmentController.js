const appointmentService = require('../services/appointmentService');

/**
 * Crear turno
 */
const createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment({
      ...req.body,
      paciente: req.user._id
    });

    res.status(201).json({
      success: true,
      appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Obtener mis turnos
 */
const getMyAppointments = async (req, res) => {
  try {
    const appointments =
      await appointmentService.getMyAppointments(
        req.user._id
      );

    res.status(200).json({
      success: true,
      results: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Obtener todos los turnos (admin)
 */
const getAllAppointments = async (req, res) => {
  try {
    const appointments =
      await appointmentService.getAllAppointments(
        req.query
      );

    res.status(200).json({
      success: true,
      results: appointments.length,
      appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Cancelar turno
 */
const cancelAppointment = async (req, res) => {
  try {
    const appointment =
      await appointmentService.cancelAppointment(
        req.params.id
      );

    res.status(200).json({
      success: true,
      appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Cambiar estado
 */
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment =
      await appointmentService.updateAppointmentStatus(
        req.params.id,
        req.body.estado
      );

    res.status(200).json({
      success: true,
      appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  cancelAppointment,
  updateAppointmentStatus
};