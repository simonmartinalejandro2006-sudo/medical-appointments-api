const generateToken = require('../src/utils/generateToken');

describe('generateToken', () => {
  test('debe generar un JWT válido', () => {
    const token = generateToken('123456');

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});