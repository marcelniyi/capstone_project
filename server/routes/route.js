import {Router} from 'express';
import { checkToken } from '../helpers/auth';


import {userRegister, userLogin, listUsers} from '../controllers/users';
import { addQueries, listQueries } from '../controllers/queries';
import { addBlog, listBlog,
   singleBlog,
    listBlogOwner,
     deleteBlog,
      updateBlog }
from '../controllers/articles';


const TodoRoute = Router();


TodoRoute.post('/api/v1/usersRegister', userRegister)
TodoRoute.post('/api/v1/userLogin', userLogin)
TodoRoute.get('/api/v1/listUsers', checkToken, listUsers)

TodoRoute.post('/api/v1/blog', checkToken, addBlog)
TodoRoute.get('/api/v1/blogs', listBlog)
TodoRoute.get('/api/v1/blogs/:id', singleBlog)
TodoRoute.delete('/api/v1/blogs/:id', checkToken, deleteBlog)
TodoRoute.put('/api/v1/blogs/:id', checkToken, updateBlog)
TodoRoute.get('/api/v1/myBlog', checkToken, listBlogOwner)

TodoRoute.post('/api/v1/queries', addQueries)
TodoRoute.get('/api/v1/queries', checkToken, listQueries)

export default TodoRoute
