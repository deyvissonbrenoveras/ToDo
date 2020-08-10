import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import TodoController from './app/controllers/TodoController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

// USER
routes.post('/users', UserController.store);

// SESSION
routes.post('/sessions', SessionController.store);

// AUTHENTICATION MIDDLEWARE
routes.use(authMiddleware);

// USER
routes.put('/users', UserController.update);

// TODO
routes.get('/todos', TodoController.index);
routes.post('/todos', TodoController.store);
routes.get('/todos/:id', TodoController.show);
routes.put('/todos/:id', TodoController.update);
routes.delete('/todos/:id', TodoController.delete);

// FILE UPLOAD
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
