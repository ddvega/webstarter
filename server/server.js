import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import colors from 'colors';
import logger from 'morgan'
import { connectDB } from './database/db.js';
import { apiRouter } from './api.js';

connectDB();
const app = express();

app.use(cors());
app.use(logger('dev'))
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

app.use('/server', apiRouter);

app.get('/', (req, res) => {
  res.send({ greeting: 'Hello world!' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

