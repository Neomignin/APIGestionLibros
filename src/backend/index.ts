import Express from 'express';
import methodOverride from 'method-override';
import { publicPath } from './config/configData.js';
import { staticRouter } from './routes/staticRouter.js';
import apiRouter from './routes/apiRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = Express();
const port = 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(Express.static(publicPath));

app.use("/", staticRouter);
app.use("/api/", apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});