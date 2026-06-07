const Appointment = require('../models/Appointment');

/**
 * Crear turno
 */
const createAppointment = async (appointmentData) => {
  const {
    fecha,
    horaInicio,
    horaFin,
    profesional
  } = appointmentData;

  // Verificar si existe un turno solapado
  const existingAppointment = await Appointment.findOne({
    fecha,
    profesional,
    estado: {
      $ne: 'cancelado'
    },
    $or: [
      {
        horaInicio: { $lt: horaFin },
        horaFin: { $gt: horaInicio }
      }
    ]
  });

  if (existingAppointment) {
    throw new Error(
      'El profesional ya tiene un turno asignado en ese horario'
    );
  }

  return Appointment.create(appointmentData);
};

/**
 * Obtener todos los turnos
 */
const getAllAppointments = async (filters = {}) => {
  return Appointment.find(filters)
    .populate('paciente', 'name email')
    .sort({ fecha: 1 });
};

/**
 * Obtener turnos de un paciente
 */
const getMyAppointments = async (patientId) => {
  return Appointment.find({
    paciente: patientId
  })
    .populate('paciente', 'name email')
    .sort({ fecha: -1 });
};

/**
 * Cancelar turno
 */
const cancelAppointment = async (appointmentId) => {
  return Appointment.findByIdAndUpdate(
    appointmentId,
    {
      estado: 'cancelado'
    },
    {
      new: true
    }
  );
};

/**
 * Cambiar estado
 */
const updateAppointmentStatus = async (
  appointmentId,
  status
) => {
  return Appointment.findByIdAndUpdate(
    appointmentId,
    {
      estado: status
    },
    {
      new: true
    }
  );
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
  cancelAppointment,
  updateAppointmentStatus
};