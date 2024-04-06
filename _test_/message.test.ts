import { jest,test,expect,afterAll,beforeAll } from "@jest/globals"
import request from'supertest'
import app from '../index'
import mongoose from "mongoose"
describe('testing message routes',()=>{
  beforeAll(async()=>{
    await mongoose.connect('mongodb+srv://user1:user1@cluster0.q3w70mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  })
  afterAll(async()=>{
  await mongoose.connection.close()
  await mongoose.disconnect()
  })
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



})
// testing message routes

