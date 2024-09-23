import request from 'supertest';
import app from '../server'; // Adjust the path to point to your Express app

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123',
        confirmPassword: 'password123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should not register a user with mismatched passwords', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123',
        confirmPassword: 'wrongpassword'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  it('should log in a registered user', async () => {
    // First register the user
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser2',
        password: 'password123',
        confirmPassword: 'password123'
      });

    // Then log in
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser2',
        password: 'password123',
      });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.message).toBe('Login successful');
    expect(loginResponse.body.token).toBeDefined();
  });
});
