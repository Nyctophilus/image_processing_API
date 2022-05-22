import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('image resize', async () => {
    const response = await request.get('/image?filename=hunt&w=1000&h=500');

    expect(response.status).toBe(200);
  });

  it('image not found', async () => {
    const response = await request.get(
      '/image?filename=xyzcaasew&w=120&h=1000'
    );

    expect(response.status).toBe(404);
  });
});
