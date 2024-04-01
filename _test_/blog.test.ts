import { jest,test,expect,afterAll } from "@jest/globals"
import request from'supertest'
import app from '../index'
 
describe('GET /api/brand/blog', () => {
    test('should get all blogs', async () => {
      const response = await request(app)
        .get('/brand/blogs')
     expect(response.status).toBe(200)
    },20000);
  });
  
  describe('post/api/brand/addBlogs', () => {
      test('should post  blogs', async () => {
        const response = await request(app)
          .post('/brand/addblog')
       expect(response.status).toBe(200)
      },20000);
    });

  