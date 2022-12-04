import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';
import { verifyToken } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';
import { handleError } from './modules/error';

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
  res.status(200);
  res.json({ message: 'Hello World!' });
});

app.use('/api', verifyToken, router);

app.post('/user', createNewUser);
app.post('/signin', signIn);

app.use(handleError);

export default app;
