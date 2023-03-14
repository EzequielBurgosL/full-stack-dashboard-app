
import express, { Application } from "express";
import bodyparser from 'body-parser';
import routes from './routes';
import cors from 'cors';

const app: Application = express();

app.use(cors()) // enable all CORS requests
app.use(bodyparser.json()); // parse application/json
app.use(bodyparser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use('/', routes);

export default app;
