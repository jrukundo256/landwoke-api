const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// beforeAll(async () => {
//   // Setup: e.g., create test database, seed data
// });

// afterAll(async () => {
//   // Teardown: e.g., delete test database
//   await prisma.$disconnect();
// });

describe('User Endpoints', () => {
  // it('should get all users', async () => {
  //   const res = await request(app).get('/auth/users');
  //   expect(res.statusCode).toBe(200);
  //   expect(Array.isArray(res.body)).toBe(true);
  // });

  // Add more tests as needed

  // In a separate test file or at the beginning of your test suite
test('Database connection', async () => {
  try {
    await prisma.$connect();
    // If we get here, the connection was successful
    expect(true).toBe(true);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
});

  it('should get all users', async () => {
    const res = await request(app).get('/auth/users');
    if (res.statusCode !== 200) {
      console.error('Response body:', res.body);
    }
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

