import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/AuthMiddleware';
import ProductsController from './app/controllers/ProductsController';
import CategoriesController from './app/controllers/CategoriesController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/categories', CategoriesController.store);

routes.post('/products', ProductsController.store);

routes.get('/categories', CategoriesController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/products', ProductsController.index);

export default routes;
