const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');  
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Medical Appointments API funcionando'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/appointments', appointmentRoutes);

module.exports = app;