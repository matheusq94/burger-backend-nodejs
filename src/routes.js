import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ ok: true }));

routes.post('/user', UserController.store);

export default routes;
