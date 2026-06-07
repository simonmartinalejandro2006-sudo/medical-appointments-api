const mongoose = require ('mongoose');
const appointmentSchema = new mongoose.Schema(
  {
    fecha: {
      type: Date,
      required: [true, 'La fecha es obligatoria']
    },

    horaInicio: {
      type: String,
      required: [true, 'La hora de inicio es obligatoria']
    },

    horaFin: {
      type: String,
      required: [true, 'La hora de fin es obligatoria']
    },

    profesional: {
      type: String,
      required: [true, 'El profesional es obligatorio'],
      trim: true
    },

    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    especialidad: {
      type: String,
      required: [true, 'La especialidad es obligatoria'],
      trim: true
    },

    estado: {
      type: String,
      enum: [
        'pendiente',
        'confirmado',
        'cancelado',
        'completado'
      ],
      default: 'pendiente'
    },

    motivo: {
      type: String,
      trim: true
    },

    precio: {
      type: Number,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'Appointment',
  appointmentSchema
);