import request from 'supertest';
import server from '../../server';

// Integration Testing

describe('POST /api/products', () => {
  it('Should display validation errors', async () => {
    const response = await request(server).post('/api/products').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);

    expect(response.body).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('Should validate than the product price is greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Nintendo Switch Oled - Testing',
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('Should validate than the product price is a number and greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Nintendo Switch Oled - Testing',
      price: 'Hola',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });

  it('Should create a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Nintendo Switch Oled - Testing',
      price: 350,
    });
    expect(response.status).toBe(201);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /api/products', () => {
  it('Should check if api/products url exist', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).not.toBe(404);
  });

  it('Get a JSON repsonse with products', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /api/products/:id', () => {
  it('Should return a 404 status response for a non-exist product', async () => {
    const productId = 3990;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Producto no encontrado');
  });

  it('Should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/products/not-valid-url');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('ID no válido');
  });

  it('Get a JSON response for a single product', async () => {
    const response = await request(server).get('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('PUT /api/products/:id', () => {
  it('Should check a valid ID in the URL', async () => {
    const response = await request(server)
      .put('/api/products/not-valid-url')
      .send({
        name: 'New TV Oled XLT Supreme - Update',
        price: 350,
        availability: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('ID no válido');
  });

  it('Should display validation error message when updating a product', async () => {
    const response = await request(server).put('/api/products/1').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('Should validate that the price is greater than 0', async () => {
    const response = await request(server).put('/api/products/1').send({
      name: 'New TV Oled XLT Supreme - Update',
      price: 0,
      availability: true,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Precio no válido');

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('Should return a 404 response for a non-existent product', async () => {
    const productId = 3999;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: 'New TV Oled XLT Supreme - Update',
        price: 350,
        availability: true,
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('Should update an existing product with valid data', async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: 'New TV Oled XLT Supreme - Update',
      price: 350,
      availability: true,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('PATCH /api/products/:id', () => {
  it('Should return a 404 response for a non-existing product', async () => {
    const productId = 3200;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('Should update the product availability', async () => {
    const response = await request(server).patch('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.availability).toBe(false);

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty('error');
  });
});

describe('DELETE /api/products/:id', () => {
  it('Should check for a valid ID product', async () => {
    const response = await request(server).delete('/api/products/not-valid');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].msg).toBe('ID no válido');
  });

  it('Should return a 404 response for a non-existent product', async () => {
    const productId = 200;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');

    expect(response.status).not.toBe(200);
  });

  it('Should delete a product', async () => {
    const response = await request(server).delete('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body.data).toBe('Producto eliminado');

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});
