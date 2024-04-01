import { jest,test,expect,afterAll } from "@jest/globals"
import request from'supertest'
import app from '../index'
//  testing blog routes
describe('GET /api/brand/blog', () => {
    test('should get all blogs', async () => {
      const response = await request(app)
        .get('/brand/blogs')
     expect(response.status).toBe(200)
    },20000);
  });
  
  describe('post/brand/addBlogs', () => {
      test('should post  blogs', async () => {
        const response = await request(app)
          .post('/brand/addblog')
       expect(response.status).toBe(200)
      },20000);
    });
  describe('post/brand/comment', () => {
      test('should post  comment', async () => {
        const response = await request(app)
          .post('/brand/comment/:id')
       expect(response.status).toBe(200)
      },20000);
    });
  describe('patch/brand/blog', () => {
      test('should update  blog', async () => {
        const response = await request(app)
          .patch('/brand/updateBlog/:id')
       expect(response.status).toBe(200)
      },20000);
    });
  describe('patch/brand/like', () => {
      test('should like  blog', async () => {
        const response = await request(app)
          .patch('/brand/like/:id')
       expect(response.status).toBe(200)
      },20000);
    });
  describe('delete/brand/deleteblog', () => {
      test('should delete blog', async () => {
        const response = await request(app)
          .delete('/brand/deleteblog/:id')
       expect(response.status).toBe(200)
      },20000);
    });
 
  