import Express from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';

const staticRouter = Express.Router();

staticRouter.get('/newBook', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/newBook.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/booksManagement', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/booksManagement.html");
    res.sendFile(targetFilePath);
});

export {staticRouter};