import { Router } from 'express';
import FileController from '../controllers/file.controller';

const fileRoute = Router();
const fileController: FileController = new FileController();

fileRoute.get('/:name', fileController.getFile);
fileRoute.post('/', fileController.postFile);
fileRoute.delete('/:name', fileController.deleteFile);
fileRoute.get('/', fileController.getList);

export default fileRoute;