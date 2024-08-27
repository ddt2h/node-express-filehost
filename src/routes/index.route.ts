import { Router } from 'express';
import IndexController from '../controllers/index.controller';

const indexRoute = Router();
const indexController: IndexController = new IndexController();

indexRoute.get('/', indexController.getIndexPage);

export default indexRoute;