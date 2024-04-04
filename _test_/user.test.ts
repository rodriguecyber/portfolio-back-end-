import { jest,test,expect,afterAll } from "@jest/globals"
import request from'supertest'
import app from '../index'
describe('post/brand/signup', () => {
    test('should register new user ', async () => {
      const response = await request(app)
        .post('/brand/signup')
        .send({
          firstname:'name',
          lastname:'name',
          email:'name',
          password:'name',
        })
     expect(response.status).toBe(200)
    },20000);
  });
  describe('post/brand/login', () => {
    test('should let user login ', async () => {
      const response = await request(app)
        .post('/brand/login')
     expect(response.status).toBe(200)
    },20000);
  });
  describe('post/brand/forgot-password', () => {
    test('should let create reset password token ', async () => {
      const response = await request(app)
        .post('/brand/forgot-password')
     expect(response.status).toBe(200)
    },20000);
  });
  describe('post/brand/reset-password', () => {
    test('should let create reset password token ', async () => {
      const response = await request(app)
        .post('/brand/reset-password')
     expect(response.status).toBe(200)
    },20000);
  });
  describe('get/brand/subscriber', () => {
    test('should get subscribers ', async () => {
      const response = await request(app)
        .get('/brand/subscriber')
     expect(response.status).toBe(200)
    },20000);
  });