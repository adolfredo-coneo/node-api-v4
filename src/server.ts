import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';
import { verifyToken } from './modules/auth';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: any, res, next) => {
  req.shhh_secret = 'yeahh';
  next();
});

app.get('/', (req, res) => {
  console.log('GET /');
  res.status(200);
  res.json({ message: 'Hello World!' });
});

app.use('/api', verifyToken, router);

export default app;
