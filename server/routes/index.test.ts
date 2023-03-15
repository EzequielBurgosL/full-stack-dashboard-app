import request from 'supertest';
import database from '../db';
import app from '../app';
import server from '../index';

describe('GET /api/articles/:id/:timeRange', () => {
  afterAll(() => {
    server.close();
  });

  it('should return a 200 response and the correct article data', async () => {
    const expectedResponse = {
      id: "f1cbfdfd-006f-4d77-9fbb-913758170a49",
      url: "https://www.example.com/article1",
      author: "John",
      image_url: "https://picsum.photos/600/400?buster=0.19513832527942854",
      timeRange: 'today',
      labels: ['hour 0', 'hour 1'],
      data: [10, 20]
    };
    jest.spyOn(database, 'findOneByTimeRange').mockReturnValue(expectedResponse);
    const response = await request(app).get('/api/articles/1/today');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should return a 404 response when the article is not found', async () => {
    // Mock the database findOneByTimeRange method to return null
    jest.spyOn(database, 'findOneByTimeRange').mockReturnValue(null);
    const response = await request(app).get('/api/articles/1/today');
    expect(response.statusCode).toBe(404);
  });

  it('should return a 500 response when an error occurs', async () => {
    // Mock the database findOneByTimeRange method to throw an error
    jest.spyOn(database, 'findOneByTimeRange').mockImplementation(() => {
      throw new Error('Database error');
    });
    const response = await request(app).get('/api/articles/1/today');
    expect(response.statusCode).toBe(500);
  });
});