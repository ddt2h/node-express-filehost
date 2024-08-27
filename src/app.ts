import express from 'express';
import cors from 'cors'
import indexRoute from './routes/index.route';
import fileRoute from './routes/file.route';

class App {

  public app: express.Application;

  constructor() {
    this.app = express();

    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    
  }

  private initializeRoutes() {
    this.app.use('/', indexRoute);
    this.app.use('/files', fileRoute);
  }

  public listen() {
    this.app.listen(3000, '0.0.0.0', function () {
      console.log('Listening to port:  ' + 3000);
    });
  }
}

export default App;