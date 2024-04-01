import { jest,test,expect,afterAll } from "@jest/globals"
import request from'supertest'
import app from '../index'
// testing message routes

describe('post/brand/sendmessage', () => {
    test('should send message', async () => {
      const response = await request(app)
        .post('/brand/Sendmessage')
     expect(response.status).toBe(200)
    },20000);
  });
describe('get/brand/message', () => {
    test('should display message ', async () => {
      const response = await request(app)
        .get('/brand/message')
     expect(response.status).toBe(200)
    },20000);
  });
describe('get/brand/deletemessage', () => {
    test('should display message ', async () => {
      const response = await request(app)
        .delete('/brand/deletemessage/:id')
     expect(response.status).toBe(200)
    },20000);
  });


