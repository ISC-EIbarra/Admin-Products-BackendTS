import request from 'supertest';
import server from '../server';

describe('Get /api', () => {
  it('Should send back json response', async () => {
    const res = await request(server).get('/api');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.msg).toBe('Desde API');
  });
});
