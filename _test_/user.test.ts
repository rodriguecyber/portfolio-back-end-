import { jest,test,expect,afterAll,beforeAll } from "@jest/globals"
import request from'supertest'
import app from '../index'
import mongoose from "mongoose"

describe('testing',()=>{
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://user1:user1@cluster0.q3w70mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
})
afterAll(async()=>{
  await mongoose.connection.close();
  await mongoose.disconnect()
})
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
  test('should let user create reset password token ', async () => {
    const response = await request(app)
      .post('/brand/forgot-password')
   expect(response.status).toBe(200)
  },20000);
});
describe('post/brand/reset-password', () => {
  test('should let user reset password  ', async () => {
    const response = await request(app)
      .post('/brand/reset-password')
      .send({
        token:"1",
        password:"newPassword",
      })
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
})

