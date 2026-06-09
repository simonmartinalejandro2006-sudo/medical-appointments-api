const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  test('debe responder correctamente', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      'Medical Appointments API funcionando'
    );
  });
});