import Express from 'express';
import bookRouter from './bookRouter.js';

const apiRouter = Express.Router();

apiRouter.use("/books", bookRouter);

export default apiRouter;