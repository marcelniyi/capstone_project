import app from "../app"; // Link to your server file
import supertest from "supertest";
const request = supertest(app);
import mongoose from 'mongoose';

import {config} from '../../config';

const databaseName = config.dbUrl;
import Articles from '../models/articles';
import { generateToken } from '../helpers/auth'


const token = generateToken({
    email: 'max@gmail.com',
    isadmin: 'false',
    id: '5f9654d321d4d92b1ec743d9',
})

describe('All about blog POST', () => {
  afterAll(async() => {
    await Articles.deleteMany()
  });

  it('User should post blog', async done => {
    const res = await request
    .post('/api/v1/blog')
    .set("authorization", `Bearer ${token}`)
  	.send({
        title: "blog posting testing",
      	descriptions: "jhgfdsfdgfhjhk",
      	image: "jhjghfgdsfdgfh"
      })
      expect(res.status).toBe(201)
      expect(res.body.message).toBe('blog added successfully')
    done()
  });

  it('User should not post without loged in', async done => {
    const res = await request
    .post('/api/v1/blog')
    //.set("authorization", `Bearer ${token}`)
    .send({
        title: "blog posting testing",
        descriptions: "jhgfdsfdgfhjhk",
        image: "jhjghfgdsfdgfh"
      })
      expect(res.status).toBe(401)
      expect(res.body.error).toBe('Please, sign-in!')
    done()
  });

  it('User should not post blog twice', async done => {
    const res = await request
    .post('/api/v1/blog')
    .set("authorization", `Bearer ${token}`)
    .send({
        title: "blog posting testing",
        descriptions: "jhgfdsfdgfhjhk",
        image: "jhjghfgdsfdgfh"
      })
      expect(res.status).toBe(409)
      expect(res.body.errer).toBe('Blog already exist')
    done()
  });

  it('User should not post blog empty fields', async done => {
    const res = await request
    .post('/api/v1/blog')
    .set("authorization", `Bearer ${token}`)
    .send({
        title: "",
        descriptions: "",
        image: ""
      })
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message')
    done()
  });
})

describe('All about blog GET', () => {
  afterAll(async() => {
    await Articles.deleteMany()
  });

  it('Should list all blogs', async done => {
    const res = await request
    .get('/api/v1/blogs')
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('articles')
    done()
  });

  it('Should list all blogs of a logedin user', async done => {
    const res = await request
    .get('/api/v1/myBlog')
    .set("authorization", `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('articles')
    done()
  });

  it('Should not list any blog if no logged in user', async done => {
    const res = await request
    .get('/api/v1/myBlog')
    //.set("authorization", `Bearer ${token}`)
    expect(res.status).toBe(401)
    expect(res.body.error).toBe('Please, sign-in!')
    done()
  });

  // it('Should not update blogs', async done => {
  //   const res = await request
  //   .get('/api/v1/myBlog')
  //   //.set("authorization", `Bearer ${token}`)
  //   expect(res.status).toBe(401)
  //   expect(res.body.error).toBe('Please, sign-in!')
  //   done()
  // });



})
